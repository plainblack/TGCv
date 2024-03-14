import { describe, test, expect, afterAll } from "vitest";
import ving from '#ving/index.mjs';
import { getTGCSession } from '#ving/utils/tgcSession.mjs';

describe('Get an Admin TGC Session', async () => {
    const tgcSession = await getTGCSession();
    test('Session ID length', () => {
        expect(tgcSession.id.length).toBe(36);
    });
});

await ving.close();