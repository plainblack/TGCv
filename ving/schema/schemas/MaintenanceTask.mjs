import { baseSchemaProps, dbString, zodString, zodMediumText, dbMediumText, dbInt, dbEnum, dbRelation } from '../helpers.mjs';

export const maintenanceTaskSchema = {
    kind: 'MaintenanceTask',
    tableName: 'maintenancetasks',
    owner: ['admin', 'maintenanceManager'],
    props: [
        ...baseSchemaProps,
        {
            type: "string",
            name: "description",
            required: true,
            unique: false,
            default: '',
            db: (prop) => dbMediumText(prop),
            zod: (prop) => zodMediumText(prop),
            view: ['owner', 'productionManager'],
            edit: ['owner'],
        },
        {
            type: "id",
            name: 'maintenanceItemSetId',
            required: true,
            filterQualifier: true,
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