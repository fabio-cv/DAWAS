USE `servidor_local`;

CREATE TABLE `tabela_prestadores`(
	`id` VARCHAR(255) PRIMARY KEY NOT NULL,
    `nif` INT NOT NULL,
    `precoHora` DECIMAL(10, 2),
    `profissao` VARCHAR(100) NOT NULL,
    `minimoDesconto` DECIMAL(10, 2),
    `taxaUrgencia` DECIMAL(10, 3),
    `percentagemDesconto` DECIMAL(10, 3), 
    `disponivel` BOOLEAN NOT NULL,
    `enabled` BOOLEAN NOT NULL,
    `created_at` DATETIME NOT NULL,
    `update_at` DATETIME NOT NULL
);

ALTER TABLE `tabela_prestadores`
    DROP COLUMN `taxaUrgencia`,
    ADD COLUMN `taxa_urgencia` DECIMAL(10, 3) AFTER `profissao`,
    DROP COLUMN `minimoDesconto`,
    ADD COLUMN `minimo_desconto` DECIMAL(10, 3) AFTER `taxa_urgencia`,
    DROP COLUMN `percentagemDesconto`,
    ADD COLUMN `percentagem_desconto` DECIMAL(10, 3) AFTER `minimo_desconto`,
    DROP COLUMN `precoHora`
;

CREATE TABLE `tabela_utilizadores`(
	`id` VARCHAR(255) PRIMARY KEY NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `numero` VARCHAR(100) NOT NULL UNIQUE,
    `data_nascimento` DATE NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(13),
    `pais` VARCHAR(100) NOT NULL,
    `localidade` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `enabled` BOOLEAN NOT NULL,
    `created_at` DATETIME NOT NULL,
    `update_at` DATETIME NOT NULL
);



CREATE TABLE `tabela_servicos`(
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(50) NOT NULL,
    `desconto` VARCHAR(255),
    `categoria` VARCHAR(20) NOT NULL,
    `enabled` BOOLEAN NOT NULL,
    `created_at` DATETIME NOT NULL,
    `update_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tabela_orcamento` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`total` DOUBLE NOT NULL,
	`id_utilizadores` VARCHAR(255) NOT NULL,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`update_at` DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `tabela_prestacao_servicos` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`designacao` VARCHAR(100) NOT NULL,
	`subtotal` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER,
	`id_prestadores` VARCHAR(255) NOT NULL,
	`id_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE,
	`estado` ENUM('pendente', 'em progresso', 'completo', 'cancelado') NOT NULL,
	`id_orcamento` INTEGER,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`update_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tabela_proposta` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`id_prestacao_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER NOT NULL,
	`estado` ENUM('pendente', 'aceite', 'recusado') NOT NULL ,
	`enabled` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`update_at` DATETIME NOT NULL
);


ALTER TABLE `tabela_proposta`
	ADD CONSTRAINT fk_prestacao_servico_proposta
	FOREIGN KEY (id_prestacao_servico)
    REFERENCES tabela_prestacao_servicos(id)
;
    


ALTER TABLE `tabela_prestacao_servicos`
	ADD CONSTRAINT fk_prestadores_prestacao_proposta_servico
    FOREIGN KEY (id_prestadores)
    REFERENCES tabela_prestadores(id),
    ADD CONSTRAINT fk_servico_prestacao_servico
    FOREIGN KEY (id_servico)
    REFERENCES tabela_servicos(id)
    ;
	
    
