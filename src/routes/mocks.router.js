import { Router } from 'express';
import { generateData, getMockPets, getMockUsers } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', getMockPets);
router.get('/mockingusers', getMockUsers);
router.post('/generateData', generateData);

export default router;
