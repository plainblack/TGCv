import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {HardwareItemSetTable} from '#ving/drizzle/schema/HardwareItemSet.mjs';


export const HardwareTaskTable = mysqlTable('hardwaretasks',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		hardwareItemSetId: bigint('hardwareItemSetId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ([
        foreignKey({ name: "hardwaretasks_itemSet_6afcc4a_fk", columns: [table.hardwareItemSetId], foreignColumns: [HardwareItemSetTable.id]}).onDelete("cascade").onUpdate("cascade")
    ])
);

