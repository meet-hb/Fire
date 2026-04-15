import pg from 'pg';

const { Pool } = pg;

let poolInstance = null;

export const hasDatabaseConfig = () => Boolean(process.env.DATABASE_URL);

export const getPool = () => {
  if (!hasDatabaseConfig()) {
    return null;
  }

  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  return poolInstance;
};

export default getPool;
