INSERT INTO tabela_utilizadores (
	id,
	nome, 
	numero, 
	data_nascimento, 
	email, 
    telefone, 
	pais, 
    localidade, 
	`password`, 
	enabled, 
	created_at, 
	update_at
) VALUES (
	'63a3303c-b1cc-42c9-aa1d-88606de0fa20',
	'Fábio Barros',
    'M001k',
    '1997-10-21',
    'testeemaol@gmail.com',
    '9585264',
    'Cabo Verde',
    'Assomada',
    '$2a$12$IvY2fEm1Y1rm8PvtOEEZ3.jsLxwAVzIkNjAk.q7IIWbP3C6JPKRNO',
    true,
    NOW(),
    NOW()
);

INSERT INTO tabela_orcamento VALUES (
	NULL,
	200,
    '63a3303c-b1cc-42c9-aa1d-88606de0fa20',
    true,
    NOW(),
    NOW()
);

INSERT INTO tabela_servicos VALUES (
	NULL,
	'servicoteste1',
    20,
    'teste1',
    true,
    NOW(),
    NOW()
);


INSERT INTO tabela_utilizadores VALUES(
	'8395dcdf-9079-45af-86e1-41679d9378c2',
    'Fabio',
    'A27D',
    '1987-03-10',
    'fabio@gmail.com',
    '1111111',
    'Cabo Verde',
    'Tarrafal',
    '$2a$12$O8KR31NygTRTMVqzd19TS.akyLYvSXpVVk6PHgynsoAq8EtkaQxJq',
    true,
    NOW(),
    NOW()
);

INSERT INTO tabela_orcamento VALUES (
	NULL,
	450,
    '8395dcdf-9079-45af-86e1-41679d9378c2',
    true,
    NOW(),
    NOW()
);

INSERT INTO tabela_prestadores(
	id,
    nif,
    profissao,
    minimo_desconto,
    taxa_urgencia,
    percentagem_desconto,
    disponivel,
    enabled,
    created_at,
    update_at
) VALUES (
	'8970943f-10c4-40da-993d-9974b330a773',
    123456789,
    'Técnico Informático',
    10,
    5.0,
    4.1,
    true,
    true,
    NOW(),
    NOW()
)