INSERT INTO department (department_name)
VALUES 
    ('toys'),
    ('video-games'),
    ('candy'),
    ('coal');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('manager', '100', 1),
    ('manager', '120', 2),
    ('manager', '80', 3),
    ('manager', '200', 4),
    ('worker', '50', 1),
    ('worker', '70', 2),
    ('worker', '50', 3),
    ('worker', '100', 4),
    ('apprentice', '25', 1),
    ('apprentice', '30', 2),
    ('apprentice', '20', 3),
    ('apprentice', '50', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('chuck', 'chuckster', 1, null),
    ('sara', 'sari', 2, null),
    ('mark', 'markington', 3, null),
    ('liz', 'lizzy', 4, null),
    ('carl', 'chuckster', 5, 1),
    ('miranda', 'mirra', 6, 2),
    ('dick', 'dickey', 7, 3),
    ('casey', 'corndog', 8, 4),
    ('laura', 'laurens', 9, 1),
    ('eric', 'easy', 10, 2),
    ('tim', 'tiny', 11, 3),
    ('alex', 'allie', 12, 4);