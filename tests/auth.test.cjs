const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateDemoChef } = require('../src/utils/auth');

test('classroom chef login accepts the documented demo details', () => {
  assert.equal(validateDemoChef('chef', 'Chef2026'), true);
  assert.equal(validateDemoChef(' CHEF ', 'Chef2026'), true);
});
test('classroom chef login rejects missing or incorrect details', () => {
  assert.equal(validateDemoChef('', 'Chef2026'), false);
  assert.equal(validateDemoChef('guest', 'Chef2026'), false);
  assert.equal(validateDemoChef('chef', 'wrong'), false);
  assert.equal(validateDemoChef('chef', ''), false);
});
