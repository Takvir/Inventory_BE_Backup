CREATE DATABASE  IF NOT EXISTS `inventory_sub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `inventory_sub`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventory_sub
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `asset_id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `desktop_name` varchar(255) NOT NULL,
  `configuration` varchar(255) DEFAULT NULL,
  `tag_name` varchar(255) DEFAULT NULL,
  `warranty` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `status` enum('Active','InActive','Faulty') NOT NULL,
  `asset_get_by` enum('Purchase','Gift') NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `sub_branch` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`asset_id`),
  KEY `branch_id` (`branch_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `asset_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`),
  CONSTRAINT `asset_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES (1,1101,'Head Office',1,'HP ','Core I5','MMBL GGH','2024-08-05',550.00,'2024-08-20','Active','Purchase','5443554543',NULL,'ICT'),(2,1101,'Head Office',3,'Server 2','I5 12 gen','MMBL ADC','2024-08-11',550.00,'2024-08-20','InActive','Purchase','5443554543',NULL,'ADC'),(3,1101,'Head Office',1,'Server 3','I5 12 gen','jkjhkjkh','2024-08-13',1500.00,'2024-08-04','Active','Purchase','5443554543',NULL,'Card Division'),(4,1102,'Motijheel',3,'HP ','Monitor 14 inch','Test TAG','2024-08-10',1500.00,'2024-08-26','Active','Purchase','5443554543',NULL,'N/A'),(5,1101,'Head Office',2,'Dragon','15 inch LCD ','TAG TESRT','2024-08-27',2200.00,'2024-08-03','Active','Purchase','123456',NULL,'Chairman Sir & MD & CEO Office'),(6,1101,'Head Office',4,'Tenda','i 3','MMBL ddd','2024-08-28',2200.00,'2024-08-05','InActive','Purchase','123456',NULL,'ICT'),(7,1102,'Motijheel',5,'Dragon','Core i5','HHMML','2024-08-05',2200.00,'2024-08-06','InActive','Purchase','123456',NULL,'N/A'),(8,1103,'Gulshan',5,'Drag DD','Core i7','MMBL Update','2024-08-07',2200.00,'2024-08-03','Active','Purchase','123456',NULL,'N/A'),(9,1101,'Head Office',1,'Accerm 22','Core i5','New Test','2024-08-28',2200.00,'2024-08-18','Active','Purchase','123456',NULL,'ICT'),(10,1102,'Motijheel',4,'TP Link','i 5','Hydrolic','2024-08-03',555.00,'2024-08-19','InActive','Purchase','123456',NULL,'N/A'),(11,1109,'Kanaipur Branch',5,'Dragon','Core i5','Full Tag','2024-08-27',1500.00,'2024-08-11','Active','Purchase','123456',NULL,'N/A'),(12,1109,'Kanaipur Branch',3,'Accer','Core i5','MMBL Tag','2024-08-04',2200.00,'2024-08-11','Active','Purchase','123456',NULL,'N/A'),(13,1103,'Gulshan',5,'TESLA','Core i5','MMBL Update','2024-08-11',2200.00,'2024-08-05','Active','Purchase','123456',NULL,'N/A'),(14,1103,'Gulshan',5,'Inspiron','Core i5','MMBL Update','2024-08-11',2200.00,'2024-08-05','Active','Purchase','123456',NULL,'N/A'),(15,1104,'Barishal Branch',4,'TP Link','i 5','MMBL ddd','2024-08-07',555.00,'2024-08-06','Active','Purchase','5443554543',NULL,'N/A');
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1101,'Head Office'),(1102,'Motijheel'),(1103,'Gulshan'),(1104,'Barishal Branch'),(1105,'Shakhipur Branch'),(1106,'Pirojganj Branch'),(1107,'Mirpur Branch'),(1108,'Naogaon Branch'),(1109,'Kanaipur Branch'),(1110,'Midfort Branch'),(1111,'Uttara Branch'),(1112,'Dhanmondi'),(1113,'Mukshudpur Branch'),(1114,'Mirsharai Branch'),(1115,'Khulna Branch'),(1116,'Aganagar Branch'),(1117,'Bheramara Branch'),(1118,'Banglamotor Branch');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  `stock_in_hand` int(11) DEFAULT 0,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'Laptop',7),(2,'Monitor',19),(3,'Desktop',27),(4,'Router',13),(5,'CPU ',7);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-11  1:45:07
