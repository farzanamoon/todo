import { Sequelize } from 'sequelize-typescript';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [join(__dirname, '..', '**/*.entity.js')],
        modelMatch: (filename, member) => {
          console.log(filename);
          return (
            filename.substring(0, filename.indexOf('.entity')) ===
            member.toLowerCase()
          );
        },
        logging: false,
      });
      await sequelize
        .sync({
          // force: true,
        })
        .then(() => {
          console.log(
            'Database connected to: ',
            process.env.DB_HOST || 'localhost',
          );
        })
        .catch(() => {
          console.log(
            'Database failed to connect: ',
            process.env.DB_HOST || 'localhost',
          );
        });
      return sequelize;
    },
  },
];
