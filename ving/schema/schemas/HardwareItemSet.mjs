import { baseSchemaId, baseSchemaCreatedAt, baseSchemaUpdatedAt, dbString, zodString, dbInt, zodNumber, dbEnum } from '../helpers.mjs';

export const hardwareItemSetSchema = {
    kind: 'HardwareItemSet',
    tableName: 'hardwareitemsets',
    owner: ['admin', 'maintenanceManager'],
    props: [
        { ...baseSchemaId },
        { ...baseSchemaCreatedAt },
        { ...baseSchemaUpdatedAt },
        {
            type: "string",
            name: "name",
            required: true,
            filterQuery: true,
            length: 60,
            default: '',
            db: (prop) => dbString(prop),
            zod: (prop) => zodString(prop),
            view: ['owner'],
            edit: ['owner'],
        },
        {
            type: "int",
            name: "itemCount",
            filterRange: true,
            filterQualifier: true,
            required: false,
            default: 0,
            db: (prop) => dbInt(prop),
            zod: (prop) => zodNumber(prop),
            view: ['owner'],
            edit: [],
        },
        {
            type: "int",
            name: "taskCount",
            filterRange: true,
            filterQualifier: true,
            required: false,
            default: 0,
            db: (prop) => dbInt(prop),
            zod: (prop) => zodNumber(prop),
            view: ['owner'],
            edit: [],
        },
        {
            type: "enum",
            name: "status",
            required: true,
            default: 'in_use',
            db: (prop) => dbEnum(prop),
            enums: ['in_use', 'retired'],
            enumLabels: ['In use', 'Retired'],
            view: ['owner'],
            edit: ['owner'],
        },
        {
            type: "virtual",
            name: 'hardwareItemSetId',
            required: false,
            default: undefined,
            view: ['owner'],
            edit: [],
            relation: {
                type: 'child',
                name: 'tasks',
                kind: 'HardwareTask',
            },
        },
        {
            type: "virtual",
            name: 'hardwareItemSetId',
            required: true,
            default: undefined,
            view: ['owner'],
            edit: [],
            relation: {
                type: 'child',
                name: 'items',
                kind: 'HardwareItem',
            },
        },
    ],
};