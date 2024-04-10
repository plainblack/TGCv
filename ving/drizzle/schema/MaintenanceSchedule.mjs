import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceItemTable} from '#ving/drizzle/schema/MaintenanceItem.mjs';
import {MaintenanceTaskTable} from '#ving/drizzle/schema/MaintenanceTask.mjs';


export const MaintenanceScheduleTable = mysqlTable('maintenanceschedules',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		recurrence: mysqlEnum('recurrence', ['yearly','monthly','weekly','daily']).notNull().default('monthly'),
		months: int('months').notNull().default(0),
		weeks: int('weeks').notNull().default(0),
		days: int('days').notNull().default(0),
		maintenanceItemId: varchar('maintenanceItemId', { length: 36 }).notNull(),
		maintenanceTaskId: varchar('maintenanceTaskId', { length: 36 }).notNull()
    }, 
    (table) => ({
        maintenanceschedules_item_7745e177_fk: foreignKey({ name: "maintenanceschedules_item_7745e177_fk", columns: [table.maintenanceItemId], foreignColumns: [MaintenanceItemTable.id]}).onDelete("cascade").onUpdate("cascade"),
		maintenanceschedules_task_77412705_fk: foreignKey({ name: "maintenanceschedules_task_77412705_fk", columns: [table.maintenanceTaskId], foreignColumns: [MaintenanceTaskTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

