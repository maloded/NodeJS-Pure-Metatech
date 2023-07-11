declare module 'pg' {
  export * from 'pg';
}

type QueryResult = Promise<object[]>;

declare interface CrudMethods {
  query(sql: string, args?: any[]): QueryResult;
  read(id: string | null, fields?: string[]): QueryResult;
  create(record: object): QueryResult;
  update(id: string, record: object): QueryResult;
  delete(id: string): QueryResult;
}

declare function crud(pool: any): (table: string) => CrudMethods;

declare const pg: any;

declare const exports: {
  crud: typeof crud;
  pg: typeof pg;
};

export = exports;
