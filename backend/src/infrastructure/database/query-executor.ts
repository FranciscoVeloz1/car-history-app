import type { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

type SqlParam = string | number | boolean | null | Buffer | Date;
type SqlParams = SqlParam[];

export interface QueryExecutor {
  query<T extends RowDataPacket[]>(sql: string, params?: SqlParams): Promise<T>;
  execute(sql: string, params?: SqlParams): Promise<ResultSetHeader>;
  executeRaw(sql: string): Promise<void>;
  transaction<T>(fn: (conn: TransactionConnection) => Promise<T>): Promise<T>;
}

export interface TransactionConnection {
  query<T extends RowDataPacket[]>(sql: string, params?: SqlParams): Promise<T>;
  execute(sql: string, params?: SqlParams): Promise<ResultSetHeader>;
  executeRaw(sql: string): Promise<void>;
}

function wrapConnection(conn: PoolConnection): TransactionConnection {
  return {
    async query<T extends RowDataPacket[]>(sql: string, params?: SqlParams): Promise<T> {
      const [rows] = await conn.query<T>(sql, params);
      return rows;
    },
    async execute(sql: string, params?: SqlParams): Promise<ResultSetHeader> {
      const [result] = await conn.execute<ResultSetHeader>(sql, params as unknown as (string | number)[]);
      return result;
    },
    async executeRaw(sql: string): Promise<void> {
      await conn.query(sql);
    },
  };
}

export function createQueryExecutor(pool: Pool): QueryExecutor {
  return {
    async query<T extends RowDataPacket[]>(sql: string, params?: SqlParams): Promise<T> {
      const [rows] = await pool.query<T>(sql, params);
      return rows;
    },

    async execute(sql: string, params?: SqlParams): Promise<ResultSetHeader> {
      const [result] = await pool.execute<ResultSetHeader>(sql, params as unknown as (string | number)[]);
      return result;
    },

    async executeRaw(sql: string): Promise<void> {
      await pool.query(sql);
    },

    async transaction<T>(fn: (conn: TransactionConnection) => Promise<T>): Promise<T> {
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        const result = await fn(wrapConnection(conn));
        await conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    },
  };
}
