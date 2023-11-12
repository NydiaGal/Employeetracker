const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();


const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the employee database');
  });
  
  module.exports = connection;

function employeeMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'View all roles',
          'View all departments',
          'Add employee',
          'Add role',
          'Add department',
          'Update employee role',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          break;
        case 'View all roles':
          break;
        case 'View all departments':
          break;
        case 'Add employee':
          break;
        case 'Add role':
          break;
        case 'Add department':
          break;
        case 'Update employee role':
          break;
        case 'Exit':
          connection.end();
          console.log('Goodbye!');
          break;
      }
    });
}


employeeMenu();