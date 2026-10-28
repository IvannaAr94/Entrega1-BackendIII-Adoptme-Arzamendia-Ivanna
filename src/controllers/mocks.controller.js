import { generatePets, generateUsers } from '../mocks/mock.generator.js';
import { saveMockData } from '../services/mocks.service.js';
import { isValidQuantity, parseQueryQuantity } from '../utils/mockQuantity.js';

export function getMockPets(req, res) {
    const quantity = parseQueryQuantity(req.query.quantity);
    if (quantity === null) {
        return res.status(400).json({ status: 'error', error: 'Cantidad de mascotas inválida' });
    }

    return res.json({ status: 'success', payload: generatePets(quantity) });
}

export async function getMockUsers(req, res, next) {
    const quantity = parseQueryQuantity(req.query.quantity);
    if (quantity === null) {
        return res.status(400).json({ status: 'error', error: 'Cantidad de usuarios inválida' });
    }

    try {
        const users = await generateUsers(quantity);
        return res.json({ status: 'success', payload: users });
    } catch (error) {
        return next(error);
    }
}

export async function generateData(req, res, next) {
    const { users, pets } = req.body ?? {};

    if (!isValidQuantity(users) || !isValidQuantity(pets)) {
        return res.status(400).json({
            status: 'error',
            error: 'users y pets deben ser números enteros entre 0 y 1000',
        });
    }

    try {
        const inserted = await saveMockData(users, pets);
        return res.status(201).json({ status: 'success', payload: inserted });
    } catch (error) {
        return next(error);
    }
}
