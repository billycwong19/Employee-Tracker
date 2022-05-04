UPDATE employee 
SET first_name = '${body.first_name}', 
last_name = '${body.last_name}', 
role_id = ${body.role_id}, 
manager_id = ${body.manager_id} 
WHERE id = ${body.id};

SELECT 
employee.id, 
employee.first_name,
employee.last_name,
role.title, 
role.salary, 
department.department_name,
employee.manager_id
FROM employee
LEFT JOIN role ON role.id = employee.role_id 
INNER JOIN department ON department.id = role.department_id;