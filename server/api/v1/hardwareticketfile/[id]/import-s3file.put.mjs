import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import { defineEventHandler, getRouterParams } from 'h3';

export default defineEventHandler(async (event) => {
    const hardwareticketfiles = await useKind('HardwareTicketFile');
    const { id } = getRouterParams(event);
    const hardwareticketfile = await hardwareticketfiles.findOrDie(id);
    let oldFile = undefined;
    if (hardwareticketfile.get('s3FileId'))
        oldFile = await hardwareticketfile.parent('s3file');
    const session = obtainSession(event);
    await hardwareticketfile.canEdit(session);
    const body = await getBody(event);
    const s3files = await useKind('S3File');
    const s3file = await s3files.findOrDie(body.s3FileId);
    await s3file.postProcessFile();
    await s3file.verifyExtension(hardwareticketfile.parentPropSchema('s3file').relation.acceptedFileExtensions);
    await s3file.verifyExactDimensions(300, 300);
    hardwareticketfile.set('s3FileId', s3file.get('id'));
    await hardwareticketfile.update();
    if (oldFile)
        await oldFile.delete();
    return await hardwareticketfile.describe(describeParams(event, session));
});