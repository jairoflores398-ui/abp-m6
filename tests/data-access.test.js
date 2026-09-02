import test from 'node:test';
import assert from 'node:assert/strict';

import { sanitizeUser, buildUserFilters } from '../src/utils/data-utils.js';

test('sanitizeUser elimina campos sensibles', () => {
  const user = {
    id: '123',
    nombre: 'Ana',
    email: 'ana@test.com',
    password_hash: 'secret',
    createdAt: '2024-01-01'
  };

  const result = sanitizeUser(user);

  assert.equal(result.id, '123');
  assert.equal(result.nombre, 'Ana');
  assert.equal(result.email, 'ana@test.com');
  assert.equal(result.password_hash, undefined);
  assert.equal(result.createdAt, undefined);
});

test('buildUserFilters genera filtro por nombre', () => {
  const filters = buildUserFilters({ nombre: 'Juan' });

  assert.deepEqual(filters, { nombre: { [Symbol.for('like')]: '%Juan%' } });
});
