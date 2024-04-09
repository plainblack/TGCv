import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {S3FileTable} from '#ving/drizzle/schema/S3File.mjs';
import {MaintenanceTicketTable} from '#ving/drizzle/schema/MaintenanceTicket.mjs';


export const MaintenanceFileTable = mysqlTable('maintenancefiles',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		s3FileId: varchar('s3FileId', { length: 36 }).notNull(),
		maintenanceTicketId: varchar('maintenanceTicketId', { length: 36 }).notNull()
    }, 
    (table) => ({
        maintenancefiles_s3file_bc83f09_fk: foreignKey({ name: "maintenancefiles_s3file_bc83f09_fk", columns: [table.s3FileId], foreignColumns: [S3FileTable.id]}).onDelete("cascade").onUpdate("cascade"),
		maintenancefiles_ticket_71bc799_fk: foreignKey({ name: "maintenancefiles_ticket_71bc799_fk", columns: [table.maintenanceTicketId], foreignColumns: [MaintenanceTicketTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

