create table T_Registro
(
    id_libro int auto_increment primary key ,
    N_libro varchar(200),
    genero_literario varchar(200),
    fecha_lanzamineto date,
	N_autor varchar(200)
);


create table T_Alumno
(
    N_cuenta varchar(200) primary key,
    nombre varchar(200),
    apellido varchar(200)
);

create table T_Prestamos
(
	id_prestamo int primary key,
	id_libro  int,
	numero_cuenta varchar(200),
	F_prestamo date,
	constraint foreign key fk_id_libro (id_libro) references  T_registro_libros(id_libro),
	constraint foreign key fk_N_cuenta (N_cuenta) references T_alumno (N_cuenta)
);


insert into T_registro_libros ( N_libro, genero_literario,fecha_lanzamineto, N_autor )

values
    ('Harry Potter y la camara secreta', 'Fantasaia', '1998-07-06','JK Rowlin'),
    ('Harry Potter y el principe mestizo', 'Fantasia', '2005-07-16', 'JK Rowlin');

insert into T_alumno(N_cuenta, nombre, apellido)

values
    ('T21091122', 'Cristiano', 'Ronaldo'),
    ('T32211122', 'David', 'Leiva');
    
insert into T_prestamos( id_libro, N_cuenta, F_prestamo)
values
(1,'T21091122','2022-12-08');

Select * from T_prestamos;
Select * from T_registro_libros