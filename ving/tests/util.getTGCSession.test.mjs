import { describe, test, expect, afterAll } from "vitest";
import ving from '#ving/index.mjs';
import { fetchTGCAdminSession, getTGCAdminSession } from '#ving/utils/tgc.mjs';

describe('Get an Admin TGC Session', async () => {
    const tgcSession = await fetchTGCAdminSession();
    test('Session ID length', () => {
        expect(tgcSession.id.length).toBe(36);
    });
    const cachedSession = await getTGCAdminSession();
    ving.sleep(1000);
    const cachedSession2 = await getTGCAdminSession();
    test('Cache returns the same thing', () => {
        expect(cachedSession.id).toBe(cachedSession2.id)
    });
    await ving.close();
});

