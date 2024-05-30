import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {MaintenanceTicketTable} from '#ving/drizzle/schema/MaintenanceTicket.mjs';


export const MaintenanceRemarkTable = mysqlTable('maintenanceremarks',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		resolution: mysqlEnum('resolution', ['resolved','unresolved','n_a']).notNull().default('n_a'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		maintenanceTicketId: bigint('maintenanceTicketId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        maintenanceremarks_ticket_7bde9655_fk: foreignKey({ name: "maintenanceremarks_ticket_7bde9655_fk", columns: [table.maintenanceTicketId], foreignColumns: [MaintenanceTicketTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

