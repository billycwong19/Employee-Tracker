const department = require('express').Router();
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
department.get('/', (req, res) => {
  const sql = 'SELECT * FROM department'
  db.query(sql, function (err, result) {
      console.log(result)
      if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({result})
  });
});

department.post('/add-department', ({ body }, res) => {
  const sql = `INSERT INTO department (name)
    VALUES (?)`;
  const params = [body.name];
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

department.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [id]
  db.query(sql, params, (err, result) => {
      if (err) {
          res.status(400).json({ error: err.message});
          return;
      }
      res.json({
          message: 'Department Deleted Successfully',
      })
  })
})

module.exports = department
