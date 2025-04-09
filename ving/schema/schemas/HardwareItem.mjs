import { baseSchemaId, baseSchemaCreatedAt, baseSchemaUpdatedAt, dbString, zodString, dbEnum, dbRelation } from '../helpers.mjs';

export const hardwareItemSchema = {
    kind: 'HardwareItem',
    tableName: 'hardwareitems',
    owner: ['admin', 'maintenanceManager',],
    props: [
        ...baseSchemaProps,
        {
            type: "string",
            name: "name",
            required: true,
            length: 60,
            default: '',
            db: (prop) => dbString(prop),
            zod: (prop) => zodString(prop),
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
        {
            type: "enum",
            name: "status",
            required: true,
            default: 'in_use',
            filterQualifier: true,
            db: (prop) => dbEnum(prop),
            enums: ['in_use', 'retired', 'backup'],
            enumLabels: ['In use', 'Retired', 'Backup'],
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
            relation: {
                type: 'parent',
                name: 'itemSet',
                kind: 'HardwareItemSet',
            },
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
    ],
};