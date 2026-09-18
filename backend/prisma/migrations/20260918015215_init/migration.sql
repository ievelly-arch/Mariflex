-- CreateTable
CREATE TABLE `Cliente` (
    `CPF_cliente` VARCHAR(15) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(55) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`CPF_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `idpedido` INTEGER NOT NULL AUTO_INCREMENT,
    `pagamento` VARCHAR(5) NOT NULL,
    `valor_total` DECIMAL(10, 2) NOT NULL,
    `data` DATE NOT NULL,
    `cliente_CPF_cliente` VARCHAR(15) NOT NULL,
    `remetente` VARCHAR(100) NOT NULL,
    `destinatario` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idpedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemPedido` (
    `iditempedido` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `pedido_idpedido` INTEGER NOT NULL,
    `produto_idprodutos` INTEGER NOT NULL,

    PRIMARY KEY (`iditempedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `idprodutos` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,
    `categoria` VARCHAR(50) NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `empresa_idempresa` INTEGER NOT NULL,

    PRIMARY KEY (`idprodutos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `idempresa` INTEGER NOT NULL AUTO_INCREMENT,
    `CNPJ` VARCHAR(18) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`idempresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `CPF_funcionario` VARCHAR(15) NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `telefone_funcionario` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `salario` DECIMAL(10, 2) NOT NULL,
    `empresa_idempresa` INTEGER NOT NULL,

    PRIMARY KEY (`CPF_funcionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_cliente_CPF_cliente_fkey` FOREIGN KEY (`cliente_CPF_cliente`) REFERENCES `Cliente`(`CPF_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_pedido_idpedido_fkey` FOREIGN KEY (`pedido_idpedido`) REFERENCES `Pedido`(`idpedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_produto_idprodutos_fkey` FOREIGN KEY (`produto_idprodutos`) REFERENCES `Produto`(`idprodutos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_empresa_idempresa_fkey` FOREIGN KEY (`empresa_idempresa`) REFERENCES `Empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `Funcionario_empresa_idempresa_fkey` FOREIGN KEY (`empresa_idempresa`) REFERENCES `Empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;
