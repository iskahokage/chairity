import 'reflect-metadata';
import { seedUsers } from './user.seed';
import { AppDataSource } from '../db';

const seedDatabase = async () => {
    const dataSource = await AppDataSource.initialize();
    console.log('🔄 Запуск сидов...');

    await seedUsers(dataSource);

    await dataSource.destroy();
    console.log('✅ Сиды завершены');
};

seedDatabase().catch((err) => {
    console.error('❌ Ошибка при запуске сидов', err);
});
