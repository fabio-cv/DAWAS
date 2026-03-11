SELECT * FROM tabela_utilizadores;

SELECT 
	tabela_orcamento.id,
    total,
    tabela_utilizadores.id,
    tabela_utilizadores.nome
FROM
	tabela_orcamento,
    tabela_utilizadores
    
WHERE
	tabela_orcamento.id_utilizadores = '63a3303c-b1cc-42c9-aa1d-88606de0fa20';
    
    
SELECT 
	*
FROM 
	tabela_utilizadores
WHERE 
	tabela_utilizadores.id = '63a3303c-b1cc-42c9-aa1d-88606de0fa20';
    
    
SELECT * FROM tabela_prestadores WHERE tabela_prestadores.nif = 123456789