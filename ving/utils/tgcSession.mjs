import ving from '#ving/index.mjs';

export const getTGCSession = async () => {
    const fod = new FormData;
    fod.append("username", process.env.TGC_SITE_USERNAME);
    fod.append("password", process.env.TGC_SITE_PASS);
    fod.append("api_key_id", process.env.TGC_SITE_API_KEY);

    const response = await fetch(process.env.TGC_SITE_URL + "/api/session", {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: fod,
    });
    //ving.log('oldtgc').debug(await response.text());
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
};

console.log(await getTGCSession());
await ving.close();

