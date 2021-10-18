Los pasos para correr éste proyecto son los siguientes.

1.- Correr el comando npm install
2.- Llenar el archivo .env con las variables necesarias
HOST='localhost'
PORT=3000

DB_HOST='localhost'
DB_PORT=1433

DB_USR='sa'
DB_PASS='123456'

SECRET_KEY='usuario123'

3.- Colocar el nombre de tu base de datos en el archivo db.conexion.js

4.- Entrar a localhost:3000/login para la primer pantalla

5.- Si no hay usuarios creados en tu db, bajar colección de postman y crearlos así

Colección de postman: https://www.getpostman.com/collections/77e43e7b9dff93c29ae3

Nuestro proyecto se encuentra hecho con modelo vista controlador, para observar todos los endpoints que tenemos vaya a la carpeta ./app/vista/(vista deseada)
