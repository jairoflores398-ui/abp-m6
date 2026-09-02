import { Sequelize } from 'sequelize';
import 'dotenv/config';

const isDatabaseUrlSet = Boolean(process.env.DATABASE_URL);

const sequelize = isDatabaseUrlSet
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: process.env.DB_SSL === 'true'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    })
  : new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'abp_m6',
      logging: false,
      dialectOptions: process.env.DB_SSL === 'true'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    });

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a PostgreSQL.');
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con PostgreSQL.');
    return true;
  } catch (error) {
    console.error('No se pudo conectar con PostgreSQL. Verifica la configuración en .env y que el servicio esté activo.');
    console.error(error.message);
    return false;
  }
};

export default sequelize;
