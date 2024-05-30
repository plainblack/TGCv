import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {S3FileTable} from '#ving/drizzle/schema/S3File.mjs';
import {MaintenanceTicketTable} from '#ving/drizzle/schema/MaintenanceTicket.mjs';


export const MaintenanceFileTable = mysqlTable('maintenancefiles',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		s3FileId: bigint('s3FileId', {mode:'number', unsigned: true}).notNull(),
		maintenanceTicketId: bigint('maintenanceTicketId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ({
        maintenancefiles_s3file_bc83f09_fk: foreignKey({ name: "maintenancefiles_s3file_bc83f09_fk", columns: [table.s3FileId], foreignColumns: [S3FileTable.id]}).onDelete("cascade").onUpdate("cascade"),
		maintenancefiles_ticket_71bc799_fk: foreignKey({ name: "maintenancefiles_ticket_71bc799_fk", columns: [table.maintenanceTicketId], foreignColumns: [MaintenanceTicketTable.id]}).onDelete("cascade").onUpdate("cascade")
    })
);

