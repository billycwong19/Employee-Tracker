const role = require('express').Router();
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
role.get('/', (req, res) => {
  const sql = 'SELECT * FROM role'
  db.query(sql, function (err, result) {
      console.log(result)
      if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({result})
  });
});

role.post('/add-role', ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

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

role.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [id]
  db.query(sql, params, (err, result) => {
      if (err) {
          res.status(400).json({ error: err.message});
          return;
      }
      res.json({
          message: 'Role Deleted Successfully',
      })
  })
})

module.exports = role
