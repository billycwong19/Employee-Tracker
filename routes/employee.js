const employee = require('express').Router();
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'dipxuj-0jatRu-zovxif',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

// GET 
employee.get('/', (req, res) => {
  const sql = 'SELECT * FROM employee'
  db.query(sql, function (err, result) {
      console.log(result)
      if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({result})
  });
});

employee.post('/add-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

employee.put('/update-employee', ({body}, res) => {
  const sql = `UPDATE employee SET first_name = '${body.first_name}', last_name = '${body.last_name}', role_id = ${body.role_id}, manager_id = ${body.manager_id} WHERE id = ${body.id};`
  db.query(sql, (err, result) => {
      if (err) {
          res.status(400).json({ error: err.message});
          return;
      }
      res.json({
          message: 'success',
          data: body
      })
      console.log(result);
  })
})

employee.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [id]
  db.query(sql, params, (err, result) => {
      if (err) {
          res.status(400).json({ error: err.message});
          return;
      }
      res.json({
          message: 'Employee Deleted Successfully',
      })
  })
})

module.exports = employee;