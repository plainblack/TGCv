import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {HardwareTicketTable} from '#ving/drizzle/schema/HardwareTicket.mjs';


export const HardwareTicketRemarkTable = mysqlTable('hardwareticketremarks',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		description: mediumText('description').notNull(),
		resolution: mysqlEnum('resolution', ['resolved','unresolved','n_a']).notNull().default('n_a'),
		resolutionMinutes: int('resolutionMinutes').notNull().default(0),
		submittedBy: varchar('submittedBy', { length: 64 }).notNull().default(''),
		hardwareTicketId: bigint('hardwareTicketId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        hardwareticketremarks_ticket_1ddadbcc_fk: foreignKey({ name: "hardwareticketremarks_ticket_1ddadbcc_fk", columns: [table.hardwareTicketId], foreignColumns: [HardwareTicketTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

