-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_cartId_fkey`;

-- DropIndex
DROP INDEX `cart_detail_cartId_key` ON `cart_detail`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
