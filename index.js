const inquirer = require('inquirer');
const db = require('./server')
const cTable = require('console.table');

const menu = () => {
  inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'What Would You Like To Do?',
      choices: ["View ALL Departments", "View ALL Roles", "View ALL Employees", new inquirer.Separator(), "Add A Department", "Add A Role", new inquirer.Separator(), "Add Employee", "Update Employee", new inquirer.Separator(),]
  })
.then(response => {
const { menu } = response
menu === "View ALL Departments" ? getDepartments() : 
menu === "View ALL Roles" ? getRoles() : 
menu === "View ALL Employees" ? getEmployees() : 
menu === "Add A Department" ? addDepartment() :
menu === "Add A Role" ? addRole() :
menu === "Add Employee" ? addEmployee() :
menu === "Update Employee" ? updateEmployee() :
console.log('error')})
}

// GET mysql querys to select and display from corresponding tables
const getDepartments = () => {
  db.query('SELECT * FROM department', function (err, result) {
    console.table(result)
    menu()
  })
}
const getRoles = () => {
  db.query('SELECT role.title, role.salary, department.department_name FROM role INNER JOIN department ON department.id = role.department_id;', function (err, result) {
    console.table(result)
    menu()
  })
}
const getEmployees = () => {
  db.query('SELECT employee.id, employee.first_name,employee.last_name,role.title, role.salary, department.department_name, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id;', function (err, result) {
    console.table(result)
    menu()
  })
}

const addDepartment = () => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *    ADD NEW DEPARTMENT   *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
inquirer.prompt({
  type: 'input',
  name: 'name',
  message: 'What is the new DEPARTMENT NAME?'
})
.then(response => {
  const { department_name } = response
    db.query('INSERT INTO department (name) VALUES (?)', department_name, (err, result) => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *   NEW DEPARTMENT ADDED  *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.table(response)
          setTimeout (() => menu(), 2000)
        })
    })
}

const addRole = () => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *     ADD A NEW ROLE      *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
inquirer.prompt([{
  type: 'input',
  name: 'title',
  message: 'What is the NEW ROLE TITLE?'
},{
  type: 'input',
  name: 'salary',
  message: 'What is the NEW ROLE SALARY?' 
},{
  type: 'list',
  name: 'department_id',
  message: 'What is the DEPARTMENT ID? ( 1 : Toys | 2 : Video-Games | 3 : Candy | 4 : Coal )',
  choices: [1, 2, 3, 4] 
}])
.then(response => {
    const { title, salary, department_id } = response
      db.query(`INSERT INTO role (title, salary, department_id)
      VALUES (?,?,?)`, [title, salary, department_id], (err, result) => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *       ROLE ADDED        *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.table(response)
          setTimeout (() => menu(), 2000)
        })
    })
}

const addEmployee = () => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *   ADD A NEW EMPLOYEE    *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
inquirer.prompt([{
  type: 'input',
  name: 'first_name',
  message: 'What is the new EPLOYEE\'S FIRST NAME?'
},{
  type: 'input',
  name: 'last_name',
  message: 'What is the new EPLOYEE\'S LAST NAME?' 
},{
  type: 'input',
  name: 'role_id',
  message: 'What is the new EPLOYEE\'S ROLE ID?' 
},{
  type: 'input',
  name: 'manager_id',
  message: 'What is the new EMPLOYEE\'S MANAGER ID, IF ANY?',
  default: [null]
}])
.then(response => {
  const { first_name, last_name, role_id, manager_id } = response
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager_id], (err, result) => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *      EMPLOYEE ADDED     *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.table(response)
          setTimeout (() => menu(), 2000)
        })
    })
}

const updateEmployee = () => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *   UPDATE EMPLOYEE ROLE  *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
inquirer.prompt([{
  type: 'input',
  name: 'id',
  message: 'Who would you like UPDATE? (Please enter EMPLOYEE ID #)'
},{
  type: 'input',
  name: 'role_id',
  message: 'What is the UPDATED EMPLOYEES new ROLE? (Please enter ROLE ID #)'
}])
.then(response => {
  const { id, role_id } = response
  const sql = `UPDATE employee SET role_id = '${role_id}' WHERE id = ${id};`
    db.query(sql, (err, result) => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *      EMPLOYEE ADDED     *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.table(response)
          setTimeout (() => menu(), 2000)
        })
    })
}

const init = () => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    * WELCOME TO THE DATABASE *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
          setTimeout (() => menu(), 2000)
}
init();