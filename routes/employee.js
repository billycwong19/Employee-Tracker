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

// employee.post('/add-review', ({ body }, res) => {
//   const sql = `INSERT INTO reviews (movie_id,review)
//     VALUES (?,?)`;
//   const params = [body.movie_id, body.review];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// employee.put('/update-review', ({body}, res) => {
//   const sql = `UPDATE reviews SET review = '${body.review}' WHERE id = ${body.id};`
//   db.query(sql, (err, result) => {
//       if (err) {
//           res.status(400).json({ error: err.message});
//           return;
//       }
//       res.json({
//           message: 'success',
//           data: body
//       })
//       console.log(result);
//   })
// })

module.exports = employee;