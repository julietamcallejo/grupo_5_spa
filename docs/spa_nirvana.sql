# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: spa_nirvana
# Generation Time: 2020-02-20 00:55:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table categories
# ------------------------------------------------------------

CREATE DATABASE  IF NOT EXISTS `spa_nirvana` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci */;
USE `spa_nirvana`;

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
	(1,'Masajes',NULL,NULL),
	(2,'Faciales',NULL,NULL),
	(3,'Corporales',NULL,NULL),
	(4,'Pies',NULL,NULL),
	(5,'Manos',NULL,NULL),
	(6,'Paquetes Spa',NULL,NULL),
	(7,'Relax',NULL,NULL);

/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table professionals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `professionals`;

CREATE TABLE `professionals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'default-user.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `professionals` WRITE;
/*!40000 ALTER TABLE `professionals` DISABLE KEYS */;

INSERT INTO `professionals` (`id`, `firstName`, `lastName`, `photo`, `createdAt`, `updatedAt`)
VALUES
	(1,'Juan','Perez','juan.jpg',NULL,NULL),
	(2,'Juana','Garcia','juana.jpg',NULL,NULL),
	(3,'Laura','Sanchez','laura.jpg',NULL,NULL);

/*!40000 ALTER TABLE `professionals` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table services
# ------------------------------------------------------------

DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
  `summary` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `duration` int(10) unsigned DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'no-image.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `categoryId` int(10) unsigned DEFAULT NULL,
  `professionalId` int(10) unsigned DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `services_ibfk_1` (`categoryId`),
  KEY `services_ibfk_2` (`professionalId`),
  KEY `services_ibfk_3` (`userId`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`professionalId`) REFERENCES `professionals` (`id`),
  CONSTRAINT `services_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;

INSERT INTO `services` (`id`, `name`, `description`, `summary`, `price`, `duration`, `photo`, `createdAt`, `updatedAt`, `categoryId`, `professionalId`, `userId`)
VALUES
	(31,'AntiAge','Combo de nuestros servicios: Masaje de Piedras Calientes, Tratamiento facial Anti Age, Tratamiento corporal de Drenaje Linfático.','Masaje de Piedras Calientes, Tratamiento facial Anti Age, Tratamiento corporal de Drenaje Linfático.',3000.00,120,'/images/tatamientos/03-anti-age.jpeg',NULL,NULL,1,1,NULL),
	(32,'Aromaterapia','En nuestro spa, un masajista licenciado personalizará su masaje de aromaterapia con aceites vegetales altamente concentrados, llamados aceites esenciales, agregados al aceite o loción de masaje. Este masaje es particularmente adecuado para quienes sufran de estrés o quieran mejorar las condiciones anímicas. Cada aceite esencial tiene diferentes propiedades curativas.','Aromaterapia con aceites vegetales altamente concentrados, llamados aceites esenciales, agregados al aceite o loción de masaje.',2000.00,60,'/images/tatamientos/04-aromaterapia.jpeg',NULL,'2020-02-16 21:08:28',7,2,NULL),
	(33,'Piedras Calientes','En nuestro spa, un masajista licenciado personalizará su masaje con piedras calientes. Las piedras calientes se colocan en puntos específicos y otras piedras serán utilizadas por el masajista para trabajar el músculo.','Las piedras calientes se colocan en puntos específicos para trabajar el músculo.',2000.00,60,'/images/tatamientos/05-piedras-calientes.jpeg',NULL,NULL,3,3,NULL),
	(34,'Cuello, hombros y espalda','En nuestro spa, un masajista licenciado adaptará el masaje enfocándose en el cuello, los hombros y la espalda para aliviar la tensión, la incomodidad o la fuente del dolor y ayudarlo lograr una mejor relajación.','Masaje enfocándose en el cuello, los hombros y el cuero cabelludo para aliviar la tensión.',1600.00,30,'/images/tatamientos/06-cuello-hombros-y-espalda.jpeg',NULL,NULL,1,1,NULL),
	(35,'Cuello, hombros y cabeza','En nuestro spa, un masajista licenciado adaptará el masaje enfocándose en el cuello, los hombros y el cuero cabelludo para aliviar la tensión, la incomodidad o la fuente del dolor y ayudarlo lograr una mejor relajación.','Masaje enfocándose en el cuello, los hombros y el cuero cabelludo para aliviar la tensión.',1600.00,30,'/images/tatamientos/07-cuello-hombros-y-cabeza.jpeg',NULL,NULL,1,2,NULL),
	(36,'Reflexología','En nuestro spa, un masajista licenciado personalizará su reflexología aplicando presión a áreas específicas del pie o la mano para trabajar en el músculo. Masajear estos puntos de presión ayuda a reducir el estrés y las migrañas.','Masajear estos puntos de presión ayuda a reducir el estrés y las migrañas.',1800.00,60,'/images/tatamientos/08-reflexologia.jpeg',NULL,NULL,1,3,NULL),
	(37,'Anti Acne','Usando un sistema de oxigenoterapia diseñado para tratar problemas de piel grasa o acné, este tratamiento facial incluye limpieza profunda, extractos herbales de curación personalizados y una exfoliación glicólica o alfa-hidroxi para combatir las imperfecciones de la piel. La mayor mejora proviene de estimular las propiedades de autocuración del cuerpo para que se pueda lograr una piel clara y duradera. Se incluirá un régimen de cuidado de la piel personalizado para el cuidado en el hogar.','Sistema de oxigenoterapia diseñado para tratar problemas de piel grasa o acné.',1000.00,40,'/images/tatamientos/09-anti-acne.jpeg',NULL,NULL,7,1,NULL),
	(38,'Piel Sensible','Un tratamiento facial personalizado con vitamina C que repara y previene signos visibles de vejez y daños en la piel. Beneficiando a todos los tipos de piel, se utilizan cantidades concentradas de vitamina C junto con un tónico, una máscara y un humectante especiales para mejorar la vitalidad de la piel, crear células nuevas y aumentar la humectación y la oxigenación.','Un tratamiento facial personalizado con vitamina C que repara y previene el envejecimiento y daños en la piel.',1000.00,40,'/images/tatamientos/10-piel-sensible.jpeg',NULL,NULL,2,2,NULL),
	(39,'Anti Age','Después de evaluar sus necesidades individuales de cuidado de la piel, la cara se limpia, tonifica, trata con enzimas naturales totalmente especiales, se vaporiza y se purga de impurezas. Usando aceites de aromaterapia, se masajean la cara, el cuello y las manos, llevándote a kilómetros de distancia a un mar de tranquilidad. Luego se prodiga la cara con una máscara combinada personalizada y, finalmente, una crema hidratante rejuvenecedora. La piel queda con más elasticidad y vitalidad, brillando por dentro y por fuera.','Limpia, tonifica, tratamiento con enzimas naturales totalmente especiales.',1000.00,40,'/images/tatamientos/11-anti-age.jpeg',NULL,NULL,2,3,NULL),
	(40,'Tratamiento piel de espalda','Un tratamiento de espalda personalizado y efectivo para aquellos que son propensos al acné de espalda y problemas de la piel. Este tratamiento especial comienza con una exfoliación suave y una limpieza profunda de los poros. Usando un gel refrescante especialmente formulado a partir de hierbas curativas naturales, la espalda se limpiará y tonificará, y se tratará con una mascarilla mezclada personalizada. Su piel emergerá notablemente más clara y más vibrante.','Un tratamiento de espalda personalizado y efectivo para aquellos que son propensos al acné y problemas de la piel.',1200.00,40,'/images/tatamientos/12-tratamiento-piel-de-espalda.jpeg',NULL,NULL,1,1,NULL),
	(41,'Drenaje linfático','Delicado y placentero, con grandes beneficios, esta técnica de drenaje linfático ayuda a mejorar la circulación para reducir la retención de liquidos, sintiéndote más ligero y libre de toxinas.','Delicado y placentero, con grandes beneficios.',1600.00,60,'/images/tatamientos/13-drenaje-linfatico.jpg',NULL,NULL,3,2,NULL),
	(42,'Maderoterapia','Es un tratamiento que se basa en un masaje realizado a través del uso de instrumentos de madera de diferentes formas, tamaños y diseños. Estos instrumentos se adaptan a distintas partes del cuerpo consiguiendo la estimulación corporal.Mediante este método natural se puede ayudar a reducir los niveles de estrés, activar la renovación celular, reafirmar, tonificar el cuerpo, tratar la celulitis reduciendo los depósitos de grasa, modelar el contorno corporal y combatir diferentes dolores como el de espalda o cuello.','Es un tratamiento que se basa en un masaje realizado a través del uso de instrumentos de madera de diferentes formas, tamaños y diseños.',1200.00,60,'/images/tatamientos/14-maderoterapia.jpg',NULL,NULL,3,3,NULL),
	(43,'Manicure classic','Manicure + Color + Humectación + Fortalecedor','Manicure + Color + Humectación + Fortalecedor',500.00,40,'/images/tatamientos/15-manicure-classic.jpeg',NULL,NULL,5,1,NULL),
	(44,'Manicure premium','Manicure + Color + Humectación + Fortalecedor + Baño de Parafina','Manicure + Color + Humectación + Fortalecedor + Baño de Parafina',700.00,40,'/images/tatamientos/16-manicure-premium.png',NULL,NULL,5,2,NULL),
	(45,'Spa pies','Pedicure + Hidromasaje + Color','Pedicure + Hidromasaje + Color',700.00,40,'/images/tatamientos/17-spa-pies.jpeg',NULL,NULL,6,3,NULL),
	(47,'Centros Energéticos','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.',1500.00,45,'/images/tatamientos/centros-energéticos-1581956813908.jpg','2020-02-17 13:26:53','2020-02-17 13:26:53',7,NULL,NULL),
	(48,'Centros Energéticos 2','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.',1500.00,45,'/images/tatamientos/centros-energéticos-2-1581957059402.jpg','2020-02-17 13:30:59','2020-02-17 13:30:59',6,NULL,NULL),
	(49,'Centros Energéticos 3','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.',1500.00,45,'/images/tatamientos/centros-energéticos-3-1581957868905.jpg','2020-02-17 13:44:28','2020-02-17 13:44:28',6,NULL,NULL),
	(50,'Centros Energéticos 4','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.','                Un especialista trabajara sobre los centros energéticos del cuerpo, para linear los chacras y generar un sensacion de bienestar y plenitud total.',1500.00,45,'/images/tatamientos/centros-energéticos-4-1581957969856.jpg','2020-02-17 13:46:09','2020-02-17 13:46:09',6,NULL,NULL),
	(51,'Servicio de Prueba 123','                Lorem ipsum asdasda','                Resumne',134.00,44,'/images/tatamientos/servicio-de-prueba-123-1581986756158.jpg','2020-02-17 21:45:56','2020-02-17 21:45:56',2,NULL,NULL),
	(52,'Servicio de Prueba 123','                Lorem ipsum asdasda','                Resumne',134.00,44,'/images/tatamientos/servicio-de-prueba-123-1581986883484.jpg','2020-02-17 21:48:03','2020-02-17 21:48:03',2,NULL,NULL),
	(53,'Servicio de Prueba 1234','                Lorem ipsum asdasda','                Resumne',134.00,44,'/images/tatamientos/servicio-de-prueba-1234-1581987101938.jpg','2020-02-17 21:51:41','2020-02-17 21:51:41',3,NULL,NULL);

/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'no-image.png',
  `admin` tinyint(4) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `avatar`, `admin`, `createdAt`, `updatedAt`)
VALUES
	(1,'Reuven','Parkinson','rparkinson0@gravatar.com','ka3wWTgmCigi','default-user.png',0,NULL,NULL),
	(2,'Etta','Markwick','emarkwick1@stumbleupon.com','gb2bt99rUg','default-user.png',0,NULL,NULL),
	(3,'Bertrando','Konmann','bkonmann2@issuu.com','xcG1Jkw5JXPb','default-user.png',0,NULL,NULL),
	(4,'Gabriela','Fairbourn','gfairbourn3@admin.ch','BXncyMda','default-user.png',0,NULL,NULL),
	(5,'Ardith','Pleat','apleat4@theatlantic.com','qFuxRir','default-user.png',0,NULL,NULL),
	(6,'Sada','Attryde','sattryde5@hhs.gov','Efu4tE6ect','default-user.png',0,NULL,NULL),
	(7,'Chastity','Lissemore','clissemore6@edublogs.org','UcLJrl','default-user.png',0,NULL,NULL),
	(8,'Clyve','Saltsberger','csaltsberger7@ezinearticles.com','TXe89n','default-user.png',0,NULL,NULL),
	(9,'Aurilia','Cardon','acardon8@intel.com','Q1MRZ7wxK2d','default-user.png',0,NULL,NULL),
	(10,'Abner','Redihough','aredihough9@tripod.com','fijYmn','default-user.png',0,NULL,NULL),
	(11,'Horacio','Suarez','horacio@test.com','$2b$10$i5zN40EY6nnUKarJ4AIbkOc7VcbIbQP6BlfBH43dcFrG3cGejHJIq','1580051913546.jpg',0,NULL,NULL),
	(12,'H','S','test2@dh.com','$2b$10$UVAnsWOPEUTgroWWXdBp4.VvUo4LmHfHXC5qjkUDdr0C7DDQMeine','1580315215095.png',0,NULL,NULL),
	(13,'H1','S2','test3@dh.com','$2b$10$UVjvafGjVto/oJWs1q/al.Owe.YstSN9k9ATLwwG4eDhJYGIf0CBy','1580315771873.png',0,NULL,NULL),
	(14,'Horacio','Suarez','horaciosuarez@dh.com','$2b$10$TkF.H/7U/HeDJYCwJ8JMLu.AvBu87.zxwxS6cHpqsu1GGyAlz3wQi','horacio-1580408109655.jpg',0,NULL,NULL),
	(15,'Caterina','Znidarsic','cvznidarsic@gmail.com','$2b$10$sqFTi8eOJzDyDjU6PBNCx.22XaxPccoDd4/7YrUsrdxxrknCXKRC6','caterina-1580671317774.jpeg',0,NULL,NULL),
	(16,'Maria','La del barrio','nada@algo.com','$2b$10$0hglKyFvsCang.aJnpLMaO/docJ2YqA9IsQJitKf9otwEM/7epCcW','maria-1580671574074.jpeg',0,NULL,NULL),
	(17,'Ana','Lisa','ana@lisa.com','$2b$10$wwNYYZFsgdxPzOVBP5qp8uw4KUWSjroELNs4s5/kvOCT/Vt1XnhVy','default-user.png',0,NULL,NULL),
	(18,'Horacio','Suarez','horacio.vfx@gmail.com','$2b$10$qHUDnsYD2Fo8PffCGaUqRe4gTw7yKQp1VPHJV2zSHDWKz2OC.n08.','horacio-1582050857601.jpg',0,'2020-02-18 15:34:17','2020-02-18 15:34:17');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userService
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userService`;

CREATE TABLE `userService` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int(255) unsigned NOT NULL,
  `appointmentDate` date DEFAULT NULL,
  `salePrice` int(255) NOT NULL,
  `purchaseDate` date DEFAULT NULL,
  `ticket` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `userId` int(10) unsigned NOT NULL,
  `serviceId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `serviceId` (`serviceId`),
  CONSTRAINT `userservice_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `userservice_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `userService` WRITE;
/*!40000 ALTER TABLE `userService` DISABLE KEYS */;

INSERT INTO `userService` (`id`, `quantity`, `appointmentDate`, `salePrice`, `purchaseDate`, `ticket`, `createdAt`, `updatedAt`, `userId`, `serviceId`)
VALUES
	(1,2,NULL,3000,NULL,NULL,'2020-02-19 17:25:08','2020-02-19 17:25:08',18,31),
	(2,3,NULL,2000,NULL,NULL,'2020-02-19 17:42:10','2020-02-19 17:42:10',18,32),
	(3,1,NULL,1600,NULL,NULL,'2020-02-19 17:42:21','2020-02-19 17:42:21',18,34),
	(4,2,NULL,3000,NULL,NULL,'2020-02-19 20:45:10','2020-02-19 20:45:10',18,31),
	(5,1,NULL,2000,NULL,NULL,'2020-02-19 20:47:27','2020-02-19 20:47:27',18,32),
	(6,1,NULL,2000,NULL,NULL,'2020-02-19 21:24:28','2020-02-19 21:24:28',18,32),
	(7,1,NULL,2000,NULL,NULL,'2020-02-19 21:28:16','2020-02-19 21:28:16',18,33);

/*!40000 ALTER TABLE `userService` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
