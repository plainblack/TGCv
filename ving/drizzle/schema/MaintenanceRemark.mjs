import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText } from '#ving/drizzle/orm.mjs';
import {MaintenanceTicketTable} from '#ving/drizzle/schema/MaintenanceTicket.mjs';


export const MaintenanceRemarkTable = mysqlTable('maintenanceremarks',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		resolution: mysqlEnum('resolution', ['resolved','unresolved','n_a']).notNull().default('n_a'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		maintenanceTicketId: varchar('maintenanceTicketId', { length: 36 }).notNull().references(() => MaintenanceTicketTable.id, {onDelete: "cascade", onUpdate: "cascade"})
    }, 
    (table) => ({
        
    })
);

