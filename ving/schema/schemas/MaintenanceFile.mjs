import { baseSchemaProps, dbString, zodString, dbEnum, dbBoolean, dbText, zodText, dbRelation, dbDateTime, dbTimestamp, dbInt, dbJson, zodNumber, zodJsonObject, dbMediumText, zodMediumText } from '../helpers.mjs';

export const maintenanceFileSchema = {
    kind: 'MaintenanceFile',
    tableName: 'maintenancefiles',
    owner: ['admin', 'maintenanceManager', 'productionManager'],
    props: [
        ...baseSchemaProps,
        {
            type: "id",
            name: 's3FileId', // the name of the remote record's id in this table
            required: true,
            length: 36,
            db: (prop) => dbRelation(prop),
            relation: {
                type: 'parent',
                name: 's3file',
                kind: 'S3File',
            },
            view: ['owner'],
            edit: ['owner'],
        },
        {
            type: "id",
            name: 'maintenanceTicketId', // the name of the remote record's id in this table
            required: true,
            length: 36,
            db: (prop) => dbRelation(prop),
            relation: {
                type: 'parent',
                name: 'ticket',
                kind: 'MaintenanceTicket',
            },
            view: ['owner'],
            edit: ['owner'],
        },
    ],
};