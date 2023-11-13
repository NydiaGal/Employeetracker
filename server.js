const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


app.get ('/api/roles',(req, res) => {

});

app.get ('/api/departments',(req, res) => {

});

app.get ('/api/employees',(req, res) => {

});

app.post ('/api/employees',(req, res) => {

});

app.post ('/api/role',(req, res) => {

});

app.post ('/api/departments',(req, res) => {

});

app.put ('/api/roles',(req, res) => {

});

app.put ('/api/departments',(req, res) => {

});

app.put ('/api/employee',(req, res) => {

});

db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });


    
  // Query database
  db.query('SELECT * FROM course_names', function (err, results) {
    console.log(results);
  });

  db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });



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