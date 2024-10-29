import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {HardwareItemSetTable} from '#ving/drizzle/schema/HardwareItemSet.mjs';


export const HardwareItemTable = mysqlTable('hardwareitems',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		name: varchar('name', { length: 60 }).notNull().default(''),
		status: mysqlEnum('status', ['in_use','retired','backup']).notNull().default('in_use'),
		hardwareItemSetId: bigint('hardwareItemSetId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        hardwareitems_itemSet_fef4de8_fk: foreignKey({ name: "hardwareitems_itemSet_fef4de8_fk", columns: [table.hardwareItemSetId], foreignColumns: [HardwareItemSetTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

