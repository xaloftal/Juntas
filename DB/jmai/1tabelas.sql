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
	id_adm serial primary key,
	nome_a varchar(60),
	email_a varchar(60),
	
	constraint fk_adm_login foreign key (email_a) references utilizador(email)
);


create table utente(
	id_utente int primary key,
	email_u varchar(60),
	
	constraint fk_utente_login foreign key (email_u) references utilizador(email)
);

create table medico(
	id_medico serial primary key,
	email_m varchar(60),
	nome_m varchar(60),
	cedula int,
	constraint fk_medico_login foreign key (email_m) references utilizador(email)
)

create table pedido(
	id_pedido serial primary key,
	estado_p estado,
	data_pedido date,
	tele1 int,
	tele2 int,
	
	id_utente int,
	
	constraint ut_fk foreign key (id_utente) references utente(id_utente)
);

create table avaliacao(
	id_avaliacao serial primary key,
	data_avaliacao date,
	percentagem int,
	estado_a estado,
	
	id_pedido int,
	id_medico int,
	
	constraint ped_fk foreign key (id_pedido) references pedido(id_pedido),
	constraint med_fk foreign key (id_medico) references medico(id_medico)
);
