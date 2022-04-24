const isProd = process.env.NODE_ENV === 'production';
const rootDir = isProd ? 'dist' : 'src';
const extension = isProd ? 'js' : 'ts';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  extra: {
    socketPath: process.env.DB_HOST,
  },
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`./${rootDir}/database/entities/*.${extension}`],
  migrations: [`./${rootDir}/database/migrations/*.${extension}`],
  cli: {
    migrationsDir: `./${rootDir}/database/migrations`,
  },
};
