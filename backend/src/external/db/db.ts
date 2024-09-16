import firebird from 'node-firebird';
import dotenv from 'dotenv';

dotenv.config();

const options: firebird.Options = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const pool = firebird.pool(5, options);

export const getConnection = (): Promise<firebird.Database> => {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) {
        return reject(err);
      }
      resolve(db);
    });
  });
};
