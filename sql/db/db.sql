CREATE DATABASE products
GO

USE products
GO

CREATE TABLE user (
    id_user int NOT NULL IDENTITY (1,1),
    nombres char (100) NOT NULL,
    apellidos char (100) NOT NULL,
    PRIMARY KEY (id_user),
)
GO

CREATE TABLE products (
    id int NOT NULL IDENTITY (1,1),
    nombre char (100) NOT NULL,
    descripcion char (200) NULL,
    anio_de_creacion date NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id_user)
)
GO
