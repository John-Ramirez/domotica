create table sensores (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, temperatura TEXT, fotoresistor TEXT, pir TEXT);
create table estados (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, servouno TEXT, servodos TEXT, motor TEXT, led TEXT, boton TEXT);
create table lcd (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, textouno TEXT, textodos TEXT);
/* insertar primeros registros de prueba*/
insert into sensores (temperatura, fotoresistor, pir) values ('24', '132', 'true');
insert into estados (servouno, servodos, motor, led, boton) values ('off', 'off', 'off', 'off', 'off');
insert into lcd (textouno, textodos) values ('Temperatura', '23');	