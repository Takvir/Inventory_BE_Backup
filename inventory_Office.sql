CREATE DATABASE  IF NOT EXISTS `inventory_home` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `inventory_home`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventory_home
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES (1,1103,'Pragati Sharani Branch',2,'HP ','I5 12 gen','Will Be Done','2026-06-11',1500.00,'2024-08-06','Active','Purchase','456465564564',NULL,'N/A'),(2,1101,'Head Office',1,'HP ','I5 12 gen','MMBL-9880','2024-08-01',1500.00,'2024-08-02','Active','Purchase','5443554543',NULL,'ICT'),(3,1113,'Aganagar Branch',6,'Dell Laptop','I5 12 gen','Will Be Done','2024-08-05',5222.00,'2024-08-05','Active','Purchase','456465564564',NULL,'N/A'),(4,1110,'Shambhugonj Branch',6,'Server 99','I5 12 gen','Will Be Done','2024-08-12',550.00,'2024-08-06','InActive','Purchase','5443554543',NULL,'N/A'),(5,1101,'Head Office',5,'Dell Laptop','Monitor 14 inch','MMBL 3214','2024-08-04',1500.00,'2024-08-05','Active','Purchase','5443554543',NULL,'ICT'),(6,1114,'Bheramara Branch',8,'Server 99','14 Inch','Will Be Done','2024-08-15',5222.00,'2024-08-07','Active','Purchase','5443554543',NULL,'N/A'),(7,1112,'Mirpur Branch',6,'Server 3','14 Inch','Will Be Done','2024-08-07',5222.00,'2024-08-06','InActive','Purchase','5443554543',NULL,'N/A'),(8,1101,'Head Office',6,'Dell Laptop','Monitor 14 inch','Will Be Done','2024-08-07',5222.00,'2024-08-07','Active','Purchase','5443554543',NULL,'AML & CFT'),(9,1102,'Gulshan Branch',9,'Dell Laptop','14 Inch','MMBL 123','2024-07-30',5222.00,'2024-08-05','Active','Purchase','5443554543',NULL,'Select Division'),(10,1116,'Kalia Branch',7,'Dell Laptop','I5 12 gen','MMBL GGH','2024-08-01',550.00,'2024-08-07','Active','Purchase','5443554543',NULL,'N/A'),(11,1114,'Bheramara Branch',9,'Server 2','14 Inch','Will Be Done','2024-08-06',1500.00,'2024-08-06','Active','Purchase','5443554543',NULL,'N/A'),(13,1108,'Kanchon Branch',9,'Server 3','Monitor 14 inch','Will Be Done','2024-08-10',5222.00,'2024-08-01','Faulty','Purchase','5443554543',NULL,'N/A'),(14,1114,'Bheramara Branch',9,'Online UPS','6 k','MMBL 123','2024-09-24',15000.00,'2024-08-10','Active','Purchase','456465564564',NULL,'N/A');
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
INSERT INTO `branch` VALUES (1101,'Head Office'),(1102,'Gulshan Branch'),(1103,'Pragati Sharani Branch'),(1104,'Motijheel Branch'),(1105,'Ashuliaaa Branch'),(1106,'Mitford Branch'),(1107,'Uttara Branch'),(1108,'Kanchon Branch'),(1109,'Pirgonj Branch'),(1110,'Shambhugonj Branch'),(1111,'Naogaon Branch'),(1112,'Mirpur Branch'),(1113,'Aganagar Branch'),(1114,'Bheramara Branch'),(1115,'Mirsharai Branch  '),(1116,'Kalia Branch'),(1117,'Pabna Branch'),(1118,'Singair Branch');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'Laptop',14),(2,'Full Desktop',49),(3,'CPU',70),(4,'Keyboard',15),(5,'Mouse',19),(6,'Monitor',33),(7,'Router',19),(8,'Ip Phone',24),(9,'Online UPS',27),(10,'Scanner',20),(12,'Server',19),(13,'Internet Router',20),(14,'Core Router',30),(15,'Printer',50),(16,'Scanner (E-Doc)',5);
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

-- Dump completed on 2024-08-11 17:50:19
