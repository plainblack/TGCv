import { describe, test, expect, afterAll } from "vitest";
import ving from '#ving/index.mjs';
import { fetchTGCSession, getTGCSession } from '#ving/utils/tgcSession.mjs';

describe('Get an Admin TGC Session', async () => {
    const tgcSession = await fetchTGCSession();
    test('Session ID length', () => {
        expect(tgcSession.id.length).toBe(36);
    });
    const cachedSession = await getTGCSession();
    ving.sleep(1000);
    const cachedSession2 = await getTGCSession();
    test('Cache returns the same thing', () => {
        expect(cachedSession.id).toBe(cachedSession2.id)
    });
    await ving.close();
});

