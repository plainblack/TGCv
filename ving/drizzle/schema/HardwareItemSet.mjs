import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, unique, char, varchar, text, int, bigint, json, mediumText, foreignKey } from '#ving/drizzle/orm.mjs';



export const HardwareItemSetTable = mysqlTable('hardwareitemsets',
    {
        id: bigint('id', {mode:'number', unsigned: true}).notNull().autoincrement().primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		name: varchar('name', { length: 60 }).notNull().default(''),
		itemCount: int('itemCount').notNull().default(0),
		taskCount: int('taskCount').notNull().default(0),
		status: mysqlEnum('status', ['in_use','retired']).notNull().default('in_use')
    }, 
    (table) => ({
        
    })
);

