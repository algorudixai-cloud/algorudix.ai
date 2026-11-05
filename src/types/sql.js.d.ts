// Minimal types for the parts of sql.js (SQLite compiled to WebAssembly) this project uses.
declare module 'sql.js' {
  export type SqlValue = number | string | Uint8Array | null;
  export type BindParams = SqlValue[] | Record<string, SqlValue> | null;

  export interface QueryExecResult {
    columns: string[];
    values: SqlValue[][];
  }

  export interface Statement {
    bind(values?: BindParams): boolean;
    step(): boolean;
    getAsObject(params?: BindParams): Record<string, SqlValue>;
    run(values?: BindParams): void;
    reset(): void;
    free(): boolean;
  }

  export interface Database {
    run(sql: string, params?: BindParams): Database;
    exec(sql: string, params?: BindParams): QueryExecResult[];
    prepare(sql: string, params?: BindParams): Statement;
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | null) => Database;
  }

  export interface InitSqlJsConfig {
    locateFile?: (file: string) => string;
  }

  export default function initSqlJs(config?: InitSqlJsConfig): Promise<SqlJsStatic>;
}
