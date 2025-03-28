import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
    UserEntity,
    UserRole,
} from '../../../modules/users/entities/user.entity';

export const seedUsers = async (dataSource: DataSource) => {
    const userRepository = dataSource.getRepository(UserEntity);

    const users = Array.from({ length: 10 }).map((_, i) => ({
        name: `User${i + 1}`,
        surname: `Surname${i + 1}`,
        pin: `21505200250${(i + 1).toString().padStart(2, '0')}`,
        email: `user${i + 1}@example.com`,
        password: bcrypt.hashSync('secure123', 10),
        role: UserRole.USER,
    }));

    await userRepository.save(users);
    console.log('Users seeded!');
};
