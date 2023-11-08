const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // MySQL password
  password: '',
  database: 'classlist_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
  });
  
  module.exports = connection;