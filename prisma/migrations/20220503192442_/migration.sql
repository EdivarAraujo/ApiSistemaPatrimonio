-- CreateTable
CREATE TABLE `sp_usuarios` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `sp_usuarios_userName_key`(`userName`),
    UNIQUE INDEX `sp_usuarios_email_key`(`email`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sp_colaboradores` (
    `idColaborador` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` INTEGER NULL,
    `numeroPatrimonio` INTEGER NULL,
    `nome` VARCHAR(255) NULL,
    `unidadeId` INTEGER NOT NULL,
    `setorId` INTEGER NOT NULL,
    `funcaoId` INTEGER NOT NULL,
    `numeroChip1` VARCHAR(20) NULL,
    `operadoraChip1` VARCHAR(20) NULL,
    `numeroChip2` VARCHAR(20) NULL,
    `operadoraChip2` VARCHAR(20) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `sp_colaboradores_numeroPatrimonio_key`(`numeroPatrimonio`),
    PRIMARY KEY (`idColaborador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sp_unidades` (
    `idUnidade` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeUnidade` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    PRIMARY KEY (`idUnidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sp_setores` (
    `idSetor` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeSetor` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    PRIMARY KEY (`idSetor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sp_funcoes` (
    `idFuncao` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFuncao` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NULL,

    PRIMARY KEY (`idFuncao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sp_colaboradores` ADD CONSTRAINT `sp_colaboradores_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `sp_unidades`(`idUnidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sp_colaboradores` ADD CONSTRAINT `sp_colaboradores_setorId_fkey` FOREIGN KEY (`setorId`) REFERENCES `sp_setores`(`idSetor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sp_colaboradores` ADD CONSTRAINT `sp_colaboradores_funcaoId_fkey` FOREIGN KEY (`funcaoId`) REFERENCES `sp_funcoes`(`idFuncao`) ON DELETE RESTRICT ON UPDATE CASCADE;
