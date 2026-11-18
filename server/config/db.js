/**
 * Grasha Pharma MySQL Database Connection Pool
 */
const path = require('path');
const mysql = require('mysql2/promise');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { resolveConnectionSettings } = require('./db-settings');

const dbConfig = {
  ...resolveConnectionSettings(),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
};

const pool = mysql.createPool(dbConfig);

// Test connectivity
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`[MySQL] Successfully connected to database '${dbConfig.database}' on ${dbConfig.host}:${dbConfig.port}`);
    connection.release();
    return true;
  } catch (err) {
    console.warn(`[MySQL Warning] Could not connect to MySQL: ${err.message}`);
    return false;
  }
}

module.exports = { pool, dbConfig, testConnection, resolveConnectionSettings };
