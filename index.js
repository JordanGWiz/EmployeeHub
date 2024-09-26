require("dotenv").config();
const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
});
pool.connect();

// Main menu with some modified prompts
const mainMenu = async () => {
  const answer = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to explore today?",
    choices: [
      " Browse departments",
      " Browse roles",
      " Browse employees",
      " Add a new department",
      " Add a new role",
      " Add a new employee",
      " Update an employee's role",
      " Exit",
    ],
  });

  switch (answer.action) {
    case " Browse departments":
      const departments = await viewDepartments();
      console.table(departments);
      break;
    case " Browse roles":
      const roles = await viewRoles();
      console.table(roles);
      break;
    case " Browse employees":
      const employees = await viewEmployees();
      console.table(employees);
      break;
    case " Add a new department":
      await promptAddDepartment();
      break;
    case " Add a new role":
      await promptAddRole();
      break;
    case " Add a new employee":
      await promptAddEmployee();
      break;
    case " Update an employee's role":
      await promptUpdateEmployeeRole();
      break;
    case " Exit":
      process.exit();
  }
  mainMenu();
};

// Function to prompt and add a department
const promptAddDepartment = async () => {
  const answer = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please provide a name for the new department:",
  });
  await addDepartment(answer.name);
};

// Function to prompt and add a role
const promptAddRole = async () => {
  const departments = await viewDepartments();
  const departmentNames = departments.map((dep) => dep.name);
  const answers = await inquirer.prompt([
    { type: "input", name: "title", message: "What is the title of the role?" },
    {
      type: "input",
      name: "salary",
      message: "Specify the salary for this role:",
    },
    {
      type: "list",
      name: "department",
      message: "Assign a department to the role:",
      choices: departmentNames,
    },
  ]);
  await addRole(answers.title, answers.salary, answers.department);
};

// Function to prompt and add an employee
const promptAddEmployee = async () => {
  const roles = await viewRoles();
  const managers = await viewEmployees();
  const roleTitles = roles.map((role) => role.title);
  const managerNames = managers.map(
    (mgr) => `${mgr.first_name} ${mgr.last_name}`
  );
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "First name of the employee:",
    },
    { type: "input", name: "last_name", message: "Last name of the employee:" },
    {
      type: "list",
      name: "role",
      message: "Assign a role:",
      choices: roleTitles,
    },
    {
      type: "list",
      name: "manager",
      message: "Assign a manager:",
      choices: managerNames,
    },
  ]);
  await addEmployee(
    answers.first_name,
    answers.last_name,
    answers.role,
    answers.manager
  );
};

// Function to update an employee's role
const promptUpdateEmployeeRole = async () => {
  const employees = await viewEmployees();
  const roles = await viewRoles();
  const employeeNames = employees.map(
    (emp) => `${emp.first_name} ${emp.last_name}`
  );
  const roleTitles = roles.map((role) => role.title);
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Select an employee to update:",
      choices: employeeNames,
    },
    {
      type: "list",
      name: "role",
      message: "Assign a new role:",
      choices: roleTitles,
    },
  ]);
  await updateEmployeeRole(answers.employee, answers.role);
};

mainMenu();
