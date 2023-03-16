import { vingSchema, vingProp } from '../../types/db';
import { baseSchemaProps, dbString, zodString, dbEnum, dbBoolean, makeTable } from '../helpers';
import type { InferModel } from 'drizzle-orm/mysql-core';

export const userSchema: vingSchema = {
    kind: 'User',
    tableName: 'users',
    owner: ['$id', 'admin'],
    props: [
        ...baseSchemaProps,
        {
            name: "username",
            required: true,
            unique: true,
            length: 60,
            default: '',
            db: (prop: vingProp) => dbString(prop),
            zod: (prop: vingProp) => zodString(prop),
            view: [],
            edit: ['owner'],
        },
        {
            name: "email",
            required: true,
            unique: true,
            default: '',
            db: (prop: vingProp) => dbString(prop),
            zod: (prop: vingProp) => zodString(prop).email(),
            view: [],
            edit: ['owner'],
        },
        {
            name: "realName",
            required: true,
            length: 60,
            default: '',
            db: (prop: vingProp) => dbString(prop),
            zod: (prop: vingProp) => zodString(prop),
            view: [],
            edit: ['owner'],
        },
        {
            name: "password",
            required: false,
            default: 'no-password-specified',
            db: (prop: vingProp) => dbString(prop),
            view: [],
            edit: [],
        },
        {
            name: "passwordType",
            required: false,
            default: 'bcrypt',
            db: (prop: vingProp) => dbEnum(prop),
            enums: ['bcrypt'],
            enumLabels: ['Bcrypt'],
            view: [],
            edit: [],
        },
        {
            name: 'useAsDisplayName',
            required: true,
            length: 20,
            default: 'username',
            db: (prop: vingProp) => dbEnum(prop),
            enums: ['username', 'email', 'realName'],
            enumLabels: ['Username', 'Email Address', 'Real Name'],
            view: [],
            edit: ['owner'],
        },
        {
            name: 'admin',
            required: true,
            default: false,
            db: (prop: vingProp) => dbBoolean(prop),
            enumLabels: ['Not Admin', 'Admin'],
            view: ['owner'],
            edit: ['admin'],
        },
        {
            name: 'developer',
            required: true,
            default: false,
            db: (prop: vingProp) => dbBoolean(prop),
            enumLabels: ['Not a Software Developer', 'Software Developer'],
            view: [],
            edit: ['owner'],
        },
    ],
};

export const RoleOptions = ["admin", "developer"] as const;

export const users = makeTable(userSchema);

/*
export const users = mysqlTable('users',
    {
        id: varchar('id', { length: 36 }).primaryKey(),
        createdAt: timestamp('createdAt').defaultNow().notNull(),
        updatedAt: timestamp('updatedAt').defaultNow().notNull(),
        username: varchar('username', { length: 60 }).notNull().default(''),
        email: varchar('email', { length: 256 }).notNull().default(''),
        realName: varchar('realName', { length: 60 }).notNull().default(''),
        password: varchar('password', { length: 256 }).notNull().default('no-password-specified'),
        passwordType: mysqlEnum('passwordType', ['bcrypt']).default('bcrypt').notNull(),
        useAsDisplayName: mysqlEnum('useAsDisplayName', ['username', 'email', 'realName']).default('username').notNull(),
        admin: boolean('admin').notNull().default(false),
        developer: boolean('developer').notNull().default(false),
    },
    (users) => ({
        usernameIndex: uniqueIndex('usernameIndex').on(users.username),
        emailIndex: uniqueIndex('emailIndex').on(users.email),
    })
);
*/

//export type User = InferModel<typeof users>; // return type when queried
//export type NewUser = InferModel<typeof users, 'insert'>; // insert type

// have to do this until infererence works
export type User = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    username: string,
    email: string,
    realName: string,
    password: string,
    passwordType: 'bcrypt',
    useAsDisplayName: 'username' | 'email' | 'realName',
    admin: boolean,
    developer: boolean
}