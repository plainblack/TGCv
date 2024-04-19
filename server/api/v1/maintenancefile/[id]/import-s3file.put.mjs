import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import { defineEventHandler, getRouterParams } from 'h3';

export default defineEventHandler(async (event) => {
    const maintenancefiles = await useKind('MaintenanceFile');
    const { id } = getRouterParams(event);
    const maintenancefile = await maintenancefiles.findOrDie(id);
    //const oldFile = await maintenancefile.parent('s3file');
    const session = obtainSession(event);
    await maintenancefile.canEdit(session);
    const body = await getBody(event);
    const s3files = await useKind('S3File');
    const s3file = await s3files.findOrDie(body.s3FileId);
    console.log("Going to postprocess S3File");
    await s3file.postProcessFile();
    console.log("S3File post processed");
    await s3file.verifyExtension(['png', 'jpeg', 'jpg', 'gif', 'pdf', 'tiff', 'svg', 'dxf', 'csv']);
    console.log("S3File verified extension");
    maintenancefile.set('s3FileId', s3file.get('id'));
    await maintenancefile.update();
    console.log("Set sefileId on maintenanceFile");

    //await oldFile.delete();
    const description = await maintenancefile.describe(describeParams(event, session));
    console.log("Described maintenance file");
    return description;
});