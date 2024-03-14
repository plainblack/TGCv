import { describe, test, expect, afterAll } from "vitest";
import ving from '#ving/index.mjs';
import { fetchTGCSession } from '#ving/utils/tgcSession.mjs';

describe('Get an Admin TGC Session', async () => {
    const tgcSession = await fetchTGCSession();
    test('Session ID length', () => {
        expect(tgcSession.id.length).toBe(36);
    });
});

await ving.close();