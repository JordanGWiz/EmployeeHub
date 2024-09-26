# EmployeeHub

EmployeeHub is a web application that allows users to manage their company's employee database. Built using Node.js, Express, and PostgreSQL, EmployeeHub helps users view and organize their company's departments, roles, and employees while providing an easy-to-use interface for efficient employee management.

- View all departments: Users can see a neatly formatted table showcasing all department names alongside their IDs.

- View all roles: Users can explore a table displaying job titles, role IDs, associated departments, and respective salaries for each role.

- View all employees: Users can check out a detailed table with employee information, including IDs, names, job titles, salaries, and managers.

- Add a department: Users can enter the name of the new department and add it to the database.

- Add a role: Users can enter an employee's name, salary, and department and add it to the employee database.

- Add an employee: Users can enter a new employee's first name, last name, role, and their manager and add it to the database.

- Update an employee role: Users can choose an employee and update their role as needed.

## Installation

To install EmployeeHub:

- Clone the repository

- Navigate to the project directory.

- Open the terminal and install the dependencies by running the command: `npm install`.

- Set up the PostgreSQL database:

  - Enter `psql -U postgres` to open the PostgreSQL command line interface. If prompted, input your password.
  - To set up the database, type `\i schema.sql` and press Enter.
  - Next, type `\i seeds.sql` and press Enter to insert the seed data. Now your database is ready to use!

- Remove '.EXAMPLE' from the .env.EXAMPLE file renaming it to .env.

- Configure that .env file with your database credentials.

## Usage

- Start the application by running the command: `node index.js` in the terminal.

- Follow the prompts to navigate through the menu options.

![Screenshot of EmployeeHub](./images/Screenshot%202024-09-26%20092102.png)

[Link to Walk Through Video](./images/Screen%20Recording%202024-09-26%20093021.mp4)

## Credits

This project was made possible with the help of:

- **Joem Casusi (Tutor)** for guidance and support throughout the development process.
