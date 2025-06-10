import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';
import {S3FileTable} from '#ving/drizzle/schema/S3File.mjs';
import {HardwareTicketTable} from '#ving/drizzle/schema/HardwareTicket.mjs';


export const HardwareTicketFileTable = mysqlTable('hardwareticketfiles',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		s3FileId: bigint('s3FileId', {mode:'number', unsigned: true}).notNull(),
		hardwareTicketId: bigint('hardwareTicketId', {mode:'number', unsigned: true}).notNull()
    }, 
    (table) => ([
        foreignKey({ name: "hardwareticketfiles_s3file_77c6b8a8_fk", columns: [table.s3FileId], foreignColumns: [S3FileTable.id]}).onDelete("cascade").onUpdate("cascade"),
		foreignKey({ name: "hardwareticketfiles_ticket_731a4138_fk", columns: [table.hardwareTicketId], foreignColumns: [HardwareTicketTable.id]}).onDelete("cascade").onUpdate("cascade")
    ])
);

