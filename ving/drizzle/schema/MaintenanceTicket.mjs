import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceTaskTable} from '#ving/drizzle/schema/MaintenanceTask.mjs';
import {MaintenanceItemTable} from '#ving/drizzle/schema/MaintenanceItem.mjs';


export const MaintenanceTicketTable = mysqlTable('maintenancetickets',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		name: varchar('name', { length: 60 }).notNull().default(''),
		ticketNumber: int('ticketNumber').notNull().default(0),
		description: mediumText('description').notNull(),
		type: mysqlEnum('type', ['routine','needs_help']).notNull().default('routine'),
		severity: mysqlEnum('severity', ['working','intermittent','down']).notNull().default('working'),
		status: mysqlEnum('status', ['resolved','unresolved']).notNull().default('resolved'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		maintenanceTaskId: varchar('maintenanceTaskId', { length: 36 }).notNull(),
		maintenanceItemId: varchar('maintenanceItemId', { length: 36 }).notNull()
    }, 
    (table) => ({
        maintenancetickets_task_1206e190_fk: foreignKey({ name: "maintenancetickets_task_1206e190_fk", columns: [table.maintenanceTaskId], foreignColumns: [MaintenanceTaskTable.id]}).onDelete("cascade").onUpdate("cascade"),
		maintenancetickets_item_120b9c02_fk: foreignKey({ name: "maintenancetickets_item_120b9c02_fk", columns: [table.maintenanceItemId], foreignColumns: [MaintenanceItemTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

