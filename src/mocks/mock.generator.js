import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import { createHash } from '../utils/index.js';

const SPECIES = ['dog', 'cat', 'bird', 'rabbit', 'hamster'];

const PET_NAMES = [
    'Luna',
    'Milo',
    'Mora',
    'Toby',
    'Simón',
    'Lola',
    'Rocky',
    'Nala',
    'Pelusa',
    'Coco'
];

// Estos objetos imitan documentos de MongoDB, pero no se guardan automáticamente.
export function generatePets(quantity) {
    return Array.from({ length: quantity }, () => ({
        _id: new Types.ObjectId(),
        name: faker.helpers.arrayElement(PET_NAMES),
        specie: faker.helpers.arrayElement(SPECIES),
        birthDate: faker.date.past({ years: 8 }),
        adopted: false,
        __v: 0,
    }));
}

export async function generateUsers(quantity) {
    return Promise.all(Array.from({ length: quantity }, async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const emailBase = faker.internet.email({
            firstName,
            lastName,
            provider: 'example.com',
        }).toLowerCase();

        return {
            _id: new Types.ObjectId(),
            first_name: firstName,
            last_name: lastName,
            // El sufijo evita colisiones al insertar usuarios de prueba en MongoDB.
            email: emailBase.replace('@', `+${faker.string.uuid()}@`),
            password: await createHash('coder123'),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
            __v: 0,
        };
    }));
}
