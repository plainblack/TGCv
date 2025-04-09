import { baseSchemaId, baseSchemaCreatedAt, baseSchemaUpdatedAt, dbString, zodString, zodMediumText, dbMediumText, dbInt, dbEnum, dbRelation } from '../helpers.mjs';

export const hardwareTaskSchema = {
    kind: 'HardwareTask',
    tableName: 'hardwaretasks',
    owner: ['admin', 'maintenanceManager'],
    props: [
        { ...baseSchemaId },
        { ...baseSchemaCreatedAt },
        { ...baseSchemaUpdatedAt }, ,
        {
            type: "string",
            name: "description",
            required: true,
            unique: false,
            default: '',
            length: 16777215,
            db: (prop) => dbMediumText(prop),
            zod: (prop) => zodMediumText(prop),
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
        {
            type: "id",
            name: 'hardwareItemSetId',
            required: true,
            filterQualifier: true,
            default: undefined,
            db: (prop) => dbRelation(prop),
            view: ['owner', 'productionManager'],
            edit: ['owner'],
            relation: {
                type: 'parent',
                name: 'itemSet',
                kind: 'HardwareItemSet',
            },
        },
    ],
};