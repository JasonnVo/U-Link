import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      google_id TEXT UNIQUE,
      email TEXT UNIQUE,
      username TEXT
    )`
  );
});

export default db;