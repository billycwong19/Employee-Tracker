
const inquirer = require('inquirer');
const db = require('./server')

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
menu()})
}

// GET mysql querys to select and display from corresponding tables
const getDepartments = () => {
  db.query('SELECT * FROM department', function (err, result) {
    console.log(result)
    menu()
  })
}
const getRoles = () => {
  db.query('SELECT * FROM role', function (err, result) {
    console.log(result)
    menu()
  })
}
const getEmployees = () => {
  db.query('SELECT * FROM employee', function (err, result) {
    console.log(result)
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
    const { name } = response
  db.query('INSERT INTO department (name) VALUES (?)', name, (err, result) => {
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+    *   NEW DEPARTMENT ADDED  *    +")
          console.log("+    * * * * * * * * * * * * * *    +")
          console.log("+++++++++++++++++++++++++++++++++++++")
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
  type: 'list',
  name: 'title',
  message: 'What is the ROLE TITLE?',
  choices: ["Manager", "Worker", "Apprentice"]
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
setTimeout (() => menu(), 2000)
  })
})
}




// role.delete('/delete/:id', (req, res) => {
//   const id = req.params.id;
//   const sql = `DELETE FROM role WHERE id = ?`;
//   const params = [id]
//   db.query(sql, params, (err, result) => {
//       if (err) {
//           res.status(400).json({ error: err.message});
//           return;
//       }
//       res.json({
//           message: 'Role Deleted Successfully',
//       })
//   })
// })

const init = () => {
  console.log("+++++++++++++++++++++++++++++++++++++")
  console.log("+    * * * * * * * * * * * * * *    +")
  console.log("+    * WELCOME TO THE DATABASE *    +")
  console.log("+    * * * * * * * * * * * * * *    +")
  console.log("+++++++++++++++++++++++++++++++++++++")
  setTimeout (() => menu(), 2000)
}
init();