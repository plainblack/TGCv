import { baseSchemaProps, dbString, zodString, dbEnum, dbBoolean, dbText, zodText, dbRelation, dbDateTime, dbTimestamp, dbInt, dbJson, zodNumber, zodJsonObject, dbMediumText, zodMediumText } from '../helpers.mjs';

export const hardwareTicketFileSchema = {
    kind: 'HardwareTicketFile',
    tableName: 'hardwareticketfiles',
    owner: ['admin', 'maintenanceManager', 'productionManager'],
    props: [
        ...baseSchemaProps,
        {
            type: "id",
            name: 's3FileId', // the name of the remote record's id in this table
            required: true,
            default: undefined,
            db: (prop) => dbRelation(prop),
            relation: {
                acceptedFileExtensions: ['png', 'jpeg', 'jpg', 'gif', 'pdf', 'tiff', 'svg', 'dxf', 'csv'],
                type: 'parent',
                name: 's3file',
                kind: 'S3File',
            },
            view: ['owner'],
            edit: ['owner'],
        },
        {
            type: "id",
            name: 'hardwareTicketId', // the name of the remote record's id in this table
            required: true,
            default: undefined,
            db: (prop) => dbRelation(prop),
            relation: {
                type: 'parent',
                name: 'ticket',
                kind: 'HardwareTicket',
            },
            view: ['owner'],
            edit: ['owner'],
        },
    ],
};