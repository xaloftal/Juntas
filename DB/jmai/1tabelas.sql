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
	id_medico int primary key,
	email_m varchar(60),
	nome_m varchar(60),
	cedula int,
	tel_med int,
	constraint fk_medico_login foreign key (email_m) references utilizador(email)
)


create table pedido(
	id_pedido serial primary key,
	estado_p estado,
	data_pedido date, --
	tele1 int,--
	tele2 int,--
	nome_u varchar(60),--
	cc_num varchar(12),--
	cc_val date,--
	dat_nasc	date,--
	freg_nat varchar(60),--
	nif_u		int ,--
	nus_u int,--
	rua varchar(60),--
	cod_postal	int,--
	multiuso bool,
	veiculo bool,
	submissao_n bool,
	submissao_s bool,
	data_avaliacao_ant bool,
	consulta bool,
	
	
	conc_nat varchar(60),
	conc_res varchar(60),
	freg_res varchar(60),
	
	id_utente int,--
	
	constraint ut_fk foreign key (id_utente) references utente(id_utente)
);



create table avaliacao(
	id_avaliacao serial primary key,
	data_avaliacao date,
	percentagem int,
	estado_a estado,
	observ_ava	varchar(500),
	
	id_pedido int,
	id_medico int,
	
	constraint ped_fk foreign key (id_pedido) references pedido(id_pedido),
	constraint med_fk foreign key (id_medico) references medico(id_medico)
);

