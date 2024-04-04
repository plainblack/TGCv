import { baseSchemaProps, dbString, zodString, dbEnum } from '../helpers.mjs';

export const maintenanceItemSetSchema = {
    kind: 'MaintenanceItemSet',
    tableName: 'maintenanceitemsets',
    owner: ['admin', 'maintenanceManager'],
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
            view: ['public'],
            edit: ['owner'],
        },
        {
            type: "enum",
            name: "status",
            required: true,
            default: 'in_use',
            db: (prop) => dbEnum(prop),
            enums: ['in_use', 'retired'],
            enumLabels: ['In use', 'Retired'],
            view: ['public'],
            edit: ['owner'],
        },
        {
            type: "virtual",
            name: 'shopEquipmentId',
            required: false,
            view: ['public'],
            edit: [],
            relation: {
                type: 'child',
                name: 'tasks',
                kind: 'MaintenanceTasks',
            },
        },
        {
            type: "virtual",
            name: 'shopEquipmentId',
            required: false,
            view: ['public'],
            edit: [],
            relation: {
                type: 'child',
                name: 'tasks',
                kind: 'MaintenanceItems',
            },
        },
    ],
};