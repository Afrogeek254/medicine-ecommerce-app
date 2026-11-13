/**
 * Grasha Pharma MySQL Database Connection Pool
 */
const path = require('path');
const mysql = require('mysql2/promise');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1', // 127.0.0.1 forces TCP connection and avoids Windows socket/GSSAPI fallback
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'root',
  database: process.env.DB_NAME || 'grasha_pharma_db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
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

module.exports = { pool, dbConfig, testConnection };
