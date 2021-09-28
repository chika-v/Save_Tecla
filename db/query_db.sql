USE tecla_site
GO

CREATE TABLE usuario (
    idUsuario int NOT NULL IDENTITY (1,1),
    nombre varchar(50) NOT NULL,
	telefono varchar(50) NOT NULL,
	apellidos varchar(50) NOT NULL,
	fechaNac date NOT NULL,
	fechaAlta datetime NOT NULL,
	correo varchar(50) NOT NULL,
	token varchar(200) NOT NULL,
	activo BIT NOT NULL DEFAULT 1,
    PRIMARY KEY (idUsuario)
)
GO

CREATE TABLE producto (
    idProducto int NOT NULL IDENTITY (1,1),
    nombre varchar(50) NOT NULL,
	stock int NOT NULL,
	precio float NOT NULL,
	costo float NOT NULL,
	descripcion ntext NOT NULL,
	descuento int NOT NULL,
	fechaAlta datetime NOT NULL,
	activo BIT NOT NULL DEFAULT 1,
	categoria varchar(50) NOT NULL,
    PRIMARY KEY (idProducto)
)
GO

CREATE TABLE pedido (
    idPedido int NOT NULL IDENTITY (1,1),
    fechaAlta datetime NOT NULL,
	fechaEntrega date NOT NULL,
	estatus varchar(50) NOT NULL,
	productos ntext NOT NULL,
	subtotal float NOT NULL,
	descuento int NOT NULL,
	idUsuario int NOT NULL,
	idDireccion int NOT NULL,
	activo BIT NOT NULL DEFAULT 1,
    PRIMARY KEY (idPedido)
)
GO

CREATE TABLE direccion (
    idDireccion  int NOT NULL IDENTITY (1,1),
	calle varchar(50) NOT NULL,
	colonia varchar(50) NOT NULL,
	numeroInt varchar(50) NULL,
	numeroExt varchar(50) NOT NULL,
	municipio varchar(50) NOT NULL,
	cp varchar(50) NOT NULL,
	estado varchar(50) NOT NULL,
	referencia varchar(50) NULL,
	pais varchar(50) NOT NULL,
	idUsuario int NOT NULL,
	activo BIT NOT NULL DEFAULT 1,
    PRIMARY KEY (idDireccion)
)
GO

