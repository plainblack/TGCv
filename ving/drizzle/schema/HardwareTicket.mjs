import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {HardwareTaskTable} from '#ving/drizzle/schema/HardwareTask.mjs';
import {HardwareItemTable} from '#ving/drizzle/schema/HardwareItem.mjs';


export const HardwareTicketTable = mysqlTable('hardwaretickets',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		type: mysqlEnum('type', ['routine','needs_help']).notNull().default('routine'),
		severity: mysqlEnum('severity', ['working','intermittent','down']).notNull().default('working'),
		status: mysqlEnum('status', ['resolved','unresolved']).notNull().default('unresolved'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		hardwareTaskId: bigint('hardwareTaskId', {mode:'number', unsigned: true}).notNull(),
		hardwareItemId: bigint('hardwareItemId', {mode:'number', unsigned: true}).notNull(),
		claimedBy: varchar('claimedBy', { length: 64 }).notNull().default('')
    }, 
    (table) => ({
        hardwaretickets_task_652b79c5_fk: foreignKey({ name: "hardwaretickets_task_652b79c5_fk", columns: [table.hardwareTaskId], foreignColumns: [HardwareTaskTable.id]}).onDelete("cascade").onUpdate("cascade"),
		hardwaretickets_item_6526bf53_fk: foreignKey({ name: "hardwaretickets_item_6526bf53_fk", columns: [table.hardwareItemId], foreignColumns: [HardwareItemTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

