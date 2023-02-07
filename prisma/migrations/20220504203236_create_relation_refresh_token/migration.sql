-- CreateTable
CREATE TABLE `sp_refresh_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expiresIn` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `sp_refresh_token_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sp_refresh_token` ADD CONSTRAINT `sp_refresh_token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sp_usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
