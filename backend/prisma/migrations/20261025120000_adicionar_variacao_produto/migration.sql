
CREATE TABLE `variacaoproduto` (
    `idvariacao` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(30) NOT NULL,
    `valor` VARCHAR(100) NOT NULL,
    `produto_idprodutos` INTEGER NOT NULL,

    INDEX `produto_idprodutos`(`produto_idprodutos`),
    PRIMARY KEY (`idvariacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `variacaoproduto`
ADD CONSTRAINT `fk_variacao_produto`
FOREIGN KEY (`produto_idprodutos`)
REFERENCES `produto`(`idprodutos`)
ON DELETE CASCADE
ON UPDATE CASCADE;