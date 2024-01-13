-- CHT

create table consulta(
	id_consulta serial primary key,
	id_pedido int,
	id_utente int,
	
	data_consulta timestamp,
	
	id_local int,
	
	constraint loc_fk foreign key (id_local) references local(id_local)

);

create table local(
	id_local serial primary key,
	nome_local varchar(100)
);

create table medico(
	id_medico int primary key
);

create table equipa_medica(
	id_consulta int,
	id_medico int,
	
	primary key(id_consulta, id_medico),
	constraint con_fk foreign key (id_consulta) references consulta(id_consulta),
	constraint med_fk foreign key (id_medico) references medico(id_medico)
);