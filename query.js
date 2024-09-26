require("dotenv").config();
const { Pool } = require("pg");


const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
});
pool.connect();

// Function to view all departments
const viewDepartments = async () => {
  try {
    const res = await pool.query("SELECT * FROM department");
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};

// Function to view all roles
const viewRoles = async () => {
  try {
    const res = await pool.query(
      "SELECT r.id, r.title, r.salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id"
    );
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};

// Function to view all employees
const viewEmployees = async () => {
  try {
    const res =
      await pool.query(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department,
    e.manager_id, m.first_name || ' ' || m.last_name AS manager
    FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id`);
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};

// Function to view all managers
const viewManagers = async () => {
  try {
    const res =
      await pool.query(`SELECT DISTINCT m.first_name || ' ' || m.last_name AS manager
    FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id`);
    return res.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
};

// Function to add a new department
const addDepartment = async (departmentName) => {
  try {
    await pool.query(`INSERT INTO department (name) VALUES ($1)`, [
      departmentName,
    ]);
    console.log("Added Department!");
  } catch (err) {
    console.log(err);
  }
};

// Function to add a new role
const addRole = async (inputData) => {
  const { role, salary, departments } = inputData;
  try {
    const depIdRes = await pool.query(
      "SELECT id FROM department WHERE name = $1",
      [departments]
    );
    const depId = depIdRes.rows[0].id;
    await pool.query(
      `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`,
      [role, salary, depId]
    );
    console.log("Added Role!");
  } catch (err) {
    console.log(err);
  }
};

// Function to add a new employee
const addEmployee = async (inputData) => {
  const { firstName, lastName, role, manager } = inputData;
  try {
    const roleIdRes = await pool.query("SELECT id FROM role WHERE title = $1", [
      role,
    ]);
    const roleId = roleIdRes.rows[0].id;
    const managerName = manager.split(" ");
    const managerIdRes = await pool.query(
      "SELECT id FROM employee WHERE first_name = $1 AND last_name = $2",
      [managerName[0], managerName[1]]
    );
    const managerId = managerIdRes.rows[0].id;
    await pool.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, roleId, managerId]
    );
    console.log("Added Employee!");
  } catch (err) {
    console.log(err);
  }
};

// Function to change an employee's role
const changeRole = async (inputData) => {
  const { employee, roles, manager } = inputData;
  try {
    const managerName = manager.split(" ");
    const managerIdRes = await pool.query(
      "SELECT id FROM employee WHERE first_name = $1 AND last_name = $2",
      [managerName[0], managerName[1]]
    );
    const managerId = managerIdRes.rows[0].id;
    const roleIdRes = await pool.query("SELECT id FROM role WHERE title = $1", [
      roles,
    ]);
    const roleId = roleIdRes.rows[0].id;
    const employeeName = employee.split(" ");
    await pool.query(
      `UPDATE employee SET role_id = $1, manager_id = $2 WHERE first_name = $3 AND last_name = $4`,
      [roleId, managerId, employeeName[0], employeeName[1]]
    );
    console.log("Updated Employee's Role!");
  } catch (err) {
    console.log(err);
  }
};

// Export all functions
module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  viewManagers,
  addDepartment,
  addRole,
  addEmployee,
  changeRole,
};
