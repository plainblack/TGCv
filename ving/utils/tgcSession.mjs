import ving from '#ving/index.mjs';

export const getTGCSession = async () => {
    let tgcSession = await ving.useCache().get('tgc_session');
    if (tgcSession) {
        return tgcSession;
    }
    tgcSession = await fetchTGCSession();
    await ving.useCache().set('tgc_session', tgcSession, 1000 * 60 * 60 * 24);
    return tgcSession;
};

export const fetchTGCSession = async () => {
    const fod = new FormData;
    fod.append("username", process.env.TGC_SITE_USERNAME);
    fod.append("password", process.env.TGC_SITE_PASS);
    fod.append("api_key_id", process.env.TGC_SITE_API_KEY);

    const response = await fetch(process.env.TGC_SITE_URL + "/api/session", {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: fod,
    });
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
        throw ving.ouch(500, "Could not fetch TGC Session");
    }
    return json.result;
}
