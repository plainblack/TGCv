import ving from '#ving/index.mjs';
import { ofetch } from 'ofetch';

export const verifyTGCUserSession = async (sessionId) => {
    try {
        const tgcAdminSession = await getTGCAdminSession();
        const session = await tgcClient(`/api/session/${sessionId}?session_id=${tgcAdminSession.id}`);
        const user = await tgcClient(`/api/user/${session.result.user_id}?session_id=${tgcAdminSession.id}`);
        return user.result;
    }
    catch (e) {
        return undefined;
    }
};

export const getTGCAdminSession = async () => {
    let tgcSession = await ving.useCache().get('tgc_session');
    if (tgcSession) {
        return tgcSession;
    }
    tgcSession = await fetchTGCAdminSession();
    await ving.useCache().set('tgc_session', tgcSession, 1000 * 60 * 60 * 24);
    return tgcSession;
};

export const fetchTGCAdminSession = async () => {

    const response = await tgcClient("/api/session", {
        method: "POST",
        body: {
            username: process.env.TGC_SITE_USERNAME,
            password: process.env.TGC_SITE_PASS,
            api_key_id: process.env.TGC_SITE_API_KEY,
        }
    });
    return response.result;
}

export const tgcClient = async (slug, params) => {
    let url = process.env.TGC_SITE_URL + slug;
    let response;
    try {
        response = await ofetch(url, params);
    }
    catch (err) {
        throw ving.ouch(err.data.error.code, err.data.error.message, err.data.error.data);
    };

    response = await ofetch(url, params);
    return response;
};
