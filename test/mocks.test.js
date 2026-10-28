import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import bcrypt from 'bcrypt';
import mocksRouter from '../src/routes/mocks.router.js';

const app = express();
app.use(express.json());
app.use('/api/mocks', mocksRouter);
app.use((error, req, res, next) => res.status(500).json({ status: 'error' }));

test('GET /mockingusers devuelve 50 usuarios compatibles con MongoDB', async () => {
    const response = await request(app).get('/api/mocks/mockingusers');
    assert.equal(response.status, 200);
    assert.equal(response.body.payload.length, 50);
    const user = response.body.payload[0];
    assert.match(user._id, /^[0-9a-f]{24}$/);
    assert.ok(['user', 'admin'].includes(user.role));
    assert.deepEqual(user.pets, []);
    assert.notEqual(user.password, 'coder123');
    assert.equal(await bcrypt.compare('coder123', user.password), true);
});

test('GET /mockingpets genera mascotas sin guardarlas', async () => {
    const response = await request(app).get('/api/mocks/mockingpets?quantity=3');
    assert.equal(response.status, 200);
    assert.equal(response.body.payload.length, 3);
    assert.ok(response.body.payload.every(pet => pet.adopted === false));
});

test('POST /generateData rechaza datos inválidos antes de acceder a MongoDB', async () => {
    const response = await request(app)
        .post('/api/mocks/generateData')
        .send({ users: '5', pets: -1 });
    assert.equal(response.status, 400);
    assert.equal(response.body.status, 'error');
});
