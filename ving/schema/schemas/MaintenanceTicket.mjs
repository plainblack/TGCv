import { baseSchemaProps, dbString, zodString, dbEnum, dbBoolean, dbText, zodText, dbRelation, dbDateTime, dbTimestamp, dbInt, dbJson, zodNumber, zodJsonObject } from '../helpers.mjs';

export const maintenanceTicketSchema = {
    kind: 'MaintenanceTicket',
    tableName: 'maintenancetickets',
    owner: ['$userId', 'admin', 'maintenanceManager', 'productionManager'],
    props: [
        ...baseSchemaProps,
        {
            type: "mediumText",
            name: "description",
            required: true,
            length: 60,
            default: '',
            db: (prop) => dbString(prop),
            zod: (prop) => zodString(prop),
            view: [],
            edit: ['owner'],
        },
        {
            type: "enum",
            name: 'type',
            required: true,
            length: 20,
            default: 'routine',
            db: (prop) => dbEnum(prop),
            enums: ['routine', 'needs_help'],
            enumLabels: ['Routine', 'Needs Help'],
            view: [],
            edit: ['owner'],
        },
        {
            type: "enum",
            name: 'severity',
            required: true,
            length: 20,
            default: 'working',
            db: (prop) => dbEnum(prop),
            enums: ['working', 'intermittent', 'down'],
            enumLabels: ['Working', 'Intermittent', 'Down'],
            view: [],
            edit: ['owner'],
        },
        {
            type: "enum",
            name: 'status',
            required: true,
            length: 20,
            default: 'resolved',
            db: (prop) => dbEnum(prop),
            enums: ['resolved', 'unresolved'],
            enumLabels: ['Resolved', 'Unresolved'],
            view: [],
            edit: ['owner'],
        },
        {
            type: "int",
            name: "resolutionMinutes",
            required: false,
            default: 0,
            db: (prop) => dbInt(prop),
            zod: (prop) => zodNumber(prop).positive(),
            view: ['public'],
            edit: [],
        },
        // json field
        {
            type: "json",
            name: "metadata",
            required: false,
            default: '{}',
            db: (prop) => dbJson(prop),
            zod: (prop) => zodJsonObject(prop).passthrough(), // or replace .passthrough() with something like .extends({foo: z.string()})
            view: ['public'],
            edit: [],
        },
        // boolean field
        {
            type: "boolean",
            name: 'isCool',
            required: true,
            default: false,
            db: (prop) => dbBoolean(prop),
            enums: [false, true],
            enumLabels: ['Not Cool', 'Very Cool'],
            view: [],
            edit: ['owner'],
        },
        // 1:N relationship - aka a relationship to my children
        /* {
             type: "virtual",
             name: 'maintenanceticketId', // the name of this record's id in the remote table
             required: false,
             view: ['public'],
             edit: [],
             relation: {
                 type: 'child',
                 name: 'maintenanceticketcomments',
                 kind: 'MaintenanceTicketComment',
             },
         },*/
        // N:1 relationship - aka a relationship to my parent
        /*{
            type: "id",
            name: 'maintenanceticketGroupId', // the name of the remote record's id in this table
            required: true,
            length: 36,
            db: (prop) => dbRelation(prop),
            relation: {
                type: 'parent',
                name: 'maintenanceticketgroup',
                kind: 'MaintenanceTicketGroup',
            },
            default: undefined,
            view: ['public'],
            edit: ['owner'],
        },*/
        // a user relationship
        {
            type: "id",
            name: 'userId',
            required: true,
            length: 36,
            db: (prop) => dbRelation(prop),
            relation: {
                type: 'parent',
                name: 'user',
                kind: 'User',
            },
            default: undefined,
            view: ['public'],
            edit: ['owner'],
        },
        // date field
        {
            type: "date",
            name: "startedAt",
            required: true,
            default: () => new Date(),
            db: (prop) => dbDateTime(prop),
            view: ['public'],
            edit: [],
        },
    ],
};