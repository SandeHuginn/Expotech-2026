
-- ============================================
-- EXPOTECH 2026 - VERSAO 0.5.0
-- CRIACAO DO BANCO DE DADOS SMARTHOME
-- ============================================

CREATE DATABASE smarthome;

USE smarthome;


-- ============================================
-- 1. TABELA DE APARELHOS
-- ============================================

CREATE TABLE aparelhos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    comodo VARCHAR(50) NOT NULL,
    consumo_kwh DECIMAL(10,2) NOT NULL
);


-- CADASTRO DOS APARELHOS

INSERT INTO aparelhos (nome, comodo, consumo_kwh)
VALUES
    ('Ar-condicionado', 'Quarto 1', 48.50),
    ('Chuveiro elétrico', 'Banheiro', 32.00),
    ('Geladeira', 'Cozinha', 21.00),
    ('Televisão', 'Sala', 15.00),
    ('Máquina de lavar', 'Área de serviços', 12.00);


-- ============================================
-- 2. TABELA DE HISTORICO DE CONSUMO
-- ============================================

CREATE TABLE leituras_consumo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aparelho_id INT NOT NULL,
    data_leitura DATE NOT NULL,
    consumo_kwh DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_leituras_aparelho
        FOREIGN KEY (aparelho_id)
        REFERENCES aparelhos(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_consumo_nao_negativo
        CHECK (consumo_kwh >= 0),

    UNIQUE KEY uq_aparelho_data
        (aparelho_id, data_leitura),

    INDEX idx_data_leitura (data_leitura)
);


-- ============================================
-- 3. TABELA DE CONFIGURACAO DE ENERGIA
-- ============================================

CREATE TABLE configuracoes_energia (
    id INT PRIMARY KEY,
    tarifa_kwh DECIMAL(10,4) NOT NULL,
    CHECK (tarifa_kwh >= 0)
);


-- CONFIGURACAO DA TARIFA

INSERT INTO configuracoes_energia
    (id, tarifa_kwh)
VALUES
    (1, 0.9200);


-- ============================================
-- 4. HISTORICO DE CONSUMO
-- ============================================

INSERT INTO leituras_consumo
    (aparelho_id, data_leitura, consumo_kwh)
VALUES
    -- AR-CONDICIONADO - NOVEMBRO

    (1, '2026-11-01', 2.10),
    (1, '2026-11-02', 2.20),
    (1, '2026-11-03', 2.00),
    (1, '2026-11-04', 8.50),
    (1, '2026-11-05', 2.30),
    (1, '2026-11-06', 2.10),
    (1, '2026-11-07', 2.40),

    -- AR-CONDICIONADO - OUTUBRO

    (1, '2026-10-01', 1.90),
    (1, '2026-10-02', 2.00),
    (1, '2026-10-03', 2.10),
    (1, '2026-10-04', 1.80),
    (1, '2026-10-05', 2.00),

    -- CHUVEIRO ELETRICO - NOVEMBRO

    (2, '2026-11-01', 3.20),
    (2, '2026-11-02', 3.10),
    (2, '2026-11-03', 3.30),
    (2, '2026-11-04', 3.00),
    (2, '2026-11-05', 3.40),

    -- CHUVEIRO ELETRICO - OUTUBRO

    (2, '2026-10-01', 2.90),
    (2, '2026-10-02', 3.00),
    (2, '2026-10-03', 3.10);


-- ============================================
-- 5. CONSULTAS PARA VERIFICACAO
-- ============================================

SHOW TABLES;

SELECT * FROM aparelhos;

SELECT * FROM leituras_consumo;

SELECT * FROM configuracoes_energia;


-- TOTAL DE LEITURAS

SELECT
    COUNT(*) AS total_leituras,
    MIN(data_leitura) AS primeira_leitura,
    MAX(data_leitura) AS ultima_leitura
FROM leituras_consumo;


-- CONSUMO TOTAL DOS APARELHOS

SELECT
    SUM(consumo_kwh) AS consumo_total_kwh
FROM aparelhos;


-- CONSUMO HISTORICO POR MES

SELECT
    DATE_FORMAT(data_leitura, '%Y-%m') AS mes,
    SUM(consumo_kwh) AS consumo_total_kwh
FROM leituras_consumo
GROUP BY DATE_FORMAT(data_leitura, '%Y-%m')
ORDER BY mes;


-- RANKING DOS APARELHOS

SELECT
    id,
    nome,
    comodo,
    consumo_kwh
FROM aparelhos
ORDER BY consumo_kwh DESC
LIMIT 3;


-- CONSUMO POR COMODO

SELECT
    comodo,
    COUNT(*) AS quantidade_aparelhos,
    SUM(consumo_kwh) AS consumo_total_kwh
FROM aparelhos
GROUP BY comodo
ORDER BY consumo_total_kwh DESC;


