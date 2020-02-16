CREATE DATABASE  IF NOT EXISTS `spa_nirvana` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci */;
USE `spa_nirvana`;
-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: spa_nirvana
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professionals`
--

DROP TABLE IF EXISTS `professionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professionals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'no-image.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professionals`
--

LOCK TABLES `professionals` WRITE;
/*!40000 ALTER TABLE `professionals` DISABLE KEYS */;
/*!40000 ALTER TABLE `professionals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (31,'Anti Age','Combo de nuestros servicios: Masaje de Piedras Calientes, Tratamiento facial Anti Age, Tratamiento corporal de Drenaje Linfático.','Masaje de Piedras Calientes, Tratamiento facial Anti Age, Tratamiento corporal de Drenaje Linfático.',3000.00,120,'/images/tatamientos/03-anti-age.jpeg',NULL,NULL,NULL,NULL,NULL),(32,'Aromaterapia','En nuestro spa, un masajista licenciado personalizará su masaje de aromaterapia con aceites vegetales altamente concentrados, llamados aceites esenciales, agregados al aceite o loción de masaje. Este masaje es particularmente adecuado para quienes sufran de estrés o quieran mejorar las condiciones anímicas. Cada aceite esencial tiene diferentes propiedades curativas.','Aromaterapia con aceites vegetales altamente concentrados, llamados aceites esenciales, agregados al aceite o loción de masaje.',2000.00,60,'/images/tatamientos/04-aromaterapia.jpeg',NULL,NULL,NULL,NULL,NULL),(33,'Piedras Calientes','En nuestro spa, un masajista licenciado personalizará su masaje con piedras calientes. Las piedras calientes se colocan en puntos específicos y otras piedras serán utilizadas por el masajista para trabajar el músculo.','Las piedras calientes se colocan en puntos específicos para trabajar el músculo.',2000.00,60,'/images/tatamientos/05-piedras-calientes.jpeg',NULL,NULL,NULL,NULL,NULL),(34,'Cuello, hombros y espalda','En nuestro spa, un masajista licenciado adaptará el masaje enfocándose en el cuello, los hombros y la espalda para aliviar la tensión, la incomodidad o la fuente del dolor y ayudarlo lograr una mejor relajación.','Masaje enfocándose en el cuello, los hombros y el cuero cabelludo para aliviar la tensión.',1600.00,30,'/images/tatamientos/06-cuello-hombros-y-espalda.jpeg',NULL,NULL,NULL,NULL,NULL),(35,'Cuello, hombros y cabeza','En nuestro spa, un masajista licenciado adaptará el masaje enfocándose en el cuello, los hombros y el cuero cabelludo para aliviar la tensión, la incomodidad o la fuente del dolor y ayudarlo lograr una mejor relajación.','Masaje enfocándose en el cuello, los hombros y el cuero cabelludo para aliviar la tensión.',1600.00,30,'/images/tatamientos/07-cuello-hombros-y-cabeza.jpeg',NULL,NULL,NULL,NULL,NULL),(36,'Reflexología','En nuestro spa, un masajista licenciado personalizará su reflexología aplicando presión a áreas específicas del pie o la mano para trabajar en el músculo. Masajear estos puntos de presión ayuda a reducir el estrés y las migrañas.','Masajear estos puntos de presión ayuda a reducir el estrés y las migrañas.',1800.00,60,'/images/tatamientos/08-reflexologia.jpeg',NULL,NULL,NULL,NULL,NULL),(37,'Anti Acne','Usando un sistema de oxigenoterapia diseñado para tratar problemas de piel grasa o acné, este tratamiento facial incluye limpieza profunda, extractos herbales de curación personalizados y una exfoliación glicólica o alfa-hidroxi para combatir las imperfecciones de la piel. La mayor mejora proviene de estimular las propiedades de autocuración del cuerpo para que se pueda lograr una piel clara y duradera. Se incluirá un régimen de cuidado de la piel personalizado para el cuidado en el hogar.','Sistema de oxigenoterapia diseñado para tratar problemas de piel grasa o acné.',1000.00,40,'/images/tatamientos/09-anti-acne.jpeg',NULL,NULL,NULL,NULL,NULL),(38,'Piel Sensible','Un tratamiento facial personalizado con vitamina C que repara y previene signos visibles de vejez y daños en la piel. Beneficiando a todos los tipos de piel, se utilizan cantidades concentradas de vitamina C junto con un tónico, una máscara y un humectante especiales para mejorar la vitalidad de la piel, crear células nuevas y aumentar la humectación y la oxigenación.','Un tratamiento facial personalizado con vitamina C que repara y previene el envejecimiento y daños en la piel.',1000.00,40,'/images/tatamientos/10-piel-sensible.jpeg',NULL,NULL,NULL,NULL,NULL),(39,'Anti Age','Después de evaluar sus necesidades individuales de cuidado de la piel, la cara se limpia, tonifica, trata con enzimas naturales totalmente especiales, se vaporiza y se purga de impurezas. Usando aceites de aromaterapia, se masajean la cara, el cuello y las manos, llevándote a kilómetros de distancia a un mar de tranquilidad. Luego se prodiga la cara con una máscara combinada personalizada y, finalmente, una crema hidratante rejuvenecedora. La piel queda con más elasticidad y vitalidad, brillando por dentro y por fuera.','Limpia, tonifica, tratamiento con enzimas naturales totalmente especiales.',1000.00,40,'/images/tatamientos/11-anti-age.jpeg',NULL,NULL,NULL,NULL,NULL),(40,'Tratamiento piel de espalda','Un tratamiento de espalda personalizado y efectivo para aquellos que son propensos al acné de espalda y problemas de la piel. Este tratamiento especial comienza con una exfoliación suave y una limpieza profunda de los poros. Usando un gel refrescante especialmente formulado a partir de hierbas curativas naturales, la espalda se limpiará y tonificará, y se tratará con una mascarilla mezclada personalizada. Su piel emergerá notablemente más clara y más vibrante.','Un tratamiento de espalda personalizado y efectivo para aquellos que son propensos al acné y problemas de la piel.',1200.00,40,'/images/tatamientos/12-tratamiento-piel-de-espalda.jpeg',NULL,NULL,NULL,NULL,NULL),(41,'Drenaje linfático','Delicado y placentero, con grandes beneficios, esta técnica de drenaje linfático ayuda a mejorar la circulación para reducir la retención de liquidos, sintiéndote más ligero y libre de toxinas.','Delicado y placentero, con grandes beneficios.',1600.00,60,'/images/tatamientos/13-drenaje-linfatico.jpg',NULL,NULL,NULL,NULL,NULL),(42,'Maderoterapia','Es un tratamiento que se basa en un masaje realizado a través del uso de instrumentos de madera de diferentes formas, tamaños y diseños. Estos instrumentos se adaptan a distintas partes del cuerpo consiguiendo la estimulación corporal.Mediante este método natural se puede ayudar a reducir los niveles de estrés, activar la renovación celular, reafirmar, tonificar el cuerpo, tratar la celulitis reduciendo los depósitos de grasa, modelar el contorno corporal y combatir diferentes dolores como el de espalda o cuello.','Es un tratamiento que se basa en un masaje realizado a través del uso de instrumentos de madera de diferentes formas, tamaños y diseños.',1200.00,60,'/images/tatamientos/14-maderoterapia.jpg',NULL,NULL,NULL,NULL,NULL),(43,'Manicure classic','Manicure + Color + Humectación + Fortalecedor','Manicure + Color + Humectación + Fortalecedor',500.00,40,'/images/tatamientos/15-manicure-classic.jpeg',NULL,NULL,NULL,NULL,NULL),(44,'Manicure premium','Manicure + Color + Humectación + Fortalecedor + Baño de Parafina','Manicure + Color + Humectación + Fortalecedor + Baño de Parafina',700.00,40,'/images/tatamientos/16-manicure-premium.png',NULL,NULL,NULL,NULL,NULL),(45,'Spa pies','Pedicure + Hidromasaje + Color','Pedicure + Hidromasaje + Color',700.00,40,'/images/tatamientos/17-spa-pies.jpeg',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userService`
--

DROP TABLE IF EXISTS `userService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userService` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int(10) unsigned DEFAULT NULL,
  `appointmentDate` date NOT NULL,
  `salePrice` decimal(8,2) NOT NULL,
  `purchaseDate` date NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userService`
--

LOCK TABLES `userService` WRITE;
/*!40000 ALTER TABLE `userService` DISABLE KEYS */;
/*!40000 ALTER TABLE `userService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-16 11:21:32
