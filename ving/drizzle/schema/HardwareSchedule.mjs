import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {HardwareItemTable} from '#ving/drizzle/schema/HardwareItem.mjs';
import {HardwareTaskTable} from '#ving/drizzle/schema/HardwareTask.mjs';


export const HardwareScheduleTable = mysqlTable('hardwareschedules',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		recurrence: mysqlEnum('recurrence', ['yearly','monthly','weekly','daily']).notNull().default('monthly'),
		months: int('months').notNull().default(0),
		weeks: int('weeks').notNull().default(0),
		days: int('days').notNull().default(0),
		hardwareItemId: bigint('hardwareItemId', {mode:'number', unsigned: true}).notNull(),
		hardwareTaskId: bigint('hardwareTaskId', {mode:'number', unsigned: true}).notNull(),
		description: mediumText('description').notNull(),
		jobsId: varchar('jobsId', { length: 255 }).notNull().default('')
    }, 
    (table) => ({
        hardwareschedules_item_33d0762_fk: foreignKey({ name: "hardwareschedules_item_33d0762_fk", columns: [table.hardwareItemId], foreignColumns: [HardwareItemTable.id]}).onDelete("cascade").onUpdate("cascade"),
		hardwareschedules_task_3384cf0_fk: foreignKey({ name: "hardwareschedules_task_3384cf0_fk", columns: [table.hardwareTaskId], foreignColumns: [HardwareTaskTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);
