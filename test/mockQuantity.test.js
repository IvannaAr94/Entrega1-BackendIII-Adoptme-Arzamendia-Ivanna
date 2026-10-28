import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidQuantity, parseQueryQuantity } from '../src/utils/mockQuantity.js';

test('GET: por defecto genera 50', () => {
    assert.equal(parseQueryQuantity(undefined), 50);
    assert.equal(parseQueryQuantity('7'), 7);
    assert.equal(parseQueryQuantity('0'), 0);
});

test('GET: rechaza cantidades inválidas', () => {
    for (const value of ['abc', '1.5', '-1', '', '1001']) {
        assert.equal(parseQueryQuantity(value), null);
    }
});

test('POST: acepta enteros de 0 a 1000', () => {
    assert.equal(isValidQuantity(50), true);
    assert.equal(isValidQuantity(0), true);
    assert.equal(isValidQuantity(1000), true);
    for (const value of ['50', 3.2, -2, 1001, null, undefined]) {
        assert.equal(isValidQuantity(value), false);
    }
});
