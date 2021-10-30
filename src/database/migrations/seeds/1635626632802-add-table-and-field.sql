DROP TABLE IF EXISTS `table`;
CREATE TABLE `table` (
                                           `id` INT NOT NULL AUTO_INCREMENT,
                                           `name` VARCHAR(100) NULL DEFAULT NULL,
                                           `description` VARCHAR(255) NULL DEFAULT NULL,
                                           `idDevice` INT NULL,
                                           `createdAt` DATETIME NULL DEFAULT NOW(),
                                           `updatedAt` DATETIME NULL DEFAULT NOW(),
                                           PRIMARY KEY (`id`),
                                           INDEX `fk_table_device_idx` (`idDevice` ASC) VISIBLE,
                                           CONSTRAINT `fk_table_device`
                                               FOREIGN KEY (`idDevice`)
                                                   REFERENCES `device` (`id`)
                                                   ON DELETE CASCADE
                                                   ON UPDATE CASCADE);

DROP TABLE IF EXISTS `table_field`;
CREATE TABLE `industry_logger`.`table_field` (
                                                 `id` INT NOT NULL AUTO_INCREMENT,
                                                 `idTable` INT NOT NULL,
                                                 `name` VARCHAR(100) NULL,
                                                 `description` VARCHAR(255) NULL,
                                                 `append` VARCHAR(50) NULL,
                                                 `prepend` VARCHAR(50) NULL,
                                                 `logDigit` INT(11) NULL,
                                                 `type` ENUM('INTEGER', 'FLOAT', 'BOOLEAN') NULL,
                                                 `decimalDigits` TINYINT(4) NULL,
                                                 `createdAt` DATETIME NULL DEFAULT NOW(),
                                                 `updatedAt` DATETIME NULL DEFAULT NOW(),
                                                 PRIMARY KEY (`id`),
                                                 INDEX `fk_field_table_idx` (`idTable` ASC) VISIBLE,
                                                 CONSTRAINT `fk_field_table`
                                                     FOREIGN KEY (`idTable`)
                                                         REFERENCES `table` (`id`)
                                                         ON DELETE CASCADE
                                                         ON UPDATE CASCADE);
