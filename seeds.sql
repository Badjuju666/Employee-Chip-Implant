INSERT INTO departmenttypes(id, department_name) VALUES (1, "Marketing");
INSERT INTO departmenttypes(id, department_name) VALUES (2, "Human Resources")
INSERT INTO departmenttypes(id, department_name) VALUES (3, "Information Technology")
INSERT INTO departmenttypes(id, department_name) VALUES (4, "Finance")

INSERT INTO roletypes(id, title, salary, department_id) VALUES (1, "Sales Manager", 90000, 1);
INSERT INTO roletypes(id, title, salary, department_name) VALUES (2, "Human Resources Director", 120000, 2);
INSERT INTO roletypes(id, title, salary, department_name) VALUES (3, "Communications Manager", 90000, 1);
INSERT INTO roletypes(id, title, salary, department_name) VALUES (4, "Social Media Director", 100000 , 1);
INSERT INTO roletypes(id, title, salary, department_name) VALUES (5, "Information Technology Director", 150000, 3);
INSERT INTO roletypes(id, title, salary, department_name) VALUES (6, "Fincance Director", 130000, 4);
INSERT INTO roletypes(id, title, salary, department_name) VALUES (7, "Engineer", 110000, 3);

INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(1, "Boss" , "Lady", 1, NULL);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(2, "Big", "Boss", 2 NULL);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(3, "Grey", "Fox", 3, 1;
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(4, "Pyscho", "Mantis", 4, 1);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(5, "Otacon", "Emmerich", 5, NULL);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(6, "Revolver", "Ocelot", 6, NULL);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(7, "Raiden", "Jack", 7, 5);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(8, "Liquid", "Snake", 6, NULL);
INSERT INTO employeetypes(id, first_name, last_name, role_id, manager_id) VALUES(9, "Solid", "Snake", 7, 5);
