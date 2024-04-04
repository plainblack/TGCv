import { baseSchemaProps, dbString, zodString, dbEnum, dbRelation } from '../helpers.mjs';

export const maintenanceItemSchema = {
    kind: 'MaintenanceItem',
    tableName: 'maintenanceitems',
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
            db: (prop) => dbEnum(prop),
            enums: ['in_use', 'retired'],
            enumLabels: ['In use', 'Retired'],
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
        {
            type: "id",
            name: 'maintenanceItemSetId',
            required: true,
            length: 36,
            db: (prop) => dbRelation(prop),
            relation: {
                type: 'parent',
                name: 'maintenanceItemSet',
                kind: 'MaintenanceItemSet',
            },
            default: undefined,
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
    ],
};