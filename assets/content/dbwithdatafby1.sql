-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2023 at 10:22 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fby1`
--

-- --------------------------------------------------------

--
-- Table structure for table `agendas`
--

CREATE TABLE `agendas` (
  `id` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `operation_date` datetime NOT NULL,
  `job_id` int(11) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `date_schedule_id` int(11) NOT NULL,
  `coordinates_id` int(11) NOT NULL,
  `agenda_type` varchar(15) NOT NULL COMMENT 'TASK\nAGENDA',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `guard_id` int(11) NOT NULL,
  `agenda_done` tinyint(1) NOT NULL,
  `status_per_staff` char(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `agendas`
--

INSERT INTO `agendas` (`id`, `title`, `description`, `operation_date`, `job_id`, `created_by_id`, `date_schedule_id`, `coordinates_id`, `agenda_type`, `created_at`, `updated_at`, `guard_id`, `agenda_done`, `status_per_staff`) VALUES
(1, 'scan-QR-code', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.', '2023-01-05 23:00:00', 1, 1, 1, 0, 'INSTRUCTION', '2023-01-06 23:54:29', '2023-01-06 23:54:29', 28, 0, 'PENDING'),
(2, 'scan-QR-code', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.', '2023-01-05 23:00:00', 1, 1, 4, 0, 'INSTRUCTION', '2023-01-06 23:54:29', '2023-01-06 23:54:29', 29, 0, 'PENDING'),
(3, 'scan-QR-code', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.', '2023-01-08 12:36:00', 1, 1, 3, 0, 'INSTRUCTION', '2023-01-06 23:54:29', '2023-01-06 23:54:29', 28, 0, 'PENDING'),
(4, 'scan-QR-code', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.', '2023-01-08 12:36:00', 1, 1, 6, 0, 'INSTRUCTION', '2023-01-06 23:54:29', '2023-01-06 23:54:29', 29, 0, 'PENDING'),
(5, 'None', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2023-01-09 00:00:00', 1, 1, 7, 0, 'TASK', '2023-01-09 17:01:04', '2023-01-09 17:01:04', 28, 0, 'PENDING'),
(6, 'None', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2023-01-07 00:00:00', 1, 1, 2, 0, 'TASK', '2023-01-09 17:01:04', '2023-01-09 17:01:04', 28, 0, 'PENDING'),
(7, 'None', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2023-01-06 00:00:00', 1, 1, 1, 0, 'TASK', '2023-01-09 17:01:04', '2023-01-09 17:01:04', 28, 0, 'PENDING'),
(8, 'None', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2023-01-09 00:00:00', 1, 1, 8, 0, 'TASK', '2023-01-09 17:01:04', '2023-01-09 17:01:04', 29, 0, 'PENDING'),
(9, 'None', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2023-01-07 00:00:00', 1, 1, 5, 0, 'TASK', '2023-01-09 17:01:04', '2023-01-09 17:01:04', 29, 0, 'PENDING'),
(10, 'None', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2023-01-06 00:00:00', 1, 1, 4, 0, 'TASK', '2023-01-09 17:01:04', '2023-01-09 17:01:04', 29, 0, 'PENDING'),
(11, 'None', 'Lorem Ipsum is simply dummLorem Ipsum is simply dummy text of the printing and ', '2023-01-17 00:00:00', 5, 1, 13, 41, 'TASK', '2023-01-17 16:51:34', '2023-01-17 20:44:56', 29, 1, 'PENDING'),
(12, 'None', 'Lorem Ipsum is simply dummLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasy text of the printing and typesetting industry. Lorem Ipsum has', '2023-01-17 00:00:00', 5, 1, 13, 42, 'TASK', '2023-01-17 17:55:51', '2023-01-17 20:58:35', 29, 1, 'PENDING'),
(13, 'scan-QR-code', 'check the back of the door', '2023-01-17 11:47:00', 5, 1, 13, 0, 'INSTRUCTION', '2023-01-17 20:52:34', '2023-01-17 20:52:34', 29, 0, 'PENDING'),
(14, 'scan-QR-code', 'check the back of the door', '2023-01-18 11:47:00', 5, 1, 13, 0, 'INSTRUCTION', '2023-01-17 20:52:34', '2023-01-17 20:52:34', 29, 0, 'PENDING'),
(15, 'scan-QR-code', 'check the back of the door', '2023-01-18 23:00:00', 5, 1, 13, 0, 'INSTRUCTION', '2023-01-17 20:52:34', '2023-01-17 20:52:34', 29, 0, 'PENDING'),
(16, 'scan-QR-code', 'address', '2023-01-19 18:54:00', 3, 1, 14, 0, 'INSTRUCTION', '2023-01-19 16:56:45', '2023-01-19 16:56:45', 29, 0, 'PENDING'),
(17, 'scan-QR-code', 'address', '2023-01-21 18:54:00', 3, 1, 15, 0, 'INSTRUCTION', '2023-01-19 16:56:45', '2023-01-19 16:56:45', 29, 0, 'PENDING'),
(18, 'scan-QR-code', 'address', '2023-01-23 18:54:00', 3, 1, 16, 0, 'INSTRUCTION', '2023-01-19 16:56:45', '2023-01-19 16:56:45', 29, 0, 'PENDING'),
(19, 'scan-QR-code', 'njnjjjjbjbjbb', '2023-01-24 15:22:00', 3, 1, 20, 0, 'INSTRUCTION', '2023-01-23 12:23:06', '2023-01-23 12:23:06', 29, 0, 'PENDING'),
(20, 'scan-QR-code', 'njnjjjjbjbjbb', '2023-01-26 15:22:00', 3, 1, 21, 0, 'INSTRUCTION', '2023-01-23 12:23:06', '2023-01-23 12:23:06', 29, 0, 'PENDING'),
(21, 'scan-QR-code', 'njnjjjjbjbjbb', '2023-01-29 15:22:00', 3, 1, 22, 0, 'INSTRUCTION', '2023-01-23 12:23:06', '2023-01-23 12:23:06', 29, 0, 'PENDING'),
(22, 'scan-QR-code', 'njnjjjjbjbjbb', '2023-01-24 15:22:00', 3, 1, 17, 0, 'INSTRUCTION', '2023-01-23 12:23:06', '2023-01-23 12:23:06', 28, 0, 'PENDING'),
(23, 'scan-QR-code', 'njnjjjjbjbjbb', '2023-01-26 15:22:00', 3, 1, 18, 0, 'INSTRUCTION', '2023-01-23 12:23:06', '2023-01-23 12:23:06', 28, 0, 'PENDING'),
(24, 'scan-QR-code', 'njnjjjjbjbjbb', '2023-01-29 15:22:00', 3, 1, 19, 0, 'INSTRUCTION', '2023-01-23 12:23:06', '2023-01-23 12:23:06', 28, 0, 'PENDING'),
(28, 'None', 'JJJJJJJJJJJJJJJJ', '2023-01-26 00:00:00', 3, 1, 21, 0, 'TASK', '2023-01-23 14:23:54', '2023-01-23 14:23:54', 29, 0, 'PENDING'),
(29, 'None', 'JJJJJJJJJJJJJJJJ', '2023-01-29 00:00:00', 3, 1, 22, 0, 'TASK', '2023-01-23 14:23:54', '2023-01-23 14:23:54', 29, 0, 'PENDING'),
(30, 'None', 'JJJJJJJJJJJJJJJJ', '2023-01-26 00:00:00', 3, 1, 18, 0, 'TASK', '2023-01-23 14:23:54', '2023-01-23 14:23:54', 28, 0, 'PENDING'),
(31, 'None', 'JJJJJJJJJJJJJJJJ', '2023-01-29 00:00:00', 3, 1, 19, 0, 'TASK', '2023-01-23 14:23:54', '2023-01-23 14:23:54', 28, 0, 'PENDING'),
(79, 'scan-QR-code', 'test  test', '2023-01-25 16:18:00', 8, 1, 58, 0, 'INSTRUCTION', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 31, 0, 'PENDING'),
(80, 'scan-QR-code', 'test  test', '2023-01-24 19:18:00', 8, 1, 58, 0, 'INSTRUCTION', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 31, 0, 'PENDING'),
(81, 'scan-QR-code', 'test  test', '2023-01-25 20:18:00', 8, 1, 58, 0, 'INSTRUCTION', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 31, 0, 'PENDING'),
(82, 'None', 'jjjjjjjjjjjjjjj', '2023-01-25 00:00:00', 8, 1, 58, 0, 'TASK', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 31, 0, 'PENDING'),
(83, 'scan-QR-code', 'test  test', '2023-01-25 16:18:00', 8, 1, 58, 0, 'INSTRUCTION', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 32, 0, 'PENDING'),
(84, 'None', 'jjjjjjjjjjjjjjj', '2023-01-25 00:00:00', 8, 1, 58, 0, 'TASK', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 32, 0, 'PENDING'),
(85, 'scan-QR-code', 'test  test', '2023-01-24 19:18:00', 8, 1, 58, 0, 'INSTRUCTION', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 32, 0, 'PENDING'),
(86, 'scan-QR-code', 'test  test', '2023-01-25 20:18:00', 8, 1, 58, 0, 'INSTRUCTION', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 32, 0, 'PENDING'),
(87, 'scan-QR-code', 'm mm j j ', '2023-02-01 16:42:00', 9, 1, 67, 0, 'INSTRUCTION', '2023-01-28 16:41:03', '2023-01-28 16:41:03', 51, 0, 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `assigned_staffs`
--

CREATE TABLE `assigned_staffs` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `accept_assignment` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coordinates`
--

CREATE TABLE `coordinates` (
  `id` int(11) NOT NULL,
  `longitude` decimal(9,7) NOT NULL,
  `latitude` decimal(9,7) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `coordinates`
--

INSERT INTO `coordinates` (`id`, `longitude`, `latitude`, `created_at`, `updated_at`, `is_deleted`, `is_archived`) VALUES
(1, '7.4027400', '6.8684900', '2023-01-06 22:29:46', '2023-01-06 22:29:46', 0, 0),
(2, '7.4027400', '6.8684900', '2023-01-06 22:29:46', '2023-01-06 22:29:46', 0, 0),
(3, '4.2182000', '51.9949000', '2023-01-06 23:59:07', '2023-01-06 23:59:07', 0, 0),
(4, '4.2182000', '51.9949000', '2023-01-10 10:23:59', '2023-01-10 10:23:59', 0, 0),
(5, '4.2182000', '51.9949000', '2023-01-10 10:29:22', '2023-01-10 10:29:22', 0, 0),
(6, '4.2182000', '51.9949000', '2023-01-10 17:03:27', '2023-01-10 17:03:27', 0, 0),
(7, '4.2182000', '51.9949000', '2023-01-12 20:48:57', '2023-01-12 20:48:57', 0, 0),
(8, '6.9746000', '4.8472200', '2023-01-17 10:49:52', '2023-01-17 10:49:52', 0, 0),
(9, '6.9746000', '4.8472200', '2023-01-17 10:49:59', '2023-01-17 10:49:59', 0, 0),
(10, '6.9746000', '4.8472200', '2023-01-17 10:50:06', '2023-01-17 10:50:06', 0, 0),
(11, '6.9746000', '4.8472200', '2023-01-17 10:50:12', '2023-01-17 10:50:12', 0, 0),
(12, '6.9746000', '4.8472200', '2023-01-17 10:52:20', '2023-01-17 10:52:20', 0, 0),
(13, '6.9746000', '4.8472200', '2023-01-17 10:53:14', '2023-01-17 10:53:14', 0, 0),
(14, '6.9746000', '4.8472200', '2023-01-17 10:54:03', '2023-01-17 10:54:03', 0, 0),
(15, '6.9746000', '4.8472200', '2023-01-17 10:55:42', '2023-01-17 10:55:42', 0, 0),
(16, '6.9746000', '4.8472200', '2023-01-17 10:57:46', '2023-01-17 10:57:46', 0, 0),
(17, '6.9746000', '4.8472200', '2023-01-17 10:58:22', '2023-01-17 10:58:22', 0, 0),
(18, '6.9746000', '4.8472200', '2023-01-17 11:08:20', '2023-01-17 11:08:20', 0, 0),
(19, '6.9746000', '4.8472200', '2023-01-17 11:08:48', '2023-01-17 11:08:48', 0, 0),
(20, '6.9746000', '4.8472200', '2023-01-17 11:11:05', '2023-01-17 11:11:05', 0, 0),
(21, '6.9746000', '4.8472200', '2023-01-17 11:11:09', '2023-01-17 11:11:09', 0, 0),
(22, '6.9746000', '4.8472200', '2023-01-17 16:41:48', '2023-01-17 16:41:48', 0, 0),
(23, '6.9746000', '4.8472200', '2023-01-17 16:41:53', '2023-01-17 16:41:53', 0, 0),
(24, '6.9746000', '4.8472200', '2023-01-17 16:58:23', '2023-01-17 16:58:23', 0, 0),
(25, '4.2182000', '51.9949000', '2023-01-17 18:37:32', '2023-01-17 18:37:32', 0, 0),
(26, '4.2182000', '51.9949000', '2023-01-17 18:37:38', '2023-01-17 18:37:38', 0, 0),
(27, '4.2182000', '51.9949000', '2023-01-17 18:38:14', '2023-01-17 18:38:14', 0, 0),
(28, '4.2182000', '51.9949000', '2023-01-17 18:49:53', '2023-01-17 18:49:53', 0, 0),
(29, '4.2182000', '51.9949000', '2023-01-17 18:50:05', '2023-01-17 18:50:05', 0, 0),
(30, '4.2182000', '51.9949000', '2023-01-17 18:50:23', '2023-01-17 18:50:23', 0, 0),
(31, '4.2182000', '51.9949000', '2023-01-17 18:50:43', '2023-01-17 18:50:43', 0, 0),
(32, '4.2182000', '51.9949000', '2023-01-17 20:29:29', '2023-01-17 20:29:29', 0, 0),
(33, '4.2182000', '51.9949000', '2023-01-17 20:29:54', '2023-01-17 20:29:54', 0, 0),
(34, '4.2182000', '51.9949000', '2023-01-17 20:33:18', '2023-01-17 20:33:18', 0, 0),
(35, '4.2182000', '51.9949000', '2023-01-17 20:33:26', '2023-01-17 20:33:26', 0, 0),
(36, '4.2182000', '51.9949000', '2023-01-17 20:35:12', '2023-01-17 20:35:12', 0, 0),
(37, '4.2182000', '51.9949000', '2023-01-17 20:36:28', '2023-01-17 20:36:28', 0, 0),
(38, '4.2182000', '51.9949000', '2023-01-17 20:36:33', '2023-01-17 20:36:33', 0, 0),
(39, '4.2182000', '51.9949000', '2023-01-17 20:36:43', '2023-01-17 20:36:43', 0, 0),
(40, '4.2182000', '51.9949000', '2023-01-17 20:36:58', '2023-01-17 20:36:58', 0, 0),
(41, '4.2182000', '51.9949000', '2023-01-17 20:44:56', '2023-01-17 20:44:56', 0, 0),
(42, '4.2182000', '51.9949000', '2023-01-17 20:58:35', '2023-01-17 20:58:35', 0, 0),
(43, '4.2182000', '51.9949000', '2023-01-18 06:15:49', '2023-01-18 06:15:49', 0, 0),
(44, '4.2182000', '51.9949000', '2023-01-18 06:29:44', '2023-01-18 06:29:44', 0, 0),
(45, '7.3185100', '9.1432700', '2023-01-18 13:35:36', '2023-01-18 13:35:36', 0, 0),
(46, '7.3185100', '9.1432700', '2023-01-18 13:35:36', '2023-01-18 13:35:36', 0, 0),
(47, '20.0125000', '39.7823200', '2023-01-18 13:53:38', '2023-01-18 13:53:38', 0, 0),
(48, '20.0125000', '39.7823200', '2023-01-18 13:53:38', '2023-01-18 13:53:38', 0, 0),
(49, '4.2182000', '51.9949000', '2023-01-19 16:48:26', '2023-01-19 16:48:26', 0, 0),
(50, '4.2182000', '51.9949000', '2023-01-19 16:49:03', '2023-01-19 16:49:03', 0, 0),
(51, '6.9746000', '4.8472200', '2023-01-19 16:51:24', '2023-01-19 16:51:24', 0, 0),
(52, '4.2182000', '51.9949000', '2023-01-19 16:51:58', '2023-01-19 16:51:58', 0, 0),
(53, '4.2182000', '51.9949000', '2023-01-19 16:57:43', '2023-01-19 16:57:43', 0, 0),
(54, '7.2138400', '9.1015700', '2023-01-19 17:53:52', '2023-01-19 17:53:52', 0, 0),
(55, '7.2138400', '9.1015700', '2023-01-19 17:53:52', '2023-01-19 17:53:52', 0, 0),
(56, '7.2141200', '9.1017900', '2023-01-21 14:25:03', '2023-01-21 14:25:03', 0, 0),
(57, '7.2141200', '9.1017900', '2023-01-21 14:25:03', '2023-01-28 12:02:58', 0, 0),
(58, '7.2139000', '9.1016000', '2023-01-21 14:49:56', '2023-01-21 14:49:56', 0, 0),
(59, '7.2139000', '9.1016000', '2023-01-21 14:49:56', '2023-01-21 14:49:56', 0, 0),
(60, '7.2139000', '9.1016000', '2023-01-25 22:32:33', '2023-01-25 22:32:33', 0, 0),
(61, '7.2139000', '9.1016000', '2023-01-25 22:32:33', '2023-01-25 22:32:33', 0, 0),
(62, '7.2138700', '9.1018200', '2023-01-25 23:00:09', '2023-01-25 23:00:09', 0, 0),
(63, '7.2138700', '9.1018200', '2023-01-25 23:00:09', '2023-01-25 23:00:09', 0, 0),
(64, '4.2182000', '51.9949000', '2023-01-28 16:41:42', '2023-01-28 16:41:42', 0, 0),
(65, '7.4023500', '6.8687700', '2023-01-28 21:36:28', '2023-01-28 21:36:28', 0, 0),
(66, '7.4023500', '6.8687700', '2023-01-28 21:36:28', '2023-01-28 21:36:28', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `created_by_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `last_logged_in` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `password` longtext NOT NULL,
  `image` varchar(500) NOT NULL DEFAULT 'https://fbyteamschedule.com/fby-security-api/public/images/avatars/fbyDefaultIMG.png',
  `phone_number` varchar(15) NOT NULL,
  `suspended` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Database for users of services on the platform';

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `company_name`, `email`, `gender`, `location_id`, `created_by_id`, `created_at`, `updated_at`, `last_logged_in`, `is_deleted`, `is_archived`, `password`, `image`, `phone_number`, `suspended`) VALUES
(1, 'Chinaza', 'mosesogbonna68@gmail.com', 'MALE', 2, 1, '2023-01-06 22:24:32', '2023-01-06 22:24:32', NULL, 0, 0, '$2b$10$kyaBmkyEywiHJKJkvhSQLuXDUOasF8/2ZcW3O0Tb1mzSOZPlkYBeS', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(2, 'denis', 'naza36899@gmail.com', 'MALE', 6, 1, '2023-01-17 10:04:08', '2023-01-17 10:04:08', NULL, 0, 0, '$2b$10$mJuxcMCYU.3KJT8aYHo.9e0PH.eWIvf30mmVcY4UvG4mPEyZ4U6.q', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(3, 'lolo', 'mosesogbonna8@gmail.com', 'FEMALE', 7, 1, '2023-01-18 12:28:45', '2023-01-18 12:28:45', NULL, 0, 0, '$2b$10$wHlsmMmF0cfuVD9J3avwfeTRY6zdeqr7dQdewoms51Q4jh/eKMQJq', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 0),
(4, 'student', 'mosesogbonn@gmail.com', 'FEMALE', 18, 1, '2023-01-26 14:35:59', '2023-01-26 14:35:59', NULL, 0, 0, '$2b$10$MIULR608ctkht57fdWisFuSRaI.uCIU43NeyZ701RWHNVBTCshYAK', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(5, 'company_name2', 'mokkse@gmail.com', 'FEMALE', 26, 1, '2023-01-26 22:12:33', '2023-01-26 22:12:33', NULL, 0, 0, '$2b$10$dD7SJlAGlXyO1gIA.B8DH.qHlCb7p4z76rkeNJYUscGEW1NipyIem', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(6, 'student', 'mose@gmail.com', 'FEMALE', 27, 1, '2023-01-27 10:24:14', '2023-01-27 10:24:14', NULL, 0, 0, '$2b$10$N3vbga9nyffHtIpkUgh.0OSoX9w3MeK6SxLg6syuwi2Z7U8WDoHxG', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(7, 'student', 'kkkkkkkkkkkkkkkkkkk@gmail.com', 'FEMALE', 28, 1, '2023-01-27 10:26:14', '2023-01-27 10:26:14', NULL, 0, 0, '$2b$10$gHPiOjrAQ196akfBSw9vaej7wLG.HHobEGU60q/eK6wOtaPlfxepq', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '81999999999', 1),
(8, 'student LT', 'm8@gmail.com', 'MALE', 29, 1, '2023-01-27 10:26:41', '2023-01-27 10:26:41', NULL, 0, 0, '$2b$10$fh6pYrv7tNsJ1I4JrJYOP.6VYPdPfZ6OqYd440YFvnsbd3O0O1Uga', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(9, 'student LT', 'test100@gmail.com', 'MALE', 30, 1, '2023-01-27 10:27:08', '2023-01-27 10:27:08', NULL, 0, 0, '$2b$10$kjEaCWZpcyvhvLxTGtSM/.rAvxyDP0juj/PQZRdKv4617q3xxRki.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(10, 'student', 'test@example.com', 'NOT_SPECIFIED', 31, 1, '2023-01-27 10:27:26', '2023-01-27 10:27:26', NULL, 0, 0, '$2b$10$Pi.VgfQKD0jEjPF4Mu0Tyuq4OjZt5HunbuBiovmKgpFEaLOb4HqYe', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(11, 'student', 'chinazaogbonna10000@gmail.com', 'MALE', 32, 1, '2023-01-27 10:28:00', '2023-01-27 10:28:00', NULL, 0, 0, '$2b$10$2mAhfmL2PrXrQClqrkHE6.WOPDJKn2kh.2LGDLBhuW7kAGTihDBCC', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(12, 'student', 'mosesogbonllllll@gmail.com', 'MALE', 33, 1, '2023-01-27 10:34:33', '2023-01-27 10:34:33', NULL, 0, 0, '$2b$10$l0RNuhgQnb548KKIu2LafuSke1itIxbP29nHNHBBjTpTGURZXr/a2', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(13, 'student LT', 'kspace@proton.me', 'FEMALE', 34, 1, '2023-01-27 10:34:53', '2023-01-27 10:34:53', NULL, 0, 0, '$2b$10$SQYZpElj11rI3UY0axzjaeGUEpT8C8xPmvm/nZ7qEeK5pzZfn5LDG', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(14, 'student', 'ooooooooooooooo@gmail.com', 'NOT_SPECIFIED', 35, 1, '2023-01-27 10:35:09', '2023-01-27 10:35:09', NULL, 0, 0, '$2b$10$eYshh3IbXDDQCGen4zMjkO.DqsyhEApT27JvLtp/dhvTAUJAj6FVe', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(15, 'student', 'mosesogbonpoko8@gmail.com', 'FEMALE', 36, 1, '2023-01-27 10:35:29', '2023-01-27 10:35:29', NULL, 0, 0, '$2b$10$zqsrXQM2DCHiiXq0FCSSs.5cWa66tkJHOHHS4MjHM7BN7.JJ75MDa', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(16, 'student LT', 'popo8@gmail.com', 'MALE', 37, 1, '2023-01-27 10:35:56', '2023-01-27 10:35:56', NULL, 0, 0, '$2b$10$5jPjeKndLQ.CoPx2n7Xh6ekPg8no.RMpvoBOWlSr6.fgpMuS/eDf.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 1),
(17, 'student', 'moses@gmail.com', 'MALE', 38, 1, '2023-01-27 10:46:55', '2023-01-27 10:46:55', NULL, 0, 0, '$2b$10$QOfbki86vDd0HJxdL42Yxe2DucL.trj2fJ8MAK5jACq8Pu74BpAMS', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 0),
(18, 'student', 'mosesogbonnOOa68@gmail.com', 'MALE', 47, 1, '2023-01-28 16:00:39', '2023-01-28 16:00:39', NULL, 0, 0, '$2b$10$m3veNW81c5zLUCr9hvIL3OT.NJl0HO4kvnxC7cramyDE.ap5nAV.a', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', '8184724615', 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer_suspension_comments`
--

CREATE TABLE `customer_suspension_comments` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_suspension_comments`
--

INSERT INTO `customer_suspension_comments` (`id`, `admin_id`, `customer_id`, `comment`, `created_at`, `updated_at`, `is_archived`) VALUES
(1, 1, 3, 'he refuse to pay', '2023-01-26 12:59:30', '2023-01-26 12:59:30', 0),
(2, 1, 3, 'he refuse to pay', '2023-01-26 13:31:38', '2023-01-26 13:31:38', 0),
(3, 1, 3, 'ssssssss', '2023-01-26 13:35:18', '2023-01-26 13:35:18', 0),
(4, 1, 2, 'lldldld', '2023-01-26 13:39:27', '2023-01-26 13:39:27', 0),
(5, 1, 1, 'knknknk', '2023-01-26 13:48:09', '2023-01-26 13:48:09', 0),
(6, 1, 4, 'hhhhhhhhhhhhhhhhh', '2023-01-26 21:58:21', '2023-01-26 21:58:21', 0),
(7, 1, 5, 'kdkdkdkdk', '2023-01-27 08:21:36', '2023-01-27 08:21:36', 0),
(8, 1, 5, 'kdkdkdkdk', '2023-01-27 08:21:37', '2023-01-27 08:21:37', 0),
(9, 1, 5, 'user has been unsuspened', '2023-01-27 09:21:49', '2023-01-27 09:21:49', 0),
(10, 1, 5, 'jdjdjdjdjdjd', '2023-01-27 09:22:03', '2023-01-27 09:22:03', 0),
(11, 1, 4, 'user has been unsuspened', '2023-01-27 09:22:11', '2023-01-27 09:22:11', 0),
(12, 1, 4, 'he refuse to pay', '2023-01-27 09:23:09', '2023-01-27 09:23:09', 0),
(13, 1, 5, 'user has been unsuspened', '2023-01-27 09:23:16', '2023-01-27 09:23:16', 0),
(14, 1, 4, 'user has been unsuspened', '2023-01-27 09:23:24', '2023-01-27 09:23:24', 0),
(15, 1, 4, 'hehhhhhhhhhhhhhhhhh', '2023-01-27 09:24:21', '2023-01-27 09:24:21', 0),
(16, 1, 4, 'user has been unsuspened', '2023-01-27 09:26:42', '2023-01-27 09:26:42', 0),
(17, 1, 3, 'user has been unsuspened', '2023-01-27 09:27:01', '2023-01-27 09:27:01', 0),
(18, 1, 2, 'user has been unsuspened', '2023-01-27 09:54:39', '2023-01-27 09:54:39', 0),
(19, 1, 1, 'user has been unsuspened', '2023-01-27 10:07:28', '2023-01-27 10:07:28', 0),
(20, 1, 5, 'customer dont pay', '2023-01-27 10:15:15', '2023-01-27 10:15:15', 0),
(21, 1, 4, 'getTableDate2', '2023-01-27 10:18:17', '2023-01-27 10:18:17', 0),
(22, 1, 5, 'user has been unsuspened', '2023-01-27 10:18:26', '2023-01-27 10:18:26', 0),
(23, 1, 4, 'user has been unsuspened', '2023-01-27 10:48:40', '2023-01-27 10:48:40', 0),
(24, 1, 17, 'hssssssssssssssssssss', '2023-01-27 11:04:31', '2023-01-27 11:04:31', 0),
(25, 1, 17, 'hssssssssssssssssssss', '2023-01-27 11:04:40', '2023-01-27 11:04:40', 0),
(26, 1, 16, 'jjjjjjjjjjjjjjjjj', '2023-01-27 11:07:54', '2023-01-27 11:07:54', 0),
(27, 1, 15, 'jdjddddddddddddddd', '2023-01-27 11:09:25', '2023-01-27 11:09:25', 0),
(28, 1, 14, 'jdjddddddddddddddd', '2023-01-27 11:10:20', '2023-01-27 11:10:20', 0),
(29, 1, 13, 'jdjddddddddddddddd', '2023-01-27 11:10:26', '2023-01-27 11:10:26', 0),
(30, 1, 12, 'jdjddddddddddddddd', '2023-01-27 11:10:30', '2023-01-27 11:10:30', 0),
(31, 1, 11, 'jdjddddddddddddddd', '2023-01-27 11:10:34', '2023-01-27 11:10:34', 0),
(32, 1, 10, 'jdjddddddddddddddd', '2023-01-27 11:10:38', '2023-01-27 11:10:38', 0),
(33, 1, 9, 'jdjddddddddddddddd', '2023-01-27 11:10:43', '2023-01-27 11:10:43', 0),
(34, 1, 8, 'jdjddddddddddddddd', '2023-01-27 11:10:47', '2023-01-27 11:10:47', 0),
(35, 1, 7, 'jdjddddddddddddddd', '2023-01-27 11:10:52', '2023-01-27 11:10:52', 0),
(36, 1, 6, 'jdjddddddddddddddd', '2023-01-27 11:10:56', '2023-01-27 11:10:56', 0),
(37, 1, 5, 'jdjddddddddddddddd', '2023-01-27 11:11:00', '2023-01-27 11:11:00', 0),
(38, 1, 4, 'jdjddddddddddddddd', '2023-01-27 11:11:05', '2023-01-27 11:11:05', 0),
(39, 1, 3, 'jdjddddddddddddddd', '2023-01-27 11:11:09', '2023-01-27 11:11:09', 0),
(40, 1, 2, 'jdjddddddddddddddd', '2023-01-27 11:11:13', '2023-01-27 11:11:13', 0),
(41, 1, 1, 'kdkkkkkkkkkkkkkkkk', '2023-01-27 11:17:55', '2023-01-27 11:17:55', 0),
(42, 1, 17, 'user has been unsuspened', '2023-01-27 11:18:17', '2023-01-27 11:18:17', 0),
(43, 1, 17, 'kdkdkd', '2023-01-27 11:19:32', '2023-01-27 11:19:32', 0),
(44, 1, 2, 'user has been unsuspened', '2023-01-27 11:19:59', '2023-01-27 11:19:59', 0),
(45, 1, 2, 'jdjdjd', '2023-01-27 11:25:34', '2023-01-27 11:25:34', 0),
(46, 1, 1, 'user has been unsuspened', '2023-01-27 11:28:11', '2023-01-27 11:28:11', 0),
(47, 1, 1, 'jsjsdjdjdjjd', '2023-01-27 11:33:32', '2023-01-27 11:33:32', 0),
(48, 1, 2, 'user has been unsuspened', '2023-01-27 11:37:13', '2023-01-27 11:37:13', 0),
(49, 1, 3, 'user has been unsuspened', '2023-01-27 11:39:53', '2023-01-27 11:39:53', 0),
(50, 1, 3, 'kdkdkdl', '2023-01-27 11:45:30', '2023-01-27 11:45:30', 0),
(51, 1, 3, 'user has been unsuspened', '2023-01-27 12:33:26', '2023-01-27 12:33:26', 0),
(52, 1, 2, 'JJJJJJJJJJJJJJJJJJ', '2023-01-27 15:24:30', '2023-01-27 15:24:30', 0),
(53, 1, 17, 'user has been unsuspened', '2023-01-28 08:53:46', '2023-01-28 08:53:46', 0);

-- --------------------------------------------------------

--
-- Table structure for table `deleted_uploads`
--

CREATE TABLE `deleted_uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_upload_url` varchar(300) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `id` int(11) NOT NULL,
  `facility_location_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `client_charge` int(11) NOT NULL DEFAULT 0,
  `guard_charge` int(30) NOT NULL,
  `time_zone` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`id`, `facility_location_id`, `name`, `customer_id`, `created_by_id`, `created_at`, `updated_at`, `is_deleted`, `is_archived`, `client_charge`, `guard_charge`, `time_zone`) VALUES
(1, 1, 'chinaza', 1, 1, '2023-01-06 22:29:46', '2023-01-06 22:29:46', 0, 0, 3000, 89, 'Africa/Lagos'),
(3, 3, 'moses', 3, 1, '2023-01-18 13:53:38', '2023-01-18 13:53:38', 0, 0, 20000, 70, 'Europe/Tirane'),
(4, 4, 'chinaza', 3, 1, '2023-01-19 17:53:52', '2023-01-19 17:53:52', 0, 0, 2000, 34, 'Africa/Lagos'),
(5, 5, 'chin', 3, 1, '2023-01-21 14:25:03', '2023-01-28 12:02:58', 0, 0, 5900, 87, 'Africa/Lagos'),
(6, 6, 'kkkkkkk', 3, 1, '2023-01-21 14:49:56', '2023-01-21 14:49:56', 0, 0, 20, 99, 'Africa/Lagos'),
(7, 7, 'kkk', 3, 1, '2023-01-25 22:32:33', '2023-01-25 22:32:33', 0, 0, 9997, 90, 'Africa/Lagos'),
(8, 8, 'new test', 3, 1, '2023-01-25 23:00:09', '2023-01-25 23:00:09', 0, 0, 3000, 34, 'Africa/Lagos'),
(9, 9, 'unn', 18, 1, '2023-01-28 21:36:28', '2023-01-28 21:36:28', 0, 0, 2000, 100, 'Africa/Lagos');

-- --------------------------------------------------------

--
-- Table structure for table `facility_locations`
--

CREATE TABLE `facility_locations` (
  `id` int(11) NOT NULL,
  `coordinates_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `address` varchar(1000) NOT NULL,
  `google_address` varchar(1000) NOT NULL,
  `operations_area_constraint` int(11) NOT NULL DEFAULT 30 COMMENT 'in meters',
  `operations_area_constraint_active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `facility_locations`
--

INSERT INTO `facility_locations` (`id`, `coordinates_id`, `created_at`, `updated_at`, `is_deleted`, `is_archived`, `address`, `google_address`, `operations_area_constraint`, `operations_area_constraint_active`) VALUES
(1, 2, '2023-01-06 22:29:46', '2023-01-06 22:29:46', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book', 'VC92+FQ6, Ihe Nsukka 410105, Nsukka, Enugu, Nigeria', 40, 1),
(2, 46, '2023-01-18 13:35:36', '2023-01-18 13:35:36', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'test', 40, 1),
(3, 48, '2023-01-18 13:53:38', '2023-01-18 13:53:38', 0, 0, 'test', 'Q2J7+W2 Ksamil, Albania', 40, 1),
(4, 55, '2023-01-19 17:53:52', '2023-01-19 17:53:52', 0, 0, 'ddfdf', 'test', 40, 1),
(5, 57, '2023-01-21 14:25:03', '2023-01-28 12:02:58', 0, 0, 'JJJJ ooooooooooooo', 'Opposite Nitel Mask Masala / Zuba Gwagwalada, 902101, Madalla, Federal Capital Territory, Nigeria', 40, 1),
(6, 59, '2023-01-21 14:49:56', '2023-01-21 14:49:56', 0, 0, 'iii', 'test', 40, 1),
(7, 61, '2023-01-25 22:32:33', '2023-01-25 22:32:33', 0, 0, 'jjj', 'test', 40, 1),
(8, 63, '2023-01-25 23:00:09', '2023-01-25 23:00:09', 0, 0, 'ddddddd', '4627+RHG, 902101, Madalla, Federal Capital Territory, Nigeria', 40, 1),
(9, 66, '2023-01-28 21:36:28', '2023-01-28 21:36:28', 0, 0, 'While creating a web page or the website via JavaScript, there can be a situation where you want to set a specific text value', 'VC92+FQ6, Ihe Nsukka 410105, Nsukka, Enugu, Nigeria', 100, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `description` varchar(5000) NOT NULL COMMENT 'Information about the job',
  `customer_id` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `job_status` varchar(15) NOT NULL,
  `client_charge` decimal(11,2) NOT NULL,
  `staff_charge` decimal(11,2) NOT NULL COMMENT 'Payment per hour',
  `job_type` varchar(15) DEFAULT NULL COMMENT 'Enums:\ninstant\nongoing\ntemporal\npermanent',
  `payment_status` char(30) NOT NULL,
  `max_check_in_time` int(30) NOT NULL,
  `time_zone` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `description`, `customer_id`, `facility_id`, `created_by_id`, `job_status`, `client_charge`, `staff_charge`, `job_type`, `payment_status`, `max_check_in_time`, `time_zone`, `created_at`, `updated_at`, `is_deleted`, `is_archived`) VALUES
(1, 'jbjbjb', 1, 1, 1, 'COMPLETED', '3000.00', '89.00', 'ONGOING', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-06 22:32:53', '2023-01-06 22:32:53', 0, 0),
(2, 'hhhhhhhhhhhhhh', 1, 1, 1, 'PENDING', '3000.00', '89.00', 'TEMPORAL', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-08 13:48:23', '2023-01-08 13:48:23', 0, 0),
(3, 'jsjsjs', 1, 1, 1, 'PENDING', '3000.00', '89.00', 'PERMANENT', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-08 14:30:13', '2023-01-08 14:30:13', 0, 0),
(4, 'A job to watch the surrounding premises', 1, 1, 28, 'COMPLETED', '20000.00', '100.00', 'INSTANT', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-11 22:35:58', '2023-01-11 22:35:58', 0, 0),
(5, 'A job to watch the surrounding premises', 1, 1, 28, 'COMPLETED', '3000.00', '89.00', 'INSTANT', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-17 10:13:06', '2023-01-17 10:13:06', 0, 0),
(6, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the', 3, 4, 1, 'ACTIVE', '2000.00', '34.00', 'TEMPORAL', 'Paid', 60, 'Europe/Amsterdam', '2023-01-23 17:51:35', '2023-01-23 17:51:35', 0, 0),
(7, 'kdkdkd', 3, 5, 1, 'ACTIVE', '59.00', '87.00', 'PERMANENT', 'Paid', 60, 'Europe/Amsterdam', '2023-01-24 13:47:13', '2023-01-24 13:47:13', 0, 0),
(8, 'knkknknknkkkkknkknknn', 3, 6, 1, 'COMPLETED', '20.00', '99.00', 'INSTANT', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-24 15:32:26', '2023-01-24 15:32:26', 0, 0),
(9, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', 1, 1, 1, 'ACTIVE', '3000.00', '89.00', 'INSTANT', 'Awaiting Payment', 60, 'Europe/Amsterdam', '2023-01-28 16:38:08', '2023-01-28 16:38:08', 0, 0),
(10, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', 18, 9, 1, 'PENDING', '2000.00', '100.00', 'TEMPORAL', 'Paid', 60, 'Europe/Amsterdam', '2023-01-28 21:40:51', '2023-01-28 21:40:51', 0, 0),
(11, 'ss', 18, 9, 1, 'PENDING', '2000.00', '100.00', 'ONGOING', 'Paid', 60, 'Europe/Amsterdam', '2023-01-28 22:30:42', '2023-01-28 22:30:42', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `job_logs`
--

CREATE TABLE `job_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `message` char(30) NOT NULL,
  `check_in_time` varchar(15) NOT NULL,
  `check_out_time` varchar(15) NOT NULL,
  `job_id` int(11) NOT NULL,
  `guard_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `check_in_status` tinyint(1) NOT NULL,
  `check_out_status` tinyint(1) NOT NULL,
  `coordinates_id` int(11) NOT NULL,
  `check_in_date` datetime NOT NULL,
  `check_out_date` datetime NOT NULL,
  `project_check_in_date` datetime DEFAULT NULL,
  `schedule_id` int(11) NOT NULL,
  `hours_worked` double NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `job_logs`
--

INSERT INTO `job_logs` (`id`, `message`, `check_in_time`, `check_out_time`, `job_id`, `guard_id`, `created_at`, `check_in_status`, `check_out_status`, `coordinates_id`, `check_in_date`, `check_out_date`, `project_check_in_date`, `schedule_id`, `hours_worked`, `updated_at`) VALUES
(1, 'in location', '10:00:00 am', '08:59:00 pm', 1, 28, '2023-01-10 10:23:59', 1, 1, 4, '2023-01-06 09:00:00', '2023-01-06 19:59:00', '2023-01-05 23:00:00', 1, 10.98, '2023-01-10 15:17:37'),
(2, 'in location', '12:00:00 am', '08:59:00 pm', 1, 28, '2023-01-10 10:29:22', 1, 1, 5, '2023-01-06 23:00:00', '2023-01-07 19:59:00', '2023-01-06 23:00:00', 2, 20.98, '2023-01-10 22:15:58'),
(3, 'in location', '06:39:00 pm', '04:41:00 pm', 1, 29, '2023-01-10 17:03:27', 1, 1, 6, '2023-01-09 17:39:00', '2023-01-10 15:41:00', '2023-01-09 17:39:00', 8, 22.03, '2023-01-10 17:03:36'),
(4, 'in location', '04:36:00 pm', '05:34:00 pm', 4, 28, '2023-01-12 20:48:57', 1, 1, 7, '2022-12-03 15:36:00', '2022-12-04 16:34:00', '2022-12-03 15:36:00', 11, 24.97, '2023-01-12 20:49:04'),
(5, 'not in location', '11:49:52 am', '0', 5, 29, '2023-01-17 10:49:52', 0, 0, 8, '2023-01-17 10:49:52', '2023-01-17 10:49:52', '2023-01-17 10:49:52', 0, 0, '2023-01-17 10:49:52'),
(6, 'not in location', '11:50:12 am', '0', 5, 29, '2023-01-17 10:50:12', 0, 0, 11, '2023-01-17 10:50:12', '2023-01-17 10:50:12', '2023-01-17 10:50:12', 0, 0, '2023-01-17 10:50:12'),
(7, 'not in location', '12:08:20 pm', '12:08:20 pm', 5, 29, '2023-01-17 11:08:20', 0, 0, 18, '2023-01-17 11:08:20', '2023-01-17 11:08:20', '2023-01-17 11:08:20', 0, 0, '2023-01-17 11:08:20'),
(8, 'not in location', '12:08:48 pm', '12:08:48 pm', 5, 29, '2023-01-17 11:08:48', 0, 0, 19, '2023-01-17 11:08:48', '2023-01-17 11:08:48', '2023-01-17 11:08:48', 0, 0, '2023-01-17 11:08:48'),
(9, 'not in location', '12:11:05 pm', '12:11:05 pm', 5, 29, '2023-01-17 11:11:05', 0, 0, 20, '2023-01-17 11:11:05', '2023-01-17 11:11:05', '2023-01-17 11:11:05', 0, 0, '2023-01-17 11:11:05'),
(10, 'not in location', '12:11:09 pm', '0', 5, 29, '2023-01-17 11:11:09', 0, 0, 21, '2023-01-17 11:11:09', '2023-01-17 11:11:09', '2023-01-17 11:11:09', 0, 0, '2023-01-17 11:11:09'),
(11, 'not in location', '05:41:48 pm', '05:41:48 pm', 5, 29, '2023-01-17 16:41:48', 0, 0, 22, '2023-01-17 16:41:48', '2023-01-17 16:41:48', '2023-01-17 16:41:48', 0, 0, '2023-01-17 16:41:48'),
(12, 'not in location', '05:41:53 pm', '0', 5, 29, '2023-01-17 16:41:53', 0, 0, 23, '2023-01-17 16:41:53', '2023-01-17 16:41:53', '2023-01-17 16:41:53', 0, 0, '2023-01-17 16:41:53'),
(13, 'not in location', '05:58:23 pm', '0', 5, 29, '2023-01-17 16:58:23', 0, 0, 24, '2023-01-17 16:58:23', '2023-01-17 16:58:23', '2023-01-17 16:58:23', 0, 0, '2023-01-17 16:58:23'),
(14, 'not in location', '05:51:24 pm', '0', 3, 29, '2023-01-19 16:51:24', 0, 0, 51, '2023-01-19 16:51:24', '2023-01-19 16:51:24', '2023-01-19 16:51:24', 0, 0, '2023-01-19 16:51:24'),
(15, 'in location', '07:38:00 pm', '05:42:00 pm', 9, 51, '2023-01-28 16:41:42', 1, 1, 64, '2023-01-28 18:38:00', '2023-02-03 16:42:00', '2023-01-28 18:38:00', 67, 142.07, '2023-01-28 16:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `job_operations`
--

CREATE TABLE `job_operations` (
  `id` int(11) NOT NULL,
  `checked_in` datetime DEFAULT NULL,
  `checked_out` datetime DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `check_in_coordinates_id` int(11) DEFAULT NULL,
  `schedule_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `check_out_coordinates_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_reports`
--

CREATE TABLE `job_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_id` int(11) NOT NULL,
  `guard_id` int(11) NOT NULL,
  `message` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_emergency` tinyint(1) NOT NULL DEFAULT 0,
  `file_url` longtext NOT NULL,
  `report_type` char(15) NOT NULL,
  `who_has_it` char(15) NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `mime_type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_report_attachments`
--

CREATE TABLE `job_report_attachments` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_report_id` int(10) UNSIGNED NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_security_code`
--

CREATE TABLE `job_security_code` (
  `id` int(11) UNSIGNED NOT NULL,
  `agenda_id` int(11) NOT NULL,
  `guard_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `security_code` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `job_security_code`
--

INSERT INTO `job_security_code` (`id`, `agenda_id`, `guard_id`, `job_id`, `security_code`, `created_at`, `updated_at`) VALUES
(1, 1, 28, 1, 'FriJan06202300:00:00GMT+0100(WestAfricaStandardTim', '2023-01-06 23:54:29', '2023-01-06 23:54:29'),
(2, 2, 29, 1, 'FriJan06202300:00:00GMT+0100(WestAfricaStandardTim', '2023-01-06 23:54:29', '2023-01-06 23:54:29'),
(3, 3, 28, 1, 'SunJan08202313:36:00GMT+0100(WestAfricaStandardTim', '2023-01-06 23:54:29', '2023-01-06 23:54:29'),
(4, 4, 29, 1, 'SunJan08202313:36:00GMT+0100(WestAfricaStandardTim', '2023-01-06 23:54:29', '2023-01-06 23:54:29'),
(5, 13, 29, 5, 'TueJan17202312:47:00GMT+0100(WestAfricaStandardTim', '2023-01-17 20:52:34', '2023-01-17 20:52:34'),
(6, 14, 29, 5, 'WedJan18202312:47:00GMT+0100(WestAfricaStandardTim', '2023-01-17 20:52:34', '2023-01-17 20:52:34'),
(7, 15, 29, 5, 'ThuJan19202300:00:00GMT+0100(WestAfricaStandardTim', '2023-01-17 20:52:34', '2023-01-17 20:52:34'),
(8, 16, 29, 3, 'ThuJan19202319:54:00GMT+0100(WestAfricaStandardTim', '2023-01-19 16:56:45', '2023-01-19 16:56:45'),
(9, 17, 29, 3, 'SatJan21202319:54:00GMT+0100(WestAfricaStandardTim', '2023-01-19 16:56:45', '2023-01-19 16:56:45'),
(10, 18, 29, 3, 'MonJan23202319:54:00GMT+0100(WestAfricaStandardTim', '2023-01-19 16:56:45', '2023-01-19 16:56:45'),
(21, 87, 51, 9, 'WedFeb01202317:42:00GMT+0100(WestAfricaStandardTim', '2023-01-28 16:41:03', '2023-01-28 16:41:03');

-- --------------------------------------------------------

--
-- Table structure for table `licenses`
--

CREATE TABLE `licenses` (
  `id` int(10) UNSIGNED NOT NULL,
  `staff_id` int(11) NOT NULL,
  `license` varchar(150) NOT NULL COMMENT 'link to license file',
  `expires_in` date DEFAULT NULL,
  `time_zone` varchar(30) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `licenses`
--

INSERT INTO `licenses` (`id`, `staff_id`, `license`, `expires_in`, `time_zone`, `approved`, `created_at`, `updated_at`, `is_archived`) VALUES
(9, 29, 'http://localhost:3000\\images\\files\\file-1673973448333-7550765-birthCertificate.pdf', '2023-01-12', 'Europe/Amsterdam', 1, '2023-01-17 16:35:14', '2023-01-28 06:09:47', 0);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `address` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Admin location';

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `created_at`, `updated_at`, `is_archived`, `is_deleted`, `address`) VALUES
(1, '2023-01-06 22:58:01', '2023-01-06 22:58:01', 0, 0, 'my address'),
(2, '2023-01-06 22:24:32', '2023-01-06 22:24:32', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, '),
(3, '2023-01-06 22:29:46', '2023-01-06 22:29:46', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'),
(4, '2023-01-06 22:30:17', '2023-01-06 22:30:17', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, '),
(5, '2023-01-06 22:30:56', '2023-01-06 22:30:56', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(6, '2023-01-17 10:04:08', '2023-01-17 10:04:08', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(7, '2023-01-18 12:28:45', '2023-01-18 12:28:45', 0, 0, 'test addres'),
(8, '2023-01-18 13:35:36', '2023-01-18 13:35:36', 0, 0, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'),
(9, '2023-01-18 13:53:38', '2023-01-18 13:53:38', 0, 0, 'test'),
(10, '2023-01-19 17:53:52', '2023-01-19 17:53:52', 0, 0, 'ddfdf'),
(11, '2023-01-21 14:25:03', '2023-01-21 14:25:03', 0, 0, 'JJJJ'),
(12, '2023-01-21 14:49:56', '2023-01-21 14:49:56', 0, 0, 'iii'),
(13, '2023-01-21 21:01:01', '2023-01-21 21:01:01', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(14, '2023-01-23 07:42:38', '2023-01-23 07:42:38', 0, 0, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?'),
(15, '2023-01-24 14:21:40', '2023-01-24 14:21:40', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(16, '2023-01-25 22:32:33', '2023-01-25 22:32:33', 0, 0, 'jjj'),
(17, '2023-01-25 23:00:09', '2023-01-25 23:00:09', 0, 0, 'ddddddd'),
(18, '2023-01-26 14:35:59', '2023-01-26 14:35:59', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(19, '2023-01-26 15:10:01', '2023-01-26 15:10:01', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(20, '2023-01-26 15:12:32', '2023-01-26 15:12:32', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(21, '2023-01-26 15:14:12', '2023-01-26 15:14:12', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(22, '2023-01-26 15:15:46', '2023-01-26 15:15:46', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(23, '2023-01-26 15:16:26', '2023-01-26 15:16:26', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(24, '2023-01-26 15:17:26', '2023-01-26 15:17:26', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(25, '2023-01-26 15:18:00', '2023-01-26 15:18:00', 0, 0, 'Jaymola Close Ministers Hill zuba new'),
(26, '2023-01-26 22:12:33', '2023-01-26 22:12:33', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(27, '2023-01-27 10:24:14', '2023-01-27 10:24:14', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(28, '2023-01-27 10:26:14', '2023-01-27 10:26:14', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(29, '2023-01-27 10:26:41', '2023-01-27 10:26:41', 0, 0, 'Jaymola jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'),
(30, '2023-01-27 10:27:08', '2023-01-27 10:27:08', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(31, '2023-01-27 10:27:26', '2023-01-27 10:27:26', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(32, '2023-01-27 10:28:00', '2023-01-27 10:28:00', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(33, '2023-01-27 10:34:33', '2023-01-27 10:34:33', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(34, '2023-01-27 10:34:53', '2023-01-27 10:34:53', 0, 0, 'Jaymola Close Ministers Hill zuballlllllllllllllll'),
(35, '2023-01-27 10:35:09', '2023-01-27 10:35:09', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(36, '2023-01-27 10:35:29', '2023-01-27 10:35:29', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(37, '2023-01-27 10:35:56', '2023-01-27 10:35:56', 0, 0, 'Jaymola Close ppppppppppppppppppppppa'),
(38, '2023-01-27 10:46:55', '2023-01-27 10:46:55', 0, 0, 'Jaymola Close Ministers Hill'),
(39, '2023-01-27 14:39:05', '2023-01-27 14:39:05', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(40, '2023-01-27 14:39:22', '2023-01-27 14:39:22', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(41, '2023-01-27 14:39:29', '2023-01-27 14:39:29', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(42, '2023-01-27 14:40:05', '2023-01-27 14:40:05', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(43, '2023-01-27 14:40:15', '2023-01-27 14:40:15', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(44, '2023-01-27 14:45:09', '2023-01-27 14:45:09', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(45, '2023-01-27 14:45:21', '2023-01-27 14:45:21', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(46, '2023-01-27 14:45:29', '2023-01-27 14:45:29', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(47, '2023-01-28 16:00:39', '2023-01-28 16:00:39', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(48, '2023-01-28 16:01:18', '2023-01-28 16:01:18', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(49, '2023-01-28 16:01:31', '2023-01-28 16:01:31', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(50, '2023-01-28 16:06:21', '2023-01-28 16:06:21', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(51, '2023-01-28 16:16:10', '2023-01-28 16:16:10', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(52, '2023-01-28 16:16:35', '2023-01-28 16:16:35', 0, 0, 'Jaymola Close Ministers Hill zuba'),
(53, '2023-01-28 21:36:28', '2023-01-28 21:36:28', 0, 0, 'While creating a web page or the website via JavaScript, there can be a situation where you want to set a specific text value');

-- --------------------------------------------------------

--
-- Table structure for table `location_check_operations`
--

CREATE TABLE `location_check_operations` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_operations_id` int(11) NOT NULL,
  `coordinates_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `memo`
--

CREATE TABLE `memo` (
  `id` int(11) NOT NULL,
  `memo_message` longtext NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `time_zone` varchar(30) NOT NULL,
  `send_date` datetime NOT NULL,
  `is_delivered` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `memo`
--

INSERT INTO `memo` (`id`, `memo_message`, `created_by_id`, `time_zone`, `send_date`, `is_delivered`, `created_at`, `updated_at`, `is_archived`) VALUES
(22, '<p><strong style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</strong><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p><p>1.beans</p><p>2.rice</p><p><br></p><p><br></p>', 1, 'Europe/Amsterdam', '2023-01-17 22:22:01', 0, '2023-01-17 22:22:01', '2023-01-17 22:22:01', 0),
(23, '<p><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,<b> when an unknown printer took a galley of type and </b>scrambled it to <strike>make </strike>a type specimen book.</span></p><p><br></p><p><br></p>', 1, 'Europe/Amsterdam', '2023-01-17 22:22:32', 0, '2023-01-17 22:22:32', '2023-01-17 22:22:32', 0),
(24, '<p><strong style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</strong><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,</span><br></p>', 1, 'Europe/Amsterdam', '2023-01-22 13:52:37', 0, '2023-01-22 13:52:37', '2023-01-22 13:52:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `memo_receivers`
--

CREATE TABLE `memo_receivers` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `memo_id` int(11) NOT NULL,
  `reply_message` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `memo_receivers`
--

INSERT INTO `memo_receivers` (`id`, `staff_id`, `memo_id`, `reply_message`, `created_at`, `updated_at`, `is_archived`) VALUES
(35, 29, 22, 'ok', '2023-01-17 22:22:01', '2023-01-18 10:28:41', 0),
(36, 28, 22, '', '2023-01-17 22:22:01', '2023-01-17 22:22:01', 0),
(37, 29, 23, 'i was not the one ', '2023-01-17 22:22:32', '2023-01-18 07:43:11', 0),
(38, 28, 23, '', '2023-01-17 22:22:32', '2023-01-17 22:22:32', 0),
(39, 29, 24, 'ok jbhbhhbhbh', '2023-01-22 13:52:37', '2023-01-23 17:53:59', 0);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset`
--

CREATE TABLE `password_reset` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `reset_key` varchar(30) NOT NULL,
  `expires_in` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_used` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `password_reset`
--

INSERT INTO `password_reset` (`id`, `user_id`, `reset_key`, `expires_in`, `created_at`, `is_used`) VALUES
(1, 29, 'hCEbNBLrtoBk8', '2023-01-17 17:07:35', '2023-01-14 10:48:41', 0),
(2, 39, 'zK021JVtQzW6n', '2023-01-27 05:43:52', '2023-01-26 20:34:55', 0);

-- --------------------------------------------------------

--
-- Table structure for table `scan_operations`
--

CREATE TABLE `scan_operations` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_operations_id` int(11) NOT NULL,
  `coordinates_id` int(11) NOT NULL,
  `scanned_code` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `start_time` varchar(15) NOT NULL,
  `end_time` varchar(15) NOT NULL,
  `job_id` int(11) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `schedule_length` varchar(15) NOT NULL DEFAULT 'LIMITED' COMMENT 'Enums:\nlimited\ncontinuous',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `max_check_in_time` int(11) NOT NULL DEFAULT 15 COMMENT 'Maximum time to check in after scheduled start time for a job (in minutes)',
  `check_in_date` datetime NOT NULL,
  `check_out_date` datetime NOT NULL,
  `status_per_staff` char(15) NOT NULL,
  `guard_id` int(11) NOT NULL,
  `schedule_accepted_by_admin` tinyint(1) NOT NULL,
  `settlement_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `start_time`, `end_time`, `job_id`, `created_by_id`, `schedule_length`, `created_at`, `updated_at`, `is_deleted`, `is_archived`, `max_check_in_time`, `check_in_date`, `check_out_date`, `status_per_staff`, `guard_id`, `schedule_accepted_by_admin`, `settlement_status`) VALUES
(1, '12:00:00 am', '08:59:00 pm', 1, 1, 'LIMITED', '2023-01-06 22:38:03', '2023-01-14 15:33:19', 0, 0, 20, '2023-01-05 23:00:00', '2023-01-06 19:59:00', 'ACTIVE', 28, 1, 0),
(2, '12:00:00 am', '08:59:00 pm', 1, 1, 'LIMITED', '2023-01-06 22:38:03', '2023-01-12 20:39:43', 0, 0, 20, '2023-01-06 23:00:00', '2023-01-07 19:59:00', 'ACTIVE', 28, 1, 0),
(3, '12:00:00 am', '08:59:00 pm', 1, 1, 'LIMITED', '2023-01-06 22:38:03', '2023-01-12 20:39:19', 0, 0, 20, '2023-01-07 23:00:00', '2023-01-08 19:59:00', 'ACTIVE', 28, 1, 0),
(4, '12:00:00 am', '08:59:00 pm', 1, 1, 'LIMITED', '2023-01-06 22:38:03', '2023-01-14 15:33:15', 0, 0, 20, '2023-01-05 23:00:00', '2023-01-06 19:59:00', 'ACTIVE', 29, 1, 0),
(5, '12:00:00 am', '08:59:00 pm', 1, 1, 'LIMITED', '2023-01-06 22:38:03', '2023-01-12 20:40:00', 0, 0, 20, '2023-01-06 23:00:00', '2023-01-07 19:59:00', 'ACTIVE', 29, 1, 0),
(6, '12:00:00 am', '08:59:00 pm', 1, 1, 'LIMITED', '2023-01-06 22:38:03', '2023-01-12 20:40:02', 0, 0, 20, '2023-01-07 23:00:00', '2023-01-08 19:59:00', 'ACTIVE', 29, 1, 0),
(7, '06:39:00 pm', '04:41:00 pm', 1, 1, 'LIMITED', '2023-01-08 15:40:04', '2023-01-12 20:39:40', 0, 0, 20, '2023-01-09 17:39:00', '2023-01-10 15:41:00', 'ACTIVE', 28, 1, 0),
(8, '06:39:00 pm', '04:41:00 pm', 1, 1, 'LIMITED', '2023-01-08 15:40:04', '2023-01-12 20:40:03', 0, 0, 20, '2023-01-09 17:39:00', '2023-01-10 15:41:00', 'ACTIVE', 29, 1, 0),
(9, '02:25:00 pm', '11:27:00 pm', 1, 1, 'LIMITED', '2023-01-10 22:36:31', '2023-01-12 20:39:47', 0, 0, 20, '2023-01-11 13:25:00', '2023-01-12 22:27:00', 'ACTIVE', 28, 1, 0),
(10, '02:25:00 pm', '11:27:00 pm', 1, 1, 'LIMITED', '2023-01-10 22:36:31', '2023-01-12 20:40:05', 0, 0, 20, '2023-01-11 13:25:00', '2023-01-12 22:27:00', 'ACTIVE', 29, 1, 0),
(11, '04:36:00 pm', '05:34:00 pm', 4, 28, 'LIMITED', '2023-01-11 22:35:58', '2023-01-12 20:51:03', 0, 0, 20, '2022-12-03 15:36:00', '2022-12-04 16:34:00', 'ACTIVE', 28, 1, 0),
(12, '01:45:00 pm', '09:48:00 pm', 4, 1, 'LIMITED', '2023-01-12 20:46:41', '2023-01-14 16:20:28', 0, 0, 20, '2023-01-12 12:45:00', '2023-01-25 20:48:00', 'ACTIVE', 28, 1, 0),
(13, '12:12:00 am', '12:13:00 am', 5, 29, 'LIMITED', '2023-01-17 10:13:06', '2023-01-17 10:13:06', 0, 0, 20, '2023-01-16 23:12:00', '2023-01-18 23:13:00', 'ACTIVE', 29, 0, 0),
(14, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-19 16:41:46', '2023-01-22 15:18:00', 0, 0, 20, '2023-01-18 23:00:00', '2023-01-19 22:59:00', 'ACTIVE', 29, 1, 0),
(15, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-19 16:41:46', '2023-01-19 16:41:46', 0, 0, 20, '2023-01-20 23:00:00', '2023-01-21 22:59:00', 'ACTIVE', 29, 1, 0),
(16, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-19 16:41:46', '2023-01-19 16:41:46', 0, 0, 20, '2023-01-22 23:00:00', '2023-01-23 22:59:00', 'ACTIVE', 29, 1, 0),
(17, '04:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-22 23:13:42', '2023-01-22 23:13:42', 0, 0, 20, '2023-01-24 03:00:00', '2023-01-24 22:59:00', 'ACTIVE', 28, 1, 0),
(18, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-22 23:13:42', '2023-01-22 23:13:42', 0, 0, 20, '2023-01-25 23:00:00', '2023-01-26 22:59:00', 'ACTIVE', 28, 1, 0),
(19, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-22 23:13:42', '2023-01-22 23:13:42', 0, 0, 20, '2023-01-28 23:00:00', '2023-01-29 22:59:00', 'ACTIVE', 28, 1, 0),
(20, '04:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-22 23:13:42', '2023-01-22 23:13:42', 0, 0, 20, '2023-01-24 03:00:00', '2023-01-24 22:59:00', 'ACTIVE', 29, 1, 0),
(21, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-22 23:13:42', '2023-01-22 23:13:42', 0, 0, 20, '2023-01-25 23:00:00', '2023-01-26 22:59:00', 'ACTIVE', 29, 1, 0),
(22, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-22 23:13:42', '2023-01-22 23:13:42', 0, 0, 20, '2023-01-28 23:00:00', '2023-01-29 22:59:00', 'ACTIVE', 29, 1, 0),
(26, '03:42:00 pm', '03:44:00 pm', 2, 1, 'LIMITED', '2023-01-23 10:01:57', '2023-01-23 10:01:57', 0, 0, 20, '2022-12-03 15:36:00', '2022-12-04 16:34:00', 'PENDING', 28, 1, 0),
(27, '03:42:00 pm', '03:44:00 pm', 2, 1, 'LIMITED', '2023-01-23 10:02:39', '2023-01-23 10:02:39', 0, 0, 20, '2022-12-03 15:36:00', '2022-12-04 16:34:00', 'PENDING', 2, 1, 0),
(54, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-23 18:59:52', '2023-01-23 18:59:52', 0, 0, 20, '2023-01-28 23:00:00', '2023-01-29 22:59:00', 'ACTIVE', 31, 1, 0),
(55, '12:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-23 18:59:52', '2023-01-23 18:59:52', 0, 0, 20, '2023-01-25 23:00:00', '2023-01-26 22:59:00', 'ACTIVE', 31, 1, 0),
(56, '04:00:00 am', '11:59:00 pm', 3, 1, 'LIMITED', '2023-01-23 18:59:52', '2023-01-23 18:59:52', 0, 0, 20, '2023-01-24 03:00:00', '2023-01-24 22:59:00', 'ACTIVE', 31, 1, 0),
(64, '07:43:00 pm', '04:46:00 pm', 8, 1, 'LIMITED', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 0, 0, 20, '2023-01-24 18:43:00', '2023-01-26 15:46:00', 'PENDING', 31, 1, 0),
(65, '07:43:00 pm', '04:46:00 pm', 8, 1, 'LIMITED', '2023-01-24 16:52:48', '2023-01-24 16:52:48', 0, 0, 20, '2023-01-24 18:43:00', '2023-01-26 15:46:00', 'PENDING', 32, 1, 0),
(66, '09:55:00 pm', '05:00:00 pm', 8, 1, 'LIMITED', '2023-01-24 16:55:28', '2023-01-24 16:55:28', 0, 0, 20, '2023-01-25 20:55:00', '2023-01-28 16:00:00', 'PENDING', 29, 1, 0),
(67, '07:38:00 pm', '05:42:00 pm', 9, 1, 'LIMITED', '2023-01-28 16:38:46', '2023-01-28 16:38:46', 0, 0, 20, '2023-01-28 18:38:00', '2023-02-03 16:42:00', 'PENDING', 51, 1, 0),
(68, '05:46:00 pm', '05:44:00 pm', 9, 1, 'LIMITED', '2023-01-28 16:43:04', '2023-01-28 16:43:04', 0, 0, 20, '2023-02-04 16:46:00', '2023-02-09 16:44:00', 'PENDING', 28, 1, 0),
(69, '06:54:00 pm', '03:59:00 pm', 10, 1, 'LIMITED', '2023-01-29 14:50:48', '2023-01-29 14:50:48', 0, 0, 20, '2023-01-29 17:54:00', '2023-02-08 14:59:00', 'PENDING', 29, 1, 0),
(70, '06:54:00 pm', '03:59:00 pm', 10, 1, 'LIMITED', '2023-01-29 14:50:48', '2023-01-29 14:50:48', 0, 0, 20, '2023-01-29 17:54:00', '2023-02-08 14:59:00', 'PENDING', 52, 1, 0),
(71, '06:54:00 pm', '03:59:00 pm', 10, 1, 'LIMITED', '2023-01-29 15:17:40', '2023-01-29 15:17:40', 0, 0, 20, '2023-01-29 17:54:00', '2023-02-08 14:59:00', 'PENDING', 32, 1, 0),
(72, '12:00:00 am', '11:59:00 pm', 9, 1, 'LIMITED', '2023-01-29 16:03:29', '2023-01-29 16:03:29', 0, 0, 20, '2023-01-28 23:00:00', '2023-01-29 22:59:00', 'PENDING', 29, 1, 0),
(73, '12:00:00 am', '11:59:00 pm', 9, 1, 'LIMITED', '2023-01-29 16:03:29', '2023-01-29 16:03:29', 0, 0, 20, '2023-01-30 23:00:00', '2023-01-31 22:59:00', 'PENDING', 29, 1, 0),
(74, '12:00:00 am', '11:59:00 pm', 9, 1, 'LIMITED', '2023-01-29 16:03:29', '2023-01-29 16:03:29', 0, 0, 20, '2023-02-01 23:00:00', '2023-02-02 22:59:00', 'PENDING', 29, 1, 0),
(75, '12:00:00 am', '11:59:00 pm', 9, 1, 'LIMITED', '2023-01-29 16:03:29', '2023-01-29 16:03:29', 0, 0, 20, '2023-02-04 23:00:00', '2023-02-05 22:59:00', 'PENDING', 29, 1, 0),
(76, '09:10:00 am', '08:10:00 pm', 9, 1, 'LIMITED', '2023-01-29 17:10:34', '2023-01-29 17:10:34', 0, 0, 20, '2023-02-07 08:10:00', '2023-02-07 19:10:00', 'PENDING', 29, 1, 0),
(77, '08:48:00 am', '12:49:00 pm', 9, 1, 'LIMITED', '2020-01-29 18:49:38', '2020-01-29 18:49:38', 0, 0, 20, '2022-02-09 07:48:00', '2022-02-12 11:49:00', 'PENDING', 29, 1, 0),
(78, '08:51:00 am', '08:51:00 pm', 9, 1, 'LIMITED', '2020-01-29 18:53:24', '2020-01-29 18:53:24', 0, 0, 20, '2023-02-20 07:51:00', '2023-02-20 19:51:00', 'PENDING', 29, 1, 0),
(79, '04:19:00 am', '04:16:00 pm', 9, 1, 'LIMITED', '2023-01-29 21:17:34', '2023-01-29 21:17:34', 0, 0, 20, '2023-03-13 03:19:00', '2023-03-13 15:16:00', 'PENDING', 29, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `security_check_log`
--

CREATE TABLE `security_check_log` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `guard_id` int(11) NOT NULL,
  `coordinates_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `security_check_log`
--

INSERT INTO `security_check_log` (`id`, `job_id`, `guard_id`, `coordinates_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 28, 3, 0, '2023-01-06', '2023-01-06'),
(2, 5, 29, 43, 0, '2023-01-18', '2023-01-18'),
(3, 5, 29, 44, 0, '2023-01-18', '2023-01-18'),
(4, 3, 29, 49, 0, '2023-01-19', '2023-01-19'),
(5, 3, 29, 50, 0, '2023-01-19', '2023-01-19'),
(6, 3, 29, 52, 0, '2023-01-19', '2023-01-19'),
(7, 3, 29, 53, 0, '2023-01-19', '2023-01-19');

-- --------------------------------------------------------

--
-- Table structure for table `shift_comments`
--

CREATE TABLE `shift_comments` (
  `id` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `time_zone` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shift_comments`
--

INSERT INTO `shift_comments` (`id`, `comment`, `created_by_id`, `schedule_id`, `time_zone`, `created_at`, `updated_at`, `is_archived`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galle', 1, 67, 'Europe/Amsterdam', '2023-01-29 16:13:54', '2023-01-29 16:13:54', 0),
(2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard', 1, 67, 'Europe/Amsterdam', '2023-01-29 19:10:32', '2023-01-29 19:10:32', 0),
(3, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy', 1, 68, 'Europe/Amsterdam', '2023-01-29 20:11:12', '2023-01-29 20:11:12', 0),
(4, 'he refuse to chrckin in on time ', 1, 73, 'Europe/Amsterdam', '2023-01-29 20:34:40', '2023-01-29 20:34:40', 0),
(5, 'he had an emergency', 1, 67, 'Europe/Amsterdam', '2023-01-29 20:39:25', '2023-01-29 20:39:25', 0),
(6, 'injnubuububyby', 1, 67, 'Europe/Amsterdam', '2023-01-29 20:56:33', '2023-01-29 20:56:33', 0);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(15) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_logged_in` date NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/fyb-security.appspot.com/o/avatar.png?alt=media&token=9fb3fd47-a469-4e1f-9bb3-59b299e1d917'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Database for users of services on the platform';

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL,
  `month` int(11) NOT NULL COMMENT '1 - January\n12 - December',
  `year` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `value` int(11) NOT NULL,
  `stat_type` varchar(15) NOT NULL COMMENT 'Enum:\n''CUSTOMER_SIGNIN'',\n''CUSTOMER_SIGNUP'',\n''GUARD_SIGNIN'',\n''GUARD_SIGNUP'',\n''STAFF_SIGNIN'',\n''STAFF_SIGNUP'',\n''JOB'',\n''JOB_REQUEST'',\n''TRANSACTION'''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`id`, `month`, `year`, `created_at`, `updated_at`, `is_deleted`, `is_archived`, `value`, `stat_type`) VALUES
(1, 1, 2023, '2023-01-06 22:23:27', '2023-01-29 12:53:07', 0, 0, 118, 'STAFF_SIGNIN'),
(2, 1, 2023, '2023-01-06 22:24:32', '2023-01-28 16:00:40', 0, 0, 18, 'CUSTOMER_SIGNUP'),
(3, 1, 2023, '2023-01-06 22:30:17', '2023-01-28 16:16:35', 0, 0, 6, 'GUARD_SIGNUP'),
(4, 1, 2023, '2023-01-13 18:53:21', '2023-01-24 15:38:26', 0, 0, 19, 'GUARD_SIGNIN'),
(5, 1, 2023, '2023-01-21 21:01:02', '2023-01-28 16:06:21', 0, 0, 19, 'STAFF_SIGNUP');

-- --------------------------------------------------------

--
-- Table structure for table `suspension_comments`
--

CREATE TABLE `suspension_comments` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_archived` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suspension_comments`
--

INSERT INTO `suspension_comments` (`id`, `admin_id`, `user_id`, `comment`, `created_at`, `updated_at`, `is_archived`) VALUES
(1, 1, 38, 'he has refuse to do his work', '2023-01-26 22:06:32', '2023-01-26 22:06:32', 0),
(2, 1, 37, 'NJJJJJJJJJJJ', '2023-01-26 22:18:19', '2023-01-26 22:18:19', 0),
(3, 1, 39, 'ndjdjdjjd', '2023-01-27 13:07:25', '2023-01-27 13:07:25', 0),
(4, 1, 36, 'kskkkkkkkkkkkkkkkkkkkkkk', '2023-01-27 13:10:05', '2023-01-27 13:10:05', 0),
(5, 1, 35, 'kskkkkkkkkkkkkkkkkkkkkkk', '2023-01-27 13:10:15', '2023-01-27 13:10:15', 0),
(6, 1, 34, 'JSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', '2023-01-27 13:18:52', '2023-01-27 13:18:52', 0),
(7, 1, 33, 'SJJJJJJJJJJJJ', '2023-01-27 13:19:10', '2023-01-27 13:19:10', 0),
(8, 1, 30, 'ldldldddddddddddddddddddddd', '2023-01-27 13:55:14', '2023-01-27 13:55:14', 0),
(9, 1, 40, 'llllllllllllllllll', '2023-01-27 14:44:28', '2023-01-27 14:44:28', 0),
(10, 1, 42, 'you yuuuuuuuuuu', '2023-01-27 14:44:39', '2023-01-27 14:44:39', 0),
(11, 1, 44, 'you yuuuuuuuuuu', '2023-01-27 14:44:47', '2023-01-27 14:44:47', 0),
(12, 1, 43, 'you yuuuuuuuuuu', '2023-01-27 14:44:53', '2023-01-27 14:44:53', 0),
(13, 1, 47, 'you rokk  jj', '2023-01-27 14:45:40', '2023-01-27 14:45:40', 0),
(14, 1, 46, 'llllllllllllll', '2023-01-27 14:45:49', '2023-01-27 14:45:49', 0),
(15, 1, 45, 'llllllllllllll', '2023-01-27 14:45:55', '2023-01-27 14:45:55', 0),
(16, 1, 41, 'llllllllllllll', '2023-01-27 14:46:10', '2023-01-27 14:46:10', 0),
(17, 1, 47, 'user has been unsuspened', '2023-01-27 15:01:51', '2023-01-27 15:01:51', 0),
(18, 1, 46, 'user has been unsuspened', '2023-01-27 15:02:02', '2023-01-27 15:02:02', 0),
(19, 1, 45, 'user has been unsuspened', '2023-01-27 15:02:11', '2023-01-27 15:02:11', 0),
(20, 1, 47, 'hhhhhhhhhhhhhhhhhhhhhhhhhhjj      jjj', '2023-01-27 15:02:23', '2023-01-27 15:02:23', 0),
(21, 1, 32, 'aaaaaaaaaaaaaaaaaaaaaaaaa', '2023-01-27 15:31:40', '2023-01-27 15:31:40', 0),
(22, 1, 32, 'aaaaaaaaaaaaaaaaaaaaaaaaa', '2023-01-27 15:31:50', '2023-01-27 15:31:50', 0),
(23, 1, 32, 'jsjsjs', '2023-01-27 15:57:08', '2023-01-27 15:57:08', 0),
(24, 1, 31, 'DSDODODODD  DKD', '2023-01-27 16:11:33', '2023-01-27 16:11:33', 0),
(25, 1, 46, 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', '2023-01-27 16:37:06', '2023-01-27 16:37:06', 0),
(26, 1, 29, 'PPPPPPPPPPPPPPPPPPPPPPPPPPP', '2023-01-27 16:37:21', '2023-01-27 16:37:21', 0),
(27, 1, 28, 'PPPPPPPPPPPPPPPPPPPPPPPPPPP', '2023-01-27 16:37:37', '2023-01-27 16:37:37', 0),
(28, 1, 32, 'user has been unsuspened', '2023-01-27 16:49:56', '2023-01-27 16:49:56', 0),
(29, 1, 31, 'user has been unsuspened', '2023-01-27 16:50:01', '2023-01-27 16:50:01', 0),
(30, 1, 29, 'user has been unsuspened', '2023-01-27 16:50:32', '2023-01-27 16:50:32', 0),
(31, 1, 28, 'user has been unsuspened', '2023-01-27 16:50:35', '2023-01-27 16:50:35', 0),
(32, 1, 32, 'kkkkkkkkkkkkkkkkkkkkkkk', '2023-01-27 16:50:46', '2023-01-27 16:50:46', 0),
(33, 1, 31, 'kkkkkkkkkkkkkkkkkkkkkkk', '2023-01-27 16:50:50', '2023-01-27 16:50:50', 0),
(34, 1, 29, 'kkkkkkkkkkkkkkkkkkkkkkk', '2023-01-27 16:50:54', '2023-01-27 16:50:54', 0),
(35, 1, 28, 'kkkkkkkkkkkkkkkkkkkkkkk', '2023-01-27 16:50:58', '2023-01-27 16:50:58', 0),
(36, 1, 32, 'user has been unsuspened', '2023-01-27 17:21:00', '2023-01-27 17:21:00', 0),
(37, 1, 31, 'user has been unsuspened', '2023-01-27 17:34:44', '2023-01-27 17:34:44', 0),
(38, 1, 29, 'user has been unsuspened', '2023-01-27 17:34:47', '2023-01-27 17:34:47', 0),
(39, 1, 28, 'user has been unsuspened', '2023-01-27 17:34:51', '2023-01-27 17:34:51', 0),
(40, 1, 32, 'lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll', '2023-01-27 17:35:37', '2023-01-27 17:35:37', 0),
(41, 1, 31, 'he was playing dat is bad', '2023-01-28 06:08:07', '2023-01-28 06:08:07', 0),
(42, 1, 31, 'user has been unsuspened', '2023-01-28 06:08:34', '2023-01-28 06:08:34', 0),
(43, 1, 31, 'for testing purpose', '2023-01-28 10:13:23', '2023-01-28 10:13:23', 0),
(44, 1, 52, 'JJJJJJJJJJJJJJJJJJJJ', '2023-01-28 16:16:46', '2023-01-28 16:16:46', 0),
(45, 1, 45, 'mkkkkkkkkkkkkkkkkkkkkk', '2023-01-28 18:27:26', '2023-01-28 18:27:26', 0),
(46, 1, 52, 'user has been unsuspened', '2023-01-28 18:28:15', '2023-01-28 18:28:15', 0),
(47, 1, 32, 'user has been unsuspened', '2023-01-28 18:28:33', '2023-01-28 18:28:33', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(15) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `created_by_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `last_logged_in` date DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(100) NOT NULL,
  `image` varchar(500) NOT NULL DEFAULT 'https://fbyteamschedule.com/fby-security-api/public/images/avatars/fbyDefaultIMG.png',
  `role` varchar(25) DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `suspended` tinyint(1) NOT NULL,
  `can_suspend` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Database for admin & guards of services on the platform';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `date_of_birth`, `gender`, `location_id`, `created_by_id`, `created_at`, `updated_at`, `last_logged_in`, `is_deleted`, `is_archived`, `password`, `image`, `role`, `phone_number`, `availability`, `suspended`, `can_suspend`) VALUES
(1, 'admin', 'admin', 'nigeria-workspace@proton.me', '1999-07-18', 'FEMALE', 1, 0, '2022-12-20 11:44:30', '2022-12-20 11:44:30', NULL, 0, 0, '$2b$10$UDIfVr2hZ4PlIAc2VTqIfe9J0OvTRCEQ7wRD5ujiAXiPWJknxw63a', 'https://fbyteamschedule.com/fby-security-api/public/images/avatars/fbyDefaultIMG.png', 'SUPER_ADMIN', '8184724615', 1, 0, 1),
(28, 'Chinaza', 'Ogbonna', 'mosesogbonna68@gmail.com', '2023-01-23', 'MALE', 4, 1, '2023-01-06 22:30:17', '2023-01-06 22:30:17', NULL, 0, 0, '$2b$10$3IjWnj3OECEF8jKfKqczFuzc6spnjbVQVgMFd3UhbUQyZEpUbo8gS', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'GUARD', '8184724615', 1, 0, 0),
(29, ' moses', 'Ogbonna', 'test@test.com', '2023-01-28', 'FEMALE', 5, 1, '2023-01-06 22:30:56', '2023-01-06 22:30:56', NULL, 0, 0, '$2b$10$3QjSw4sWqHoszWJizTEpKONPC3Zwaihy6mDJ.xtUSye8sbYQ1ANM.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'GUARD', '8184724615', 1, 0, 0),
(30, 'gogo', 'Ogbonna', 'mosesogbonna@gmail.com', '2023-02-01', 'MALE', 13, 1, '2023-01-21 21:01:01', '2023-01-21 21:01:01', NULL, 0, 0, '$2b$10$vWsLyfRpO4bEfrQc8uZPpegfbrkrGFASkkquRO.tdIWID5u4w7Ld.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'ADMIN', '8184724615', 1, 1, 0),
(31, 'tesla', 'kaka', 'test56@test.com', '2023-01-12', 'MALE', 14, 1, '2023-01-23 07:42:38', '2023-01-23 07:42:38', NULL, 0, 0, '$2b$10$17XQRDJ9nSDMMofTltzofuE4iUCcD3Zhe/rkk7kfpkj/l52Psjnja', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'GUARD', '8184724615', 1, 1, 0),
(32, 'Rora', 'Ogbonna', 'tesKKKKt@test.com', '2023-01-16', 'FEMALE', 15, 1, '2023-01-24 14:21:40', '2023-01-24 14:21:40', NULL, 0, 0, '$2b$10$mIA3rZa3qToTTvVt1StyXu0R2xbGOtPVD72RDZRKvP9TXNSnLmqa2', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'GUARD', '8184724615', 1, 0, 0),
(33, 'Chinaza', 'Ogbonna', 'nigere@proton.me', '2023-01-17', 'NOT_SPECIFIED', 19, 1, '2023-01-26 15:10:01', '2023-01-26 15:10:01', NULL, 0, 0, '$2b$10$n/Va/RMTdeOV3VOYLDBtVOnVW6s6h3Ny7.gKB46A/VFxSUoDNE7vS', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'ACCOUNT_MANGER', '8184724615', 1, 1, 0),
(34, 'Chinaza', 'Ogbonna', 'mosesogbonn8@gmail.com', '2023-01-24', 'MALE', 20, 1, '2023-01-26 15:12:32', '2023-01-26 15:12:32', NULL, 0, 0, '$2b$10$.QV2PRZf2wQYPVaJIoUvTuide.ZMe4mNyTgkFYN656u1ZH7ldjUTK', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'ADMIN', '8184724615', 1, 1, 0),
(35, 'Chinaza', 'test', 'tess@test.com', '2023-01-24', 'MALE', 21, 1, '2023-01-26 15:14:12', '2023-01-26 15:14:12', NULL, 0, 0, '$2b$10$RO8CXUusaDLjGL28BWy0ZOfeRq92WDEOxHDoHM.ZOQ2LZFDMBdjSe', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'ADMIN', '8184724615', 1, 1, 0),
(36, 'Chinaza', 'Ogbonna', 'nigeria-workse@proton.me', '2023-01-10', 'FEMALE', 22, 1, '2023-01-26 15:15:46', '2023-01-26 15:15:46', NULL, 0, 0, '$2b$10$9MRXTkrSKbjkCo6AwS5.JOCQvaY0.EPou902QsTgbDEWDs7zMK8C2', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(37, 'Chinaza', 'tetst', 'teddd@test.com', '2023-01-24', 'MALE', 23, 1, '2023-01-26 15:16:26', '2023-01-26 15:16:26', NULL, 0, 0, '$2b$10$twD0HILLtlloOSuQ64Lhl.FHfKNVUH/PNId8bZK0DK9MkWLRKxOtK', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(38, 'Chinaza', 'Ogbonna', 'nigeria-worpace@proton.me', '2023-01-24', 'MALE', 24, 1, '2023-01-26 15:17:26', '2023-01-26 15:17:26', NULL, 0, 0, '$2b$10$rUoK0cBFBobwshdQ34vT9.v/ut06qXDMJNT9iWGidZqgGq8eS7aUa', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'ADMIN', '8184724615', 1, 1, 0),
(39, 'Chinaza', 'Ogbonna', 'mosesogba68@gmail.com', '2023-01-18', 'MALE', 25, 1, '2023-01-26 15:18:00', '2023-01-26 15:18:00', NULL, 0, 0, '$2b$10$27/1mHdBXE8iSIbzS5ycRevAQt/GVTLbS.MPKQHm4nPhbk2Zs1fRO', 'http://localhost:3000\\images\\avatars\\image-1674768215491-143428521-glacier24.jpg', 'ADMIN', '8184724615', 1, 1, 0),
(40, 'Chinaza', 'Ogbonna', 'teop@test.com', '2023-01-17', 'MALE', 39, 1, '2023-01-27 14:39:05', '2023-01-27 14:39:05', NULL, 0, 0, '$2b$10$sZEW0OHBJbLC2bW9pp6jP.sQc3FSIIHMUsiByTKHynfHAWfT7g1M.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(41, 'Chinaza', 'Ogbonna', 'te@test.com', '2023-01-17', 'MALE', 40, 1, '2023-01-27 14:39:22', '2023-01-27 14:39:22', NULL, 0, 0, '$2b$10$4RpzqH.bnPEBkTyXwBx6DuoFXoXNwEputZBND0OcqN25LiV9JBYY.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(42, 'Chinaza', 'Ogbonna', 'tppppppe@test.com', '2023-01-17', 'MALE', 41, 1, '2023-01-27 14:39:29', '2023-01-27 14:39:29', NULL, 0, 0, '$2b$10$O0C4ouZUxhuOO71cyoNboeanIe8rEP4Mc4BbSTz/TYJq7fLfo7fKi', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(43, 'Chinaza', 'Ogbonna', 'tooooooope@test.com', '2023-01-17', 'MALE', 42, 1, '2023-01-27 14:40:05', '2023-01-27 14:40:05', NULL, 0, 0, '$2b$10$AQxjIzAYVjQii2f6.NeP4ekkLrGY5OuFl7ss0uqta9GPJqf5ZOVtS', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(44, 'Chinaza', 'Ogbonna', 'tokkkkkk@test.com', '2023-01-17', 'MALE', 43, 1, '2023-01-27 14:40:15', '2023-01-27 14:40:15', NULL, 0, 0, '$2b$10$2aHnSY2FKQOMSGp/BBs5TuzIfDiir2zZW1JlCSMqGK.L44lf6av3i', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(45, 'Chinaza', 'Ogbonna', 'toooooooooooooook@test.com', '2023-01-30', 'MALE', 44, 1, '2023-01-27 14:45:09', '2023-01-27 14:45:09', NULL, 0, 0, '$2b$10$rcOygat4dseXpEGi8KQJlegMZZPInNDtVOnFjVZxlMpn/AxfBiuzW', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(46, 'Chinaza', 'Ogbonna', 'rore@test.com', '2023-01-30', 'MALE', 45, 1, '2023-01-27 14:45:21', '2023-01-27 14:45:21', NULL, 0, 0, '$2b$10$uD4SkWTknl9NrfSnb76stOS4GeY7.zKrUa0OEPiMMmrdWFZGVn1H.', 'http://localhost:3000\\images\\avatars\\image-1674831897762-859631942-glacier24.jpg', 'ADMIN', '8184724615', 1, 1, 0),
(47, 'Chinaza', 'Ogbonna', 'xosa@test.com', '2023-01-30', 'MALE', 46, 1, '2023-01-27 14:45:29', '2023-01-27 14:45:29', NULL, 0, 0, '$2b$10$iImatKXZng/tb4nou21VOeBuOkLsZd1YiJsx8hzqjbaHsYpxfz76.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 1, 0),
(48, 'Chinaza', 'OgbonnaKK', 'KKKKKKKKKKK@proton.me', '2023-01-26', 'FEMALE', 48, 1, '2023-01-28 16:01:18', '2023-01-28 16:01:18', NULL, 0, 0, '$2b$10$RHPXyiEhCSGWQjf68jodSe3iDVBzVIwPHijyuFgsQ9RPIKG07nBIq', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 0, 0),
(49, 'Chinaza', 'OgbonnaKK', 'KOOOOOOK@proton.me', '2023-01-26', 'FEMALE', 49, 1, '2023-01-28 16:01:31', '2023-01-28 16:01:31', NULL, 0, 0, '$2b$10$sjY9rKN5svr5dUkE7ukH4.Wmmo/LREeTjoo0JzBD7gWertdLYam3.', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 0, 0),
(50, 'Chinaza', 'Ogbonna', 'tesIIt@test.com', '2023-01-05', 'MALE', 50, 1, '2023-01-28 16:06:21', '2023-01-28 16:06:21', NULL, 0, 0, '$2b$10$4OH/t6cWRISiSNubIjOkVuCT4yt0vJeG4kINPhOqg.2dUxla1ScdS', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'USER', '8184724615', 1, 0, 0),
(51, 'Chinaza', 'Ogbonna', 'COD-workspace@proton.me', '2023-01-13', 'MALE', 51, 1, '2023-01-28 16:16:10', '2023-01-28 16:16:10', NULL, 0, 0, '$2b$10$6nwzQoroZg0Pz3Lf6PY2oOyhqVWw3O0oNx30SBSU5R.mxtd/0OfXO', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'GUARD', '8184724615', 1, 0, 0),
(52, 'Chinaza', 'Ogbonna', 'OPO68@gmail.com', '2023-01-19', 'MALE', 52, 1, '2023-01-28 16:16:35', '2023-01-28 16:16:35', NULL, 0, 0, '$2b$10$K9Ob3w4jEaqLs4fDo4kRfOhh8ub5.VrrUWVpKXHmCCP5NUc8lw24m', 'http://localhost:3000/images/avatars/fbyDefaultIMG.png', 'GUARD', '8184724615', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `_requests_`
--

CREATE TABLE `_requests_` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_agendas_schedule` (`job_id`);

--
-- Indexes for table `assigned_staffs`
--
ALTER TABLE `assigned_staffs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unq_assigned_staffs_job_id` (`job_id`),
  ADD KEY `unq_assigned_staffs_staff_id` (`staff_id`);

--
-- Indexes for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_customers_location_id` (`location_id`);

--
-- Indexes for table `customer_suspension_comments`
--
ALTER TABLE `customer_suspension_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `deleted_uploads`
--
ALTER TABLE `deleted_uploads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_facility_facility_location_id` (`facility_location_id`),
  ADD KEY `unq_facility_customer_id` (`customer_id`);

--
-- Indexes for table `facility_locations`
--
ALTER TABLE `facility_locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_facility_locations_coordinates_id` (`coordinates_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unq_jobs_customer_id` (`customer_id`),
  ADD KEY `fk_jobs_facility` (`facility_id`);

--
-- Indexes for table `job_logs`
--
ALTER TABLE `job_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_id` (`job_id`) USING BTREE;

--
-- Indexes for table `job_operations`
--
ALTER TABLE `job_operations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_job_operations_check_in_coordinates_id` (`check_in_coordinates_id`),
  ADD UNIQUE KEY `unq_job_operations_check_out_coordinates_id` (`check_out_coordinates_id`),
  ADD KEY `unq_job_operations_schedule_id` (`schedule_id`),
  ADD KEY `unq_job_operations_staff_id` (`staff_id`);

--
-- Indexes for table `job_reports`
--
ALTER TABLE `job_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_id` (`job_id`) USING BTREE;

--
-- Indexes for table `job_report_attachments`
--
ALTER TABLE `job_report_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_report_attachments_job_reports` (`job_report_id`);

--
-- Indexes for table `job_security_code`
--
ALTER TABLE `job_security_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_agenda_id_security_code_jobs` (`agenda_id`) USING BTREE;

--
-- Indexes for table `licenses`
--
ALTER TABLE `licenses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_licenses_staff_id` (`staff_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location_check_operations`
--
ALTER TABLE `location_check_operations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unq_safety_check_operations` (`job_operations_id`),
  ADD KEY `fk_safety_check_operations_coordinates` (`coordinates_id`);

--
-- Indexes for table `memo`
--
ALTER TABLE `memo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memo_receivers`
--
ALTER TABLE `memo_receivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_password_reset` (`user_id`,`reset_key`);

--
-- Indexes for table `scan_operations`
--
ALTER TABLE `scan_operations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_scan_operations_job_operations` (`job_operations_id`),
  ADD KEY `fk_scan_operations_coordinates` (`coordinates_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unq_schedule_job_id` (`job_id`);

--
-- Indexes for table `security_check_log`
--
ALTER TABLE `security_check_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shift_comments`
--
ALTER TABLE `shift_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_staff_location_id` (`location_id`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suspension_comments`
--
ALTER TABLE `suspension_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_admin_location_id` (`location_id`);

--
-- Indexes for table `_requests_`
--
ALTER TABLE `_requests_`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agendas`
--
ALTER TABLE `agendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `assigned_staffs`
--
ALTER TABLE `assigned_staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coordinates`
--
ALTER TABLE `coordinates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `customer_suspension_comments`
--
ALTER TABLE `customer_suspension_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `deleted_uploads`
--
ALTER TABLE `deleted_uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `facility`
--
ALTER TABLE `facility`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `facility_locations`
--
ALTER TABLE `facility_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `job_logs`
--
ALTER TABLE `job_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `job_operations`
--
ALTER TABLE `job_operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_reports`
--
ALTER TABLE `job_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_report_attachments`
--
ALTER TABLE `job_report_attachments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_security_code`
--
ALTER TABLE `job_security_code`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `licenses`
--
ALTER TABLE `licenses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `location_check_operations`
--
ALTER TABLE `location_check_operations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `memo`
--
ALTER TABLE `memo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `memo_receivers`
--
ALTER TABLE `memo_receivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `password_reset`
--
ALTER TABLE `password_reset`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scan_operations`
--
ALTER TABLE `scan_operations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `security_check_log`
--
ALTER TABLE `security_check_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `shift_comments`
--
ALTER TABLE `shift_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `suspension_comments`
--
ALTER TABLE `suspension_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `_requests_`
--
ALTER TABLE `_requests_`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agendas`
--
ALTER TABLE `agendas`
  ADD CONSTRAINT `fk_agendas_schedule` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `assigned_staffs`
--
ALTER TABLE `assigned_staffs`
  ADD CONSTRAINT `fk_assigned_staffs_jobs` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_assigned_staffs_users` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `fk_customers_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `facility`
--
ALTER TABLE `facility`
  ADD CONSTRAINT `fk_facility_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facility_facility_locations` FOREIGN KEY (`facility_location_id`) REFERENCES `facility_locations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `facility_locations`
--
ALTER TABLE `facility_locations`
  ADD CONSTRAINT `fk_facility_locations_coordinates` FOREIGN KEY (`coordinates_id`) REFERENCES `coordinates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `fk_jobs_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_jobs_facility` FOREIGN KEY (`facility_id`) REFERENCES `facility` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `job_logs`
--
ALTER TABLE `job_logs`
  ADD CONSTRAINT `fk_logs_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `job_operations`
--
ALTER TABLE `job_operations`
  ADD CONSTRAINT `fk_job_operations_coordinates` FOREIGN KEY (`check_out_coordinates_id`) REFERENCES `coordinates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_job_operations_coordinates_0` FOREIGN KEY (`check_in_coordinates_id`) REFERENCES `coordinates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_job_operations_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_job_operations_users` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `job_reports`
--
ALTER TABLE `job_reports`
  ADD CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_report_attachments`
--
ALTER TABLE `job_report_attachments`
  ADD CONSTRAINT `fk_job_report_attachments_job_reports` FOREIGN KEY (`job_report_id`) REFERENCES `job_reports` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `job_security_code`
--
ALTER TABLE `job_security_code`
  ADD CONSTRAINT `fk_job_security_code_jobs` FOREIGN KEY (`agenda_id`) REFERENCES `agendas` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `licenses`
--
ALTER TABLE `licenses`
  ADD CONSTRAINT `fk_licenses_users` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `location_check_operations`
--
ALTER TABLE `location_check_operations`
  ADD CONSTRAINT `fk_safety_check_operations_coordinates` FOREIGN KEY (`coordinates_id`) REFERENCES `coordinates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_safety_check_operations_job_operations` FOREIGN KEY (`job_operations_id`) REFERENCES `job_operations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `password_reset`
--
ALTER TABLE `password_reset`
  ADD CONSTRAINT `fk_password_reset_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `scan_operations`
--
ALTER TABLE `scan_operations`
  ADD CONSTRAINT `fk_scan_operations_coordinates` FOREIGN KEY (`coordinates_id`) REFERENCES `coordinates` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_scan_operations_job_operations` FOREIGN KEY (`job_operations_id`) REFERENCES `job_operations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_schedule_jobs` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `suspension_comments`
--
ALTER TABLE `suspension_comments`
  ADD CONSTRAINT `suspension_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
