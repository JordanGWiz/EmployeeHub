--  Warehouse-related departments
INSERT INTO department (name) VALUES 
('Receiving'),
('Inventory Control'),
('Shipping'),
('Maintenance'),
('Management');

-- Warehouse-specific roles with title, salary, and department_id references
INSERT INTO role (title, salary, department_id) VALUES 
('Warehouse Associate', 32000, 1), 
('Inventory Specialist', 35000, 2), 
('Shipping Coordinator', 37000, 3), 
('Maintenance Technician', 36000, 4), 
('Warehouse Supervisor', 52000, 5),
('Operations Manager', 60000, 5), 
('Warehouse Director', 75000, 5);

-- Employees with first_name, last_name, role_id, and manager_id references
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('David', 'Carter', 7, NULL),  -- Warehouse Director, top-level manager
('Lisa', 'Burns', 6, 1),
('Frank', 'Wells', 5, 1),
('Eva', 'Garcia', 5, 1),
('Tom', 'Hudson', 2, 3),
('Jerry', 'Clark', 3, 3),
('Megan', 'Young', 1, 4),
('John', 'Stone', 4, 3),
('Diane', 'Taylor', 4, 3);
