create or replace view utentes
as
	select u.nome_u nome_utente, u.nif_u nif, u.nus_u nus, u.tele_u telemovel, u.dat_nasc data_nascimento, u.cc_num cc_numero, u.cc_val cc_validade, 
		n.nome_nac nacionalidade, n.sigla_nac sigla_nacionalidade, 
		g.grau grau_familiar,
		ui.coeficiente, ui.capacidade_restante, ui.desvalorizacao, i.capitulo, i.numero, i.alinea,
		m.rua, m.nmr_porta, m.codigo_postal, m.freguesia freguesia_morada, m.concelho concelho_morada, m.distrito distrito_morada, m.pais pais_morada,--morada
		f.freguesia freguesia_naturalidade, co.concelho concelho_naturalidade, di.distrito distrito_naturalidade, p.pais pais_naturalidade, --naturalidade
		u.id_utente, f.id_freguesia, co.id_concelho, di.id_distrito, p.id_pais, m.id_morada
		
	from utente u
		inner join freguesia f using (id_freguesia) 
		inner join concelho co using (id_concelho)	
		inner join distrito di using(id_distrito)
		inner join pais p using (id_pais)
		inner join moradas m using (id_morada)
		left join utente_nac un using (id_utente)
		left join nacionalidade n using (id_nacionalidade)
		left join relacao r using (id_utente)
		left join grau g using (id_grau)
		left join utente_incapacidade ui using (id_utente)
		left join incapacidade i using(id_incapacidade)
		
create or replace view moradas
as
	select m.rua rua, m.nmr_porta nmr_porta, cp.cod_post codigo_postal,
			fr.freguesia, c.concelho, d.distrito, p.pais,
			id_pais, id_distrito, id_concelho, id_freguesia, id_cod, id_morada
	from morada m
		inner join codigo_postal cp using (id_cod)
		inner join freguesia fr using (id_freguesia)
		inner join concelho c using (id_concelho)
		inner join distrito d using (id_distrito)
		inner join pais p using (id_pais)
		