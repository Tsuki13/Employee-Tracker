const inquirer = require("inquirer");
const cTable = require("console.table");

const menuOptions = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: "options",
                message: "What would you like to do?",
                choices: ["Add Employees", "Add Roles", "Add Departments", "View Employees", "View Roles", "View Departments", "Update Employee Role", "Exit"]
            }
        ])
}