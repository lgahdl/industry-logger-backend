DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
                       `id`         int NOT NULL AUTO_INCREMENT,
                       `macAddress` varchar(50) NOT NULL,
                       `value` varchar(10000) DEFAULT NULL,
                       `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
                       PRIMARY KEY (`id`),
                       CONSTRAINT `fk_log_device` FOREIGN KEY (`macAddress`) REFERENCES `device` (`macAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;