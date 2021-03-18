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

                case 'Exit':
                    break;
            }
        })
}

menuOptions();

function viewEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id
    FROM employee
    ORDER BY employee.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.table(res)
        connection.end();
        menuOptions();
    })
}