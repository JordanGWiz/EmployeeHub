DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

-- Create department table with id and name
CREATE TABLE department (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(25)
);

-- Create role table with title, salary, and reference to department
CREATE TABLE role (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

-- Create employee table with first name, last name, role reference, and manager reference
CREATE TABLE employee (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);