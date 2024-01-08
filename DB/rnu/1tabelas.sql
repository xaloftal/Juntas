--
--	tabelas
--

create table utente(
	id_utente	serial			not null		primary key,
	nome_u		varchar(60)		not null,
	nif_u		int				unique,
	nus_u		int				unique,
	email_u		varchar(60)		unique,
	tele_u		int				unique,
	dat_nasc	date,
	id_nacionalidade int,
	cc_num varchar(12),
	cc_val date,
	
	id_morada int,
	id_freguesia int, -- naturalidade
	constraint mor_fk foreign key (id_morada) references morada(id_morada),
	constraint fre_fk foreign key (id_freguesia) references freguesia(id_freguesia)
);


create table nacionalidade(
	id_nacionalidade	serial	not null	primary key,
	nome_nac	varchar(60),
	sigla_nac	varchar(4)
);

create table utente_nac(
	id_nacionalidade int,
	id_utente int,
	
	primary key (id_nacionalidade,id_utente),
	constraint nac_fk foreign key (id_nacionalidade) references nacionalidade(id_nacionalidade),
	constraint ut_fk foreign key (id_utente) references utente(id_utente)
);

create table relacao(
	id_utente int,
	id_fam int,
	id_grau int,
	primary key (id_utente, id_fam),
	constraint ut_fk foreign key (id_utente) references utente(id_utente),
	constraint fam_fk foreign key (id_fam) references utente(id_utente),
	constraint gr_rel_fk foreign key (id_grau) references grau(id_grau)
);

create table grau(
	id_grau serial primary key,
	grau varchar(60)
);

create table morada(
	id_morada serial primary key,
	rua varchar(100),
	nmr_porta int,
	cod_post int
);

create table codigo_postal(
	cod_post varchar(8) primary key,
	id_freguesia int,
	distrito varchar(60),
	
	constraint zipfre_fk foreign key (id_freguesia) references freguesia(id_freguesia)
	
);

create table pais(
	id_pais serial primary key,
	pais varchar(60)
);

create table distrito(
	id_distrito serial primary key,
	distrito varchar(60),
	
	id_pais int,
	
	constraint dis_pai_fk foreign key (id_pais) references pais(id_pais)
);

create table concelho(
	id_concelho serial primary key,
	concelho varchar(60),
	
	id_distrito int,
	constraint con_dis_fk foreign key (id_distrito) references distrito(id_distrito)
);

create table freguesia(
	id_freguesia serial primary key,
	freguesia varchar(60),
	
	id_concelho int,
	constraint fre_con_fk foreign key (id_concelho) references concelho(id_concelho)
);

create table incapacidade(
	id_incapacidade serial primary key,
	capitulo varchar(60),
	numero varchar(60),
	alinea varchar(60)	
);

create table utente_incapacidade(
	id_pedido int,
	id_utente int,
	id_incapacidade int,
	
	coeficiente varchar(60),
	capacidade_restante varchar(60),
	desvalorizacao varchar(60),
	
	primary key (id_pedido, id_utente, id_incapacidade),
	constraint ute_inc_fk foreign key (id_utente) references utente(id_utente),
	constraint inc_inc_fk foreign key (id_incapacidade) references incapacidade(id_incapacidade)
);