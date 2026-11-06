const { test } = require('node:test');
const assert = require('node:assert/strict');
const { COURSES, validateMenu, searchAndFilter, menuStatistics, formatPrice } = require('../src/utils/menu.js');

const sample = [
  { name: 'Bobotie', description: 'Traditional main', course: 'Main Course', price: 145 },
  { name: 'Cheesecake', description: 'Berry topping', course: 'Dessert', price: 50 },
  { name: 'Soup', description: 'Fresh starter', course: 'Starter', price: 65 }
];

test('validates and trims all inputs', () => {
  const v = validateMenu({ name: ' Bobotie ', description: ' Spiced mince ', course: 'Main Course', price: '145.50' });
  assert.equal(v.valid, true);
  assert.deepEqual(v.data, { name: 'Bobotie', description: 'Spiced mince', course: 'Main Course', price: 145.5 });
});

test('rejects blank name and description, incorrect course, and negative/zero price', () => {
  const v = validateMenu({ name: ' ', description: '', course: 'Invalid', price: '-4' });
  assert.equal(v.valid, false);
  assert.deepEqual(Object.keys(v.errors).sort(), ['course', 'description', 'name', 'price']);
  assert.equal(validateMenu({ name: 'A', description: 'B', course: 'Starter', price: '0' }).valid, false);
  assert.equal(validateMenu({ name: 'A', description: 'B', course: 'Starter', price: '11.999' }).valid, false);
});

test('accepts a decimal comma and converts to a number', () => {
  const v = validateMenu({ name: 'A', description: 'B', course: 'Drinks', price: '18,50' });
  assert.equal(v.data.price, 18.5);
});

test('case-insensitive search checks names and descriptions', () => {
  assert.equal(searchAndFilter(sample, 'BOBO', 'All').length, 1);
  assert.equal(searchAndFilter(sample, 'berry', 'All')[0].name, 'Cheesecake');
});

test('combined search and course filter', () => {
  assert.equal(searchAndFilter(sample, 'spiced', 'Dessert').length, 0);
  assert.equal(searchAndFilter(sample, '', 'Main Course')[0].name, 'Bobotie');
});

test('statistics return correct totals, averages and counts', () => {
  const s = menuStatistics(sample);
  assert.equal(s.totalItems, 3);
  assert.equal(s.averagePrice, (145 + 50 + 65) / 3);
  assert.equal(s.totalMenuValue, 260);
  assert.equal(s.cheapest.name, 'Cheesecake');
  assert.equal(s.mostExpensive.name, 'Bobotie');
  assert.equal(s.counts['Main Course'], 1);
  assert.equal(s.counts['Drinks'], 0);
});

test('empty menu never divides by zero', () => {
  const s = menuStatistics([]);
  assert.equal(s.averagePrice, 0);
  assert.equal(s.totalItems, 0);
  assert.equal(s.cheapest, null);
  assert.equal(s.mostExpensive, null);
});

test('currency formatting and all four courses are available', () => {
  assert.equal(formatPrice(145), 'R145.00');
  assert.deepEqual(COURSES, ['Starter', 'Main Course', 'Dessert', 'Drinks']);
});
