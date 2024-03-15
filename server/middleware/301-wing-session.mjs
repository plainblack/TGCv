import { Session } from '#ving/session.mjs';
import { defineEventHandler, getCookie, setCookie } from 'h3';
import ving from '#ving/index.mjs';
import { verifyTGCUserSession } from '#ving/utils/tgc.mjs';

export default defineEventHandler(async (event) => {
    if (ving.useCache().get(`tgcUserFetch${vingUser.get('id')}`)) {
        if (event.context.ving.session) {
            return;
        }
    }

    const cookie = getCookie(event, 'session_id');
    if (cookie) {

        try {
            const tgcUser = await verifyTGCUserSession(cookie.session_id);
            if (tgcUser == undefined) {
                return;
            }
            const vingUsers = await ving.useKind('User');
            let vingUser;
            try {
                vingUser = await vingUsers.find(tgcUser.user_id);
                //Sync the data from TGC to Ving
                vingUser.setAll({
                    username: tgcUser.username,
                    useAsDisplayName: tgcUser.use_as_display_name,
                    email: tgcUser.email,
                    realName: tgcUser.real_name,
                    admin: tgcUser.admin,
                    maintenanceManager: tgcUser.maintenance_manager
                });
                await vingUser.update();
            }
            catch {
                //Make a new Ving user
                vingUser = await vingUsers.create({
                    id: tgcUser.id,
                    username: tgcUser.username,
                    useAsDisplayName: tgcUser.use_as_display_name,
                    email: tgcUser.email,
                    realName: tgcUser.real_name,
                    admin: tgcUser.admin,
                    maintenanceManager: tgcUser.maintenance_manager
                });
            }
            //Create the session if needed
            if (!event.context.ving.session) {
                const session = await Session.start(vingUser);
                setCookie(event, 'vingSessionId', session.id, { maxAge: 60 * 60 * 24 * 365 * 5, httpOnly: true });
                event.context.ving.session = session;
                ving.useCache().set(`tgcUserFetch${vingUser.get('id')}`, 1, 1000 * 60 * 60);
            }
        }
        catch { }
    }
});