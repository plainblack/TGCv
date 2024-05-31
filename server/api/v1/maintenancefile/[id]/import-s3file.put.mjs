import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import { defineEventHandler, getRouterParams } from 'h3';

export default defineEventHandler(async (event) => {
    const maintenancefiles = await useKind('MaintenanceFile');
    const { id } = getRouterParams(event);
    const maintenancefile = await maintenancefiles.findOrDie(id);
    let oldFile = undefined;
    if (maintenancefile.get('s3FileId'))
        oldFile = await maintenancefile.parent('s3file');
    const session = obtainSession(event);
    await maintenancefile.canEdit(session);
    const body = await getBody(event);
    const s3files = await useKind('S3File');
    const s3file = await s3files.findOrDie(body.s3FileId);
    await s3file.postProcessFile();
    await s3file.verifyExtension(maintenancefile.parentPropSchema('s3file').relation.acceptedFileExtensions);
    await s3file.verifyExactDimensions(300, 300);
    maintenancefile.set('s3FileId', s3file.get('id'));
    await maintenancefile.update();
    if (oldFile)
        await oldFile.delete();
    return await maintenancefile.describe(describeParams(event, session));
});