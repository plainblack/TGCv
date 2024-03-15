import { Session } from '#ving/session.mjs';
import { defineEventHandler, getCookie } from 'h3';
import ving from '#ving/index.mjs';
import { verifyTGCUserSession } from '#ving/utils/tgc.mjs';

export default defineEventHandler(async (event) => {
    const cookie = getCookie(event, 'session_id');
    if (cookie) {
        console.log(cookie)
        ving.log().info(cookie);

        try {
            //event.context.ving.session = await Session.fetch(cookie);
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
            //Create the session
        }
        catch { }
    }
});