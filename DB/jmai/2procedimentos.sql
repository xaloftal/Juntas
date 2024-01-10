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

create or replace procedure submeter_pedido()
as $$
begin
end; $$ Language PLPGSQL

create or replace procedure reencaminhar_pedido()
as $$
begin
end; $$ Language PLPGSQL

create or replace procedure cancelar_pedido()
as $$
begin
end; $$ Language PLPGSQL

create or replace procedure eliminar_conta()
as $$
begin
end; $$ Language PLPGSQL

