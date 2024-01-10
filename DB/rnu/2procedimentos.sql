create or replace procedure return_utente(_nus int, out _id int)
as $$
begin
	select id_utente into _id
	from utente
	where nus_u = _nus;
	
	if (_id is null)
	then
		raise notice 'invalido';
		return;
	end if;
end; $$ Language PLPGSQL