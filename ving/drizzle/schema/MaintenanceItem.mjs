import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceItemSetTable} from '#ving/drizzle/schema/MaintenanceItemSet.mjs';


export const MaintenanceItemTable = mysqlTable('maintenanceitems',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		name: varchar('name', { length: 60 }).notNull().default(''),
		status: mysqlEnum('status', ['in_use','retired']).notNull().default('in_use'),
		maintenanceItemSetId: bigint('maintenanceItemSetId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        maintenanceitems_itemSet_5f29c163_fk: foreignKey({ name: "maintenanceitems_itemSet_5f29c163_fk", columns: [table.maintenanceItemSetId], foreignColumns: [MaintenanceItemSetTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

