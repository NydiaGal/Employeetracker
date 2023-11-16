const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log('You are connected to the employee database.');
});

module.exports =  connection;

//app.get('/api/roles', (req, res) => {
  //db.query('SELECT * FROM roles', function (err, results) {
   // if (err) {
    //  res.status(500).json({ message: 'Not functioning as intended' });
   // }
  //  res.status(200).json(results);
  // });
// });

// app.get('/api/departments', (req, res) => {
  // db.query("SELECT * FROM departments", function (err, results) {
    // if (err) {
      // res.status(500).json({ message: 'Not functioning as intended' });
    // }
    // res.status(200).json(results);
  // });
// });

// app.get('/api/employees', (req, res) => {
  // db.query("SELECT * FROM employees", function (err, results) {
    // if (err) {
      // res.status(500).json({ message: 'Not functioning as intended' });
    // }
    // res.status(200).json(results);
  // });
// });

// app.post('/api/employees', (req, res) => {
  // db.query("INSERT INTO employees (employee_ID) VALUES (?)", req.body.employee_ID, (err, results) => {
    // if (err) {
      // res.status(400).json({ message: 'Incorrect data was entered. Please try again.' });
    // }
    // res.status(201).json(results);
  // });
// });

// app.post('/api/roles', (req, res) => {
  // db.query("INSERT INTO roles (role_ID) VALUES (?)", req.body.roles_ID, (err, results) => {
    // if (err) {
      // res.status(400).json({ message: 'Incorrect data was entered. Please try again.' });
    // }
    // res.status(201).json(results);
  // });
// });

// app.post('/api/departments', (req, res) => {
  // db.query("INSERT INTO departments (department_name) VALUES (?)", req.body.department_name, (err, results) => {
    // if (err) {
      // res.status(400).json({ message: 'Incorrect data was entered. Please try again.' });
    // }
    // res.status(201).json(results);
  // });
// });

// app.put('/api/roles', (req, res) => {
  // db.query("UPDATE roles SET role = ?", req.body.roles_ID, (err, results) => {
    // if (err) {
      // res.status(500).json({ message: 'Incorrect data was entered. Please try again.' });
    // }
    // res.status(200).json(results);
  // });
// });

// app.put('/api/departments', (req, res) => {
  // db.query("UPDATE departments SET department = ?", req.body.department_name, (err, results) => {
    // if (err) {
      // res.status(500).json({ message: 'Incorrect data was entered. Please try again.' });
    // }
    // res.status(200).json(results);
  // });
// });

// app.put('/api/employee/id:', (req, res) => {
  // db.query("UPDATE employees SET employee = ? WHERE employee_id = ?", [req.body.employee, req.params.id], (err, results) => {
    // if (err) {
      // res.status(500).json({ message: 'Incorrect data was entered. Please try again.' });
    // }
    // res.status(204).json(results);
  // });
// });

// app.use((req, res) => {
  // res.status(404).end();
// });


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
          viewAllEEs();
          break;
        case 'View all roles':
          viewAllRles();
          break;
        case 'View all departments':
          viewAllDPTS();
          break;
        case 'Add employee':
          addEE();
          break;
        case 'Add role':
          addRle();
          break;
        case 'Add department':
          addDpt();
          break;
        case 'Update employee role':
          updateEE();
          break;
        case 'Exit':
          connection.end();
          console.log('Have a great day!');
          break;
      }
    });
}

employeeMenu()

function viewAllEEs() {
  const query = "SELECT * FROM employees";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      employeeMenu();
  });
}
function viewAllDPTS () {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      employeeMenu();
  });
}

function viewAllRles() {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      employeeMenu();
  });
}

function addEE() {
  connection.query("SELECT role_id, title FROM roles", (error, results) => {
      if (error) {
          console.error(error);
          return;
      }

      const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
      }));

      connection.query(
          'SELECT employee_id, CONCAT(first_name, " ", last_name) AS name FROM employees',
          (error, results) => {
              if (error) {
                console.error(error);
                    return;
                }

                const managers = results.map(({ id, name }) => ({
                    name,
                    value: id,
                }));

                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "What is the employee's first name?",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "What is the employee's last name?",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "What is the employee's role?",
                            choices: roles,
                        },
                        {
                            type: "list",
                            name: "managerId",
                            message: "Who is the employee's manager?",
                            choices: [
                                { name: "None", value: null },
                                ...managers,
                            ],
                        },
                    ])
                    .then((answers) => {
                        const sql =
                            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.roleId,
                            answers.managerId,
                        ];
                        connection.query(sql, values, (error) => {
                            if (error) {
                              console.error(error);
                                return;
                            }

                            console.log("You've succesfully added a new employee!");
                            employeeMenu();
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    });
}

function addRle() {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, res) => {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  type: "input",
                  name: "title",
                  message: "What is the title of the new role?",
              },
              {
                  type: "input",
                  name: "salary",
                  message: "What is the salary for the new role?",
              },
              {
                  type: "list",
                  name: "department",
                  message: "What is the department for the new role?",
                  choices: res.map(
                      (department) => department.department_name
                  ),
              },
          ])
          .then((answers) => {
              const department = res.find(
                  (department) => department.name === answers.department
              );
              const query = "INSERT INTO roles SET ?";
              connection.query(
                  query,
                  {
                      title: answers.title,
                      salary: answers.salary,
                      department_id: department,
                  },
                  (err, res) => {
                      if (err) throw err;
                      console.log(
                          `Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department in the database!`
                      );
                    
                      employeeMenu();
                  }
              );
          });
  });
}

function addDpt() {
  inquirer
      .prompt({
          type: "input",
          name: "name",
          message: "What is the name of the new department?",
      })
      .then((answer) => {
          console.log(answer.name);
          const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
          connection.query(query, (err, res) => {
              if (err) throw err;
              console.log(`You have successfully added ${answer.name} department to the database!`);
              employeeMenu();
              console.log(answer.name);
          });
      });
}

function updateEE() {
  const queryEmployees =
      "SELECT employee_id, employees.first_name, employees.last_name, roles.title FROM employees INNER JOIN roles ON employees.role_id = roles.id";
  const queryRoles = "SELECT * FROM roles";
  connection.query(queryEmployees, (err, resEmployees) => {
      if (err) throw err;
      connection.query(queryRoles, (err, resRoles) => {
          if (err) throw err;
          inquirer
              .prompt([
                  {
                      type: "list",
                      name: "employee",
                      message: "Select the employee requiring an update:",
                      choices: resEmployees.map(
                          (employee) =>
                              `${employee.first_name} ${employee.last_name}`
                      ),
                  },
                  {
                      type: "list",
                      name: "role",
                      message: "Select the new role:",
                      choices: resRoles.map((role) => role.title),
                  },
              ])
              .then((answers) => {
                  const employee = resEmployees.find(
                      (employee) =>
                          `${employee.first_name} ${employee.last_name}` ===
                          answers.employee
                  );
                  const role = resRoles.find(
                      (role) => role.title === answers.role
                  );
                  const query =
                      "UPDATE employees SET role_id = ? WHERE id = ?";
                  connection.query(
                      query,
                      [role.id, employee.id],
                      (err, res) => {
                          if (err) throw err;
                          console.log(
                              `You have successfully updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                          );
                          employeeMenu();
                      }
                  );
              });
      });
  });
}

process.on("exit", () => {
  connection.end();
});