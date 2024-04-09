import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceItemSetTable} from '#ving/drizzle/schema/MaintenanceItemSet.mjs';


export const MaintenanceTaskTable = mysqlTable('maintenancetasks',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		maintenanceItemSetId: varchar('maintenanceItemSetId', { length: 36 }).notNull()
    }, 
    (table) => ({
        maintenancetasks_itemSet_75c8db95_fk: foreignKey({ name: "maintenancetasks_itemSet_75c8db95_fk", columns: [table.maintenanceItemSetId], foreignColumns: [MaintenanceItemSetTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

