import type { AnyMySqlColumnBuilder } from 'drizzle-orm/mysql-core/columns/common';
import type { ZodTypeAny } from 'zod';


export type vingProp = {
    name: string,
    //    name: keyof ModelProps<T>,
    length?: number,
    default: boolean | string | number | Date | undefined | (() => boolean | string | number | Date),
    db: (prop: vingProp) => AnyMySqlColumnBuilder,
    zod?: (prop: vingProp) => ZodTypeAny,
    required: boolean,
    relation?: {
        type: '1:n' | 'n:1' | 'n:n' | '1:1',
        name: string,
    },
    unique?: boolean,
    enums?: [string, ...string[]],
    enumLabels?: [string, ...string[]],
    view: string[],
    edit: string[],
    noSetAll?: boolean,
}

export type vingSchema = {
    kind: string,
    tableName: string,
    owner: string[]
    props: vingProp[],
}