// Classroom-only demo login. There is no server authentication or secure account storage.
// Never use this example to protect real restaurant records or personal information.
const DEMO_USERNAME = 'chef';
const DEMO_PASSWORD = 'Chef2026';

function validateDemoChef(username, password) {
  return String(username || '').trim().toLowerCase() === DEMO_USERNAME &&
    String(password || '') === DEMO_PASSWORD;
}

module.exports = { validateDemoChef };
