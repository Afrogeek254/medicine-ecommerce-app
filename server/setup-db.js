/**
 * Grasha Pharma MySQL Database Initializer & Migration Runner
 * Usage: node server/setup-db.js
 */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Load environment variables from both root and server directory
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function setupDatabase() {
  // Use 127.0.0.1 by default on Windows to force TCP connection (bypasses Windows GSSAPI/Named Pipe mapping)
  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'root';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const databaseName = process.env.DB_NAME || 'grasha_pharma_db';

  console.log(`[Setup] Connecting to MySQL host at ${host}:${port} as '${user}' with configured password...`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      user,
      password,
      port,
      multipleStatements: true
    });
    console.log('[Setup] Connected to MySQL successfully!');

    // Read schema.sql
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('[Setup] Executing database schema from database/schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schemaSql);
      console.log('[Setup] ✓ Database & tables created successfully!');
    }

    // Read seed.sql
    const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');
    if (fs.existsSync(seedPath)) {
      console.log('[Setup] Inserting seed data from database/seed.sql...');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      await connection.query(seedSql);
      console.log('[Setup] ✓ Kenyan pharmacy medicines & users populated successfully!');
    }

    console.log(`\n🎉 MySQL Database setup complete for '${databaseName}'!`);
    console.log('You can now start the API server with: npm start\n');
  } catch (err) {
    console.error('\n[Setup Error] Failed to initialize MySQL database:', err.message);

    if (err.message && err.message.includes('auth_gssapi_client')) {
      console.log('\n======================================================');
      console.log('💡 MARIADB AUTHENTICATION PLUGIN FIX');
      console.log('Your local MariaDB server has Windows Kerberos/GSSAPI auth enabled.');
      console.log('To set standard native password for root, open your MySQL/MariaDB client or phpMyAdmin and run:');
      console.log('');
      console.log("  ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('root');");
      console.log("  ALTER USER 'root'@'127.0.0.1' IDENTIFIED VIA mysql_native_password USING PASSWORD('root');");
      console.log("  FLUSH PRIVILEGES;");
      console.log('======================================================\n');
    }
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

setupDatabase();
