import mysql from 'mysql2';

const MYSQL_HOST = process.env.MYSQL_HOST || 'mysql';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PORT = process.env.MYSQL_PORT || '3306';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
const MYSQL_DB = process.env.MYSQL_DB || 'admin';

console.log(process.env.MYSQL_HOST);

const pool = mysql.createPool({
  connectionLimit: 100,
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT, 10), // Переконайтеся, що порт є числом
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
});

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId);
    const createTimeTable = CREATE_TIMES_TABLE_SQL;
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log('Times table was created');
      } else {
        console.error('Error creating table:', err);
      }
    });
    connection.release();
  } else {
    console.error('Error connecting to MySQL:', err);
  }
});

export default pool;
