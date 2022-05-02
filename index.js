const inquirer = require('inquirer')
const getEmployees = require('./routes/employee')

const menu = () => {
    inquirer.prompt([
    {
        type: "checkbox",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", new inquirer.Separator(), "Add A Department", "Add A Role", new inquirer.Separator(), "Update Employee", new inquirer.Separator(),]
    }
    ])
    .then((menuChoice) => {
        const { choice } = menuChoice
        choice == "View All Employees" ? getEmployees() : menu();
    })
}

menu()
