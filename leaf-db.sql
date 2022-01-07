-- -------------------------------------------------------------
-- TablePlus 4.5.2(402)
--
-- https://tableplus.com/
--
-- Database: leaf-db
-- Generation Time: 2022-01-07 11:21:59.3470
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `email` text,
  `phone` text,
  `dob` date DEFAULT NULL,
  `password` text,
  `position` text,
  `pfp` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` text,
  `updated_by` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `leaves`;
CREATE TABLE `leaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` text,
  `submit_time` timestamp NULL DEFAULT NULL,
  `reason` text,
  `explanation` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `total_days` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` text,
  `updated_by` text,
  `employee_id` int DEFAULT NULL,
  `status` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `employees` (`id`, `name`, `email`, `phone`, `dob`, `password`, `position`, `pfp`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(1, 'bleh', 'bleh@gmail.com', '123456789', '2022-01-11', 'password', 'Staff', 'https://media.moddb.com/images/members/5/4550/4549205/duck.jpg', NULL, NULL, NULL, NULL),
(2, 'bloop', 'bloop@gmail.com', '321543765', '2021-10-08', 'password', 'Manager', 'https://media.moddb.com/images/members/5/4550/4549205/duck.jpg', NULL, NULL, NULL, NULL),
(3, 'boo', 'boo@gmail.com', '9876541', '2021-09-16', 'password', 'Staff', 'https://media.moddb.com/images/members/5/4550/4549205/duck.jpg', NULL, NULL, NULL, NULL),
(23, 'jaja', 'jaja@gmail.com', '2394875392092', '2022-01-05', 'password', 'Staff', 'random.jpg', '2022-01-05 13:16:35', NULL, 'Jimin Lee', NULL),
(24, 'blehbleh', 'blehbleh@gmail.com', '378103847108', '2022-01-05', 'password', 'HR', 'random.jpg', '2022-01-05 13:47:33', NULL, 'Jimin Lee', NULL),
(25, 'Blooop', 'blllllll@gmail.com', '1234567893282', '2022-01-07', 'password', 'Director', 'random.jpg', '2022-01-07 10:27:44', NULL, 'Jimin Lee', NULL),
(26, 'sadboi', 'sadboi@gmail.com', '10340125', '2022-01-07', 'password', 'Staff', 'random.jpg', '2022-01-07 10:29:41', NULL, 'Jimin Lee', NULL);

INSERT INTO `leaves` (`id`, `department`, `submit_time`, `reason`, `explanation`, `start_date`, `end_date`, `total_days`, `created_at`, `updated_at`, `created_by`, `updated_by`, `employee_id`, `status`) VALUES
(12, 'IT', '2022-01-03 15:06:00', 'Permitted Late/Early', 'Enter additional explanations', '2022-01-03', '2022-01-03', 4, '2022-01-03 15:06:00', NULL, 'Jimin Lee', NULL, 2, 'approved'),
(13, '12', '2022-01-03 15:13:14', 'Annual', 'Enter additional explanations', '2022-01-03', '2022-01-03', 543, '2022-01-03 15:13:14', NULL, 'Jimin Lee', NULL, 3, 'pending'),
(14, '4ur', '2022-01-03 15:25:19', 'Annual', 'Enter additional explanations', '4410-03-08', '9103-05-31', 84, '2022-01-03 15:25:19', NULL, 'Jimin Lee', NULL, 25, 'approved'),
(15, 'IT', '2022-01-05 11:40:03', 'Permitted Late/Early', 'Enter additwefqknional explanations', '0048-03-08', '9999-09-09', 10, '2022-01-05 11:40:03', NULL, 'Jimin Lee', NULL, 1, 'declined'),
(16, 'design', '2022-01-05 13:43:36', 'Annual', 'Enter additional explanations', '9999-09-04', '9999-09-05', 1, '2022-01-05 13:43:36', NULL, 'Jimin Lee', NULL, 23, 'pending'),
(17, 'yay', '2022-01-05 13:44:23', 'Annual', 'Enter additional explanations', '1111-09-05', '1111-09-06', 1, '2022-01-05 13:44:23', NULL, 'Jimin Lee', NULL, 26, 'pending'),
(18, 'owir2', '2022-01-05 13:46:35', 'Annual', 'Enter additional explanations', '0111-01-11', '0001-11-11', 12312, '2022-01-05 13:46:35', NULL, 'Jimin Lee', NULL, 26, 'declined'),
(19, 'IT', '2022-01-07 10:23:25', 'Half-Day Annual', 'Enter additional explanations', '0100-10-10', '1000-10-10', 1, '2022-01-07 10:23:25', NULL, 'Jimin Lee', NULL, 3, 'pending'),
(20, 'IT', '2022-01-07 10:25:49', 'Annual', 'Enter additional explanations', '0009-09-09', '0009-09-09', 4, '2022-01-07 10:25:49', NULL, 'Jimin Lee', NULL, 24, 'pending'),
(21, '13', '2022-01-07 10:30:00', 'Permitted Late/Early', 'Enter additional explanations13', '0001-11-11', '0001-11-11', 1939, '2022-01-07 10:30:00', NULL, 'Jimin Lee', NULL, 3, 'pending'),
(22, 'IT', '2022-01-07 10:32:12', 'Sick', 'Enter addiwetional explanations', '0011-11-11', '0111-11-11', 1000, '2022-01-07 10:32:12', NULL, 'Jimin Lee', NULL, 2, 'pending'),
(23, 'HR', '2022-01-07 10:34:04', 'Annual', 'Enter additional explanations', '0011-11-11', '0001-11-11', 12, '2022-01-07 10:34:04', NULL, 'Jimin Lee', NULL, 1, 'pending');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;