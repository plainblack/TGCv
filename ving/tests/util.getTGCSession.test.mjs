import { describe, test, expect, afterAll, beforeAll, toThrowError, } from "vitest";
import ving from '#ving/index.mjs';
import { fetchTGCAdminSession, getTGCAdminSession, tgcClient } from '#ving/utils/tgc.mjs';

beforeAll(async () => {
    const { Console } = await import('node:console');
    globalThis.console = new Console(process.stdout, process.stderr);
});

describe('Get a new Admin TGC Session', async () => {
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

describe('test error handling', async () => {
    test('Testing error handling', async () => {
        await expect(
            () => tgcClient('/api/NeverAURL')
        ).rejects.toThrowError();
        let error;

        try { await tgcClient('/api/NeverAURL') }
        catch (err) {
            error = err;
        }
        console.log(error);
        expect(error).toMatchObject({
            statusCode: 404,
        });
    });
    await ving.close();
});


