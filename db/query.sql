UPDATE employee 
SET first_name = '${body.first_name}', 
last_name = '${body.last_name}', 
role_id = ${body.role_id}, 
manager_id = ${body.manager_id} 
WHERE id = ${body.id};