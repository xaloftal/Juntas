create or replace procedure registo_utente (_ute int, _email varchar(60), _pass varchar(60), _nus int)
as $$
begin
	insert into utilizador(email, pass, estado_u) values (_email, _pass, 'ativo');
	insert into utente(id_utente, email_u) values (_ute, _email);
	
end; $$ Language PLPGSQL

create or replace procedure registo_medico(_ced int, _nom varchar(60), _email varchar(60), _tel int, _pass varchar(60))
as $$
begin
	insert into utilizador(email, pass, estado_u) values (_email, _pass, 'ativo');
	insert into medico(email_m, nome_m, cedula, tel_med) values (_email,_nom, _ced, _tel );
end; $$ Language PLPGSQL


create or replace procedure eliminar_conta(_cont varchar(60))
as $$
begin
	update utilizador
	set estado_u = 'inativo'
	where email = _cont;
end; $$ Language PLPGSQL


create or replace procedure submeter_pedido(_dat date, _nom varchar(60), _nus int, _nif int, _tel1 int, _tel2 int, _cnum varchar(12), _cval date, _datnasc date, _freg int, _cod int, _rua varchar(60), _ut int, out id_pedido int)
as $$
declare _ped int;
begin
	select count(*) into _ped
	from pedido
	where id_utente = _ut and (estado_p='submetido' or estado_p='em analise');
	
	if(_ped > 0)
	then
		raise notice 'nao pode submeter mais um pedido';
		return;
	end if;

	insert into pedido (data_pedido, tele1, tele2, nome_u, cc_num, cc_val, dat_nasc, freg_nat, nif_u,nus_u,rua,cod_postal,id_utente,estado_p )
	values (_dat, _tel1, _tel2,_nom,_cnum, _cval,_datnasc,_freg,_nif,_nus,_rua,_cod,_ut,'submetido')
	returning id_pedido into id_pedido;

end; $$ Language PLPGSQL

drop procedure submeter_pedido

create or replace procedure reencaminhar_pedido(_ped int, _med int)
as $$
begin
	insert into avaliacao(id_pedido,id_medico, estado_a) values (_ped,_med, 'em analise');
	
	update pedido
	set estado_p ='em analise'
	where id_pedido = _ped;
	
end; $$ Language PLPGSQL

create or replace procedure cancelar_pedido(_ped int)
as $$
declare ava int;
begin
	update pedido set estado_p ='cancelado' where id_pedido = _ped;
	
	select id_avaliacao into ava
	from avaliacao
	where id_pedido = _ped;
	
	if (ava is not null)
	then
		update avaliacao set estado_a ='cancelado' where id_avaliacao = ava;
	end if;
end; $$ Language PLPGSQL

create or replace procedure responder_pedido(_ped int, _dat date, _perc int, _obs varchar(500))
as $$
declare ava int;
begin
	select id_avaliacao into ava
	from avaliacao
	where id_pedido = _ped and estado_a = 'em analise';
	
	if(_perc < 60)
	then
		update avaliacao set data_avaliacao =_dat, percentagem = _perc , observ_ava = _obs, estado_a = 'nao atribuido';
	elsif (_perc >= 60)
	then
		update avaliacao set data_avaliacao =_dat, percentagem = _perc , observ_ava = _obs, estado_a = 'atribuido';
	end if;
	
	update pedido set estado_p = 'concluido' where id_pedido = _ped;
end; $$ Language PLPGSQL