export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'albatros',
  username: 'albatros',
  database: 'albatros',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
