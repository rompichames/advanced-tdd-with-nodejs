import { test, describe } from 'node:test';
import assert from 'node:assert';
import { add, multiply, calculateTotal } from '../index.js';

describe('Basic Math Functions', () => {
  test('add function should add two numbers correctly', () => {
    assert.strictEqual(add(2, 3), 5);
    assert.strictEqual(add(-1, 1), 0);
    assert.strictEqual(add(0, 0), 0);
  });

  test('multiply function should multiply two numbers correctly', () => {
    assert.strictEqual(multiply(2, 3), 6);
    assert.strictEqual(multiply(-2, 3), -6);
    assert.strictEqual(multiply(0, 5), 0);
  });
});

describe('Calculate Total Function', () => {
  test('should calculate total for valid items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
      { price: 20, quantity: 1 }
    ];
    assert.strictEqual(calculateTotal(items), 55);
  });

  test('should return 0 for empty array', () => {
    assert.strictEqual(calculateTotal([]), 0);
  });

  test('should throw error for non-array input', () => {
    assert.throws(() => calculateTotal('not an array'), {
      message: 'Items must be an array'
    });
  });

  test('should throw error for items with invalid price or quantity', () => {
    const invalidItems = [
      { price: 'invalid', quantity: 2 }
    ];
    assert.throws(() => calculateTotal(invalidItems), {
      message: 'Each item must have numeric price and quantity'
    });
  });
});
