const inquirer = require("inquirer");
require("console.table");
const connection = require("./config/connection");

const menuOptions = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: "options",
                message: "What would you like to do?",
                choices: ['Add Employees', 'Add Roles', 'Add Departments', 'View Employees', 'View Roles', 'View Departments', 'Update Employee Role', 'Exit']
            }
        ]).then(answer => {
            console.log(answer)
            switch (answer.options) {
                case 'View Employees':
                    viewEmployees();
                    break;

                case 'View Roles':
                    viewRoles();
                    break;

                case 'View Departments':
                    viewDepartments();
                    break;

                case 'Exit':
                    exitSession();
                    break;
            }
        })
}

function viewEmployees() {
    const query = `SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.salary, role.title, department_id
    FROM employee 
    INNER JOIN role 
    ON employee.role_id = role.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        menuOptions();
    })
}

function viewRoles() {
    const query = `SELECT role.title, role.salary, role.department_id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id
    FROM role
    INNER JOIN employee
    ON role.id = employee.role_id
    ORDER BY role.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        menuOptions();
    })
}

function viewDepartments() {
    const query = `SELECT department.id, department.name, employee.id, employee.first_name, employee.last_name
    FROM department
    INNER JOIN employee
    ON employee.department_id = department.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        menuOptions();
    })
}

function exitSession() {
    console.log(`Session ended by id #${connection.threadId}`)
    connection.end();
}

menuOptions();