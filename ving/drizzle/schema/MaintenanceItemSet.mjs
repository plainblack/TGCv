import { boolean, mysqlEnum, mysqlTable, timestamp, datetime, uniqueIndex, varchar, text, int, json, mediumText } from '#ving/drizzle/orm.mjs';



export const MaintenanceItemSetTable = mysqlTable('maintenanceitemsets',
    {
        id: varchar('id', { length: 36 }).notNull().default('uuid-will-be-generated').primaryKey(),
		createdAt: timestamp('createdAt').defaultNow().notNull(),
		updatedAt: timestamp('updatedAt').defaultNow().notNull().onUpdateNow(),
		name: varchar('name', { length: 60 }).notNull().default(''),
		status: mysqlEnum('status', ['in_use','retired']).notNull().default('in_use')
    }, 
    (table) => ({
        
    })
);

