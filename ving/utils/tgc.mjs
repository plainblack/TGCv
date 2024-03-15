import ving from '#ving/index.mjs';

export const verifyTGCUserSession = async (sessionId) => {
    try {
        const tgcAdminSession = await getTGCAdminSession();
        const session = await tgcClient(`/api/session/${sessionId}?session_id=${tgcAdminSession.id}`);
        const user = await tgcClient(`/api/user/${session.user_id}?session_id=${tgcAdminSession.id}`);
        return user;
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
    const fod = new FormData;
    fod.append("username", process.env.TGC_SITE_USERNAME);
    fod.append("password", process.env.TGC_SITE_PASS);
    fod.append("api_key_id", process.env.TGC_SITE_API_KEY);

    const response = await tgcClient("/api/session", {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: fod,
    });
    return response;
}

const tgcClient = async (slug, params) => {
    let url = process.env.TGC_SITE_URL + slug;
    const response = await fetch(url, params);
    const data = await response.text();
    let json;
    try {
        json = JSON.parse(data);
        if (json.error?.code) {
            throw ving.ouch(json.error.code, json.error.message);
        }
    }
    catch (e) {
        console.log(e);
        throw ving.ouch(500, `Could not fetch ${slug}`);
    }
    return json.result;
};
