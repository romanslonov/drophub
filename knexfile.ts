import * as dotenv from 'dotenv';

dotenv.config();

export default {
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};
