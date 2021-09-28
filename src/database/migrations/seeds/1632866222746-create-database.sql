DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `name`       varchar(100) DEFAULT NULL,
    `macAddress` varchar(50)  DEFAULT NULL,
    `createdAt`  datetime     DEFAULT CURRENT_TIMESTAMP,
    `updatedAt`  datetime     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `macAddress_UNIQUE` (`macAddress` ASC) VISIBLE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK
TABLES `device` WRITE;
UNLOCK
TABLES;

DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`
(
    `id`        int NOT NULL AUTO_INCREMENT,
    `deviceId`  int            DEFAULT NULL,
    `value`     varchar(10000) DEFAULT NULL,
    `createdAt` datetime       DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY         `fk_log_device_idx` (`deviceId`),
    CONSTRAINT `fk_log_device` FOREIGN KEY (`deviceId`) REFERENCES `device` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK
TABLES `log` WRITE;
UNLOCK
TABLES;
