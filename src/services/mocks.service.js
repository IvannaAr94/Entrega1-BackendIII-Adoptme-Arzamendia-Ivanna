import { generatePets, generateUsers } from '../mocks/mock.generator.js';
import { petsService, usersService } from './index.js';

export async function saveMockData(usersCount, petsCount) {
    // Primero generamos los datos; luego usamos los repositorios ya existentes.
    const users = await generateUsers(usersCount);
    const pets = generatePets(petsCount);

    const savedUsers = users.length ? await usersService.createMany(users) : [];
    const savedPets = pets.length ? await petsService.createMany(pets) : [];

    return { users: savedUsers.length, pets: savedPets.length };
}
