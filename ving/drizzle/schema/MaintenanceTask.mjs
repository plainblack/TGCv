import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceItemSetTable} from '#ving/drizzle/schema/MaintenanceItemSet.mjs';


export const MaintenanceTaskTable = mysqlTable('maintenancetasks',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		maintenanceItemSetId: bigint('maintenanceItemSetId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        maintenancetasks_itemSet_75c8db95_fk: foreignKey({ name: "maintenancetasks_itemSet_75c8db95_fk", columns: [table.maintenanceItemSetId], foreignColumns: [MaintenanceItemSetTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

