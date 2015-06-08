/*
SQLyog Community v9.33 GA
MySQL - 5.5.41-0+wheezy1 : Database - dht_log
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dht_log` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `dht` */

CREATE TABLE `dht` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `temperature` float(5,2) NOT NULL,
  `humidity` float(5,2) NOT NULL,
  `year` int(4) NOT NULL,
  `month` int(2) unsigned zerofill NOT NULL,
  `date_of_month` int(2) unsigned zerofill NOT NULL,
  `day_of_week` int(1) NOT NULL,
  `hour` int(2) unsigned zerofill NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23014 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
