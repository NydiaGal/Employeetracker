const inquirer = require('inquirer');
const connection = require('./db');

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