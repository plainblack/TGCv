import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceTaskTable} from '#ving/drizzle/schema/MaintenanceTask.mjs';
import {MaintenanceItemTable} from '#ving/drizzle/schema/MaintenanceItem.mjs';


export const MaintenanceTicketTable = mysqlTable('maintenancetickets',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		ticketNumber: int('ticketNumber').notNull().default(0),
		description: mediumText('description').notNull(),
		type: mysqlEnum('type', ['routine','needs_help']).notNull().default('routine'),
		severity: mysqlEnum('severity', ['working','intermittent','down']).notNull().default('working'),
		status: mysqlEnum('status', ['resolved','unresolved']).notNull().default('unresolved'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		maintenanceTaskId: bigint('maintenanceTaskId', {mode:'number', unsigned: true}).notNull(),
		maintenanceItemId: bigint('maintenanceItemId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        maintenancetickets_task_1206e190_fk: foreignKey({ name: "maintenancetickets_task_1206e190_fk", columns: [table.maintenanceTaskId], foreignColumns: [MaintenanceTaskTable.id]}).onDelete("cascade").onUpdate("cascade"),
		maintenancetickets_item_120b9c02_fk: foreignKey({ name: "maintenancetickets_item_120b9c02_fk", columns: [table.maintenanceItemId], foreignColumns: [MaintenanceItemTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

