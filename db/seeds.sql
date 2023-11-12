INSERT INTO departments (department_name) VALUES
    ('Clinical'),
    ('IT'),
    ('Network Management'),
    ('Administrative');

INSERT INTO roles (title, department_id, salary) VALUES
    ('Case Manager', 1, 55000.00),
    ('Software Engineer', 2, 80000.00),
    ('Customer Service Manager', 3, 55000.00),
    ('Network Operations Manager', 4, 55000.00);

INSERT INTO employees (first_name, last_name, role_id, manager_id, hire_date) VALUES
    ('Juan', 'Million', 1, NULL, '1999-12-31'),
    ('Juana', 'Million', 3, 2, '1999-12-20');
