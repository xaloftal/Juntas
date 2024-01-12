create type sexo as enum('F', 'M');

create table medico(
	id_medico serial primary key,
	cedula int,
	nome_m varchar(60),
	sexo_m sexo,
	data_nasc date,
	email_m varchar(60),
	tel_m int
);

create table especialidade(
	id_especialidade serial primary key,
	nome_e varchar(60)
);

create table medico_especialidade(
	id_especialidade int,
	id_medico int,
	primary key(id_especialidade,id_medico ),
	constraint med_fk foreign key (id_medico) references medico(id_medico),
	constraint esp_fk foreign key (id_especialidade) references especialidade(id_especialidade)
);


create or replace procedure return_medico(_ced int, out _id int)
as $$
begin
	select id_medico into _id
	from medico
	where cedula = _ced;
	
	if (_id is null)
	then
		raise notice 'invalido';
		return;
	end if;
end; $$ Language PLPGSQL