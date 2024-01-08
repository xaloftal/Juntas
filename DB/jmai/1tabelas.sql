--
--
--	TABELAS
--
--

-- login
create table utilizador(
	email varchar(60) unique,
	pass varchar(60),
	
	estado_u estado,
	
	primary key(email, pass)
);

-- utilizador
create table administrativo(
	
)