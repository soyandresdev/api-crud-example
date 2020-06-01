require('dotenv').config();
console.log(process.env.PORT);
const db = require('../database');

afterAll(async () => {
  await db.connection.close();
});
