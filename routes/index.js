const express = require('express');
// Import our modular routers for /tips and /feedback
const departmentRouter = require('./department');
const roleRouter = require('./role')
const employeeRouter = require('./employee')

const app = express();

app.use('/department', departmentRouter);
app.use('/role', roleRouter);
app.use('/employee', employeeRouter);

module.exports = app;

