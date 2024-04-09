import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText } from '#ving/drizzle/orm.mjs';
import {MaintenanceItemSetTable} from '#ving/drizzle/schema/MaintenanceItemSet.mjs';
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
		maintenanceItemSetId: varchar('maintenanceItemSetId', { length: 36 }).notNull().references(() => MaintenanceItemSetTable.id, {onDelete: "cascade", onUpdate: "cascade"}),
		maintenanceTaskId: varchar('maintenanceTaskId', { length: 36 }).notNull().references(() => MaintenanceTaskTable.id, {onDelete: "cascade", onUpdate: "cascade"})
    }, 
    (table) => ({
        
    })
);

