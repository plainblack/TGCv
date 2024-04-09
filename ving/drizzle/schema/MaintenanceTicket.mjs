import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText } from '#ving/drizzle/orm.mjs';
import {MaintenanceTaskTable} from '#ving/drizzle/schema/MaintenanceTask.mjs';
import {MaintenanceItemTable} from '#ving/drizzle/schema/MaintenanceItem.mjs';


export const MaintenanceTicketTable = mysqlTable('maintenancetickets',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		type: mysqlEnum('type', ['routine','needs_help']).notNull().default('routine'),
		severity: mysqlEnum('severity', ['working','intermittent','down']).notNull().default('working'),
		status: mysqlEnum('status', ['resolved','unresolved']).notNull().default('resolved'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		maintenanceTaskId: varchar('maintenanceTaskId', { length: 36 }).notNull().references(() => MaintenanceTaskTable.id, {onDelete: "cascade", onUpdate: "cascade"}),
		maintenanceItemId: varchar('maintenanceItemId', { length: 36 }).notNull().references(() => MaintenanceItemTable.id, {onDelete: "cascade", onUpdate: "cascade"})
    }, 
    (table) => ({
        
    })
);

