import { Session } from '#ving/session.mjs';
import { defineEventHandler, getCookie, setCookie } from 'h3';
import ving from '#ving/index.mjs';
import { verifyTGCUserSession } from '#ving/utils/tgc.mjs';
import { eq } from '#ving/drizzle/orm.mjs';
import { isUndefined } from '#ving/utils/identify.mjs';
import { useKind } from '#ving/record/utils.mjs';

export default defineEventHandler(async (event) => {
    const log = ving.log(301);
    //log.debug("Inside 301 middleware");
    const tgcSessionId = getCookie(event, 'session_id');
    //log.debug(`tgc session id: ${tgcSessionId}`);

    if (ving.useCache().get(`tgcUserFetch${tgcSessionId}`)) {
        //log.debug("We have a TGC session cache");
        if (event.context.ving.session) {
            //log.debug("We have a ving session, exit out");
            return;
        }
    }

    if (tgcSessionId) {
        //log.debug(`have session`);

        try {
            const tgcUser = await verifyTGCUserSession(tgcSessionId);
            if (tgcUser == undefined) {
                //log.debug(`No TGC user, return`);
                return;
            }
            const vingUsers = await useKind('User');
            let vingUser;
            let userCreated = false;
            try {
                vingUser = await vingUsers.findOne(eq(vingUsers.table.tgcUserId, tgcUser.id));
                if (isUndefined(vingUser)) {
                    throw ving.ouch(404, 'TGC user not found');
                }
            }
            catch {
                //Make a new Ving user
                //log.debug(`create user`);

                vingUser = await vingUsers.create({
                    tgcUserId: tgcUser.id,
                    username: tgcUser.username,
                    useAsDisplayName: tgcUser.use_as_display_name,
                    email: tgcUser.email,
                    realName: tgcUser.real_name,
                    admin: tgcUser.admin,
                    maintenanceManager: tgcUser.maintenance_manager,
                    productionManager: tgcUser.production_manager,
                    verifiedEmail: true,
                });
                userCreated = true;
            }
            if (!userCreated) {
                //Sync the data from TGC to Ving
                //log.debug(`update user`);
                vingUser.setAll({
                    username: tgcUser.username,
                    useAsDisplayName: tgcUser.use_as_display_name,
                    email: tgcUser.email,
                    realName: tgcUser.real_name,
                    admin: tgcUser.admin,
                    maintenanceManager: tgcUser.maintenance_manager,
                    productionManager: tgcUser.production_manager,
                });
                //log.debug('setAll on user');
                await vingUser.update();
                //log.debug('Updated user from TGC data');
            }
            //Create the session if needed
            if (!event.context.ving.session) {
                //log.debug(`start session`);

                const session = await Session.start(vingUser, "native");
                setCookie(event, 'vingSessionId', session.id, { maxAge: 60 * 60 * 24 * 365 * 5, httpOnly: true });
                event.context.ving.session = session;
                ving.useCache().set(`tgcUserFetch${tgcSessionId}`, 1, 1000 * 60 * 60);
            }
            //log.debug(`Did not crash in the middle`);

        }
        catch (e) {
            log.error(`threw an error ${e}`);
        }
    }

});