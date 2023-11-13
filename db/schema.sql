DROP DATABASE IF EXISTS sample_employee_db;

CREATE DATABASE sample_employee_db;

USE sample_employee_db;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    department_id INT,
    salary DECIMAL(10, 2),
    FOREIGN KEY (department_id) 
    REFERENCES departments(department_id)
);
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT,
    hire_date DATE,
    FOREIGN KEY (role_id) 
    REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) 
    REFERENCES employees(employee_id)
);
