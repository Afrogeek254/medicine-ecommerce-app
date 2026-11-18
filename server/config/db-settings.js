/**
 * Shared MySQL connection settings resolver (used by db.js and setup-db.js)
 */
/**
 * Resolves MySQL connection settings.
 * Priority:
 *   1. A connection URL in MYSQL_URL, DATABASE_URL or MYSQL_PUBLIC_URL
 *      (e.g. Railway: mysql://user:pass@host:port/dbname)
 *   2. Railway's individual variables (MYSQLHOST, MYSQLUSER, ...)
 *   3. Legacy DB_HOST / DB_USER / DB_PASSWORD / DB_NAME / DB_PORT
 */
function resolveConnectionSettings() {
  const url = process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL;
  if (url) {
    const u = new URL(url);
    return {
      host: u.hostname,
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: decodeURIComponent(u.pathname.replace(/^\//, '')) || 'grasha_pharma_db',
      port: parseInt(u.port || '3306', 10)
    };
  }
  const env = process.env;
  return {
    host: env.MYSQLHOST || env.DB_HOST || '127.0.0.1', // 127.0.0.1 forces TCP connection and avoids Windows socket/GSSAPI fallback
    user: env.MYSQLUSER || env.DB_USER || 'root',
    password: env.MYSQLPASSWORD ?? (env.DB_PASSWORD !== undefined ? env.DB_PASSWORD : 'root'),
    database: env.MYSQLDATABASE || env.DB_NAME || 'grasha_pharma_db',
    port: parseInt(env.MYSQLPORT || env.DB_PORT || '3306', 10)
  };
}

module.exports = { resolveConnectionSettings };
