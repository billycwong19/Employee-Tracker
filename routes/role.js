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

module.exports = role
