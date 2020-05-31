require('dotenv').config();
const db = require('../database');

afterAll(async () => {
  await db.connection.close();
});
