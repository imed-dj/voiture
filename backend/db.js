// backend/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '077imeded',
    database: 'voiture'
});

module.exports = db;
