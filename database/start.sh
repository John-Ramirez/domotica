#!/bin/sh

# Ejecutar el contenedor MySQL, con una base de datos llamada 'domotica' y credenciales
# para un usuario de servicio al usuario que puede acceder a él.
echo "Iniciando DB..."
docker run --name db -d \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e MYSQL_DATABASE=domotica -e MYSQL_USER=domotica_service -e MYSQL_PASSWORD=123 \
  -p 3306:3306 \
  mysql:latest

# Espere a que se inicie el servicio de la base de datos.
echo "Esperando a que DB inicie..."
docker exec db mysqladmin --silent --wait=30 -udomotica_service -p123 ping || exit 1

# Ejecute el script de configuración.
echo "Configurando datos iniciales..."
docker exec -i db mysql -udomotica_service -p123 domotica < setup.sql