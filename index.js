const inquirer = require("inquirer");
const cTable = require("console.table");

const menuOptions = () => {
    inquirer
        .prompt([
            {
                name: "options",
                type: 'list',
                choices: ["Add Employees", "Add Roles", "Add Departments", "View Employees", "View Roles", "View Departments", "Update Employee Role", "Exit"]
            }
        ])
}