require("dotenv").config();
var inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
});
pool.connect();
