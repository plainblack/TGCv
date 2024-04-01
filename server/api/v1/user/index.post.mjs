import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    obtainSessionIfRole(event, 'admin'); //DELME: Delete this after Wing is no longer the source for creating accounts
    const users = await useKind('User');
    const body = await getBody(event);
    const user = await users.createAndVerify(body);
    return user.describe(describeParams(event));
});