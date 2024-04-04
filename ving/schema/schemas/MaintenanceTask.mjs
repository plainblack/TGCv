import { baseSchemaProps, dbString, zodString, dbInt, dbEnum, dbRelation } from '../helpers.mjs';

export const maintenanceTaskSchema = {
    kind: 'MaintenanceTask',
    tableName: 'maintenancetasks',
    owner: ['admin', 'maintenanceManager'],
    props: [
        ...baseSchemaProps,
        {
            type: "mediumText",
            name: "description",
            required: true,
            unique: false,
            length: 128,
            default: '',
            db: (prop) => dbString(prop),
            zod: (prop) => zodString(prop),
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
        {
            type: "id",
            name: 'maintenanceItemSetId',
            required: true,
            db: (prop) => dbRelation(prop),
            view: ['owner', 'productionManager'],
            edit: ['owner'],
            relation: {
                type: 'parent',
                name: 'itemSet',
                kind: 'MaintenanceItemSet',
            },
        },
    ],
};