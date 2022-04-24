interface IDBConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  name: string;
}

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
} as IDBConfig;

export default dbConfig;
