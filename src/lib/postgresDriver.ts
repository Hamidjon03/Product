import { Pool, PoolClient } from "pg";
import { config } from "../common/config";

const pool = new Pool({
  connectionString: `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`,
});

export class Postgres {
  async fetch<ResponseType, ARGType = any>(
    sql: string,
    ...arg: ARGType[]
  ): Promise<ResponseType> {
    const client: PoolClient = await pool.connect();

    try {
      const {
        rows: [data],
      } = await client.query(sql, arg);

      return data;
    } finally {
      client.release();
    }
  }

  async fetchAll<ResponseType, ARGType = any>(
    sql: string,
    ...arg: ARGType[]
  ): Promise<ResponseType[]> {
    const client: PoolClient = await pool.connect();

    try {
      const { rows } = await client.query(sql, arg);

      return rows;
    } finally {
      client.release();
    }
  }

  get getPool(): Pool {
    return pool;
  }
}
