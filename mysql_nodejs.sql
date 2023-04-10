-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 10, 2023 at 08:37 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysql_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `bisection`
--

CREATE TABLE `bisection` (
  `id` int(10) NOT NULL,
  `equation` varchar(255) NOT NULL,
  `xl` float(20,3) NOT NULL,
  `xr` float(20,3) NOT NULL,
  `tolerance` float(10,10) NOT NULL,
  `maxIterations` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bisection`
--

INSERT INTO `bisection` (`id`, `equation`, `xl`, `xr`, `tolerance`, `maxIterations`) VALUES
(1, 'x^3 + 4x^2 - 10', 1.000, 2.000, 0.0001000000, 50),
(2, 'x^2 - 2', 1.000, 2.000, 0.0001000000, 50),
(3, 'x^3 - x - 1', 1.000, 2.000, 0.0001000000, 50),
(4, 'x^3 - 2x - 2', 1.000, 2.000, 0.0001000000, 50),
(5, 'x^3 - 7x^2 + 14x - 6', 0.000, 1.000, 0.0001000000, 50),
(6, 'cos(x) - x^3', -1.000, 1.000, 0.0001000000, 100),
(7, 'x^3 + x^2 - 3x - 3', -2.000, 2.000, 0.0001000000, 100),
(8, 'x^5 - 2x^3 + x - 1', 0.500, 2.000, 0.0001000000, 100),
(9, 'sin(x) + 0.5x - 1', 0.000, 1.000, 0.0000010000, 50),
(10, 'e^x - x^2', -1.000, 2.000, 0.0000100000, 200),
(11, 'x^3 - x - 1', 1.000, 2.000, 0.0000010000, 50);

-- --------------------------------------------------------

--
-- Table structure for table `falseposition`
--

CREATE TABLE `falseposition` (
  `id` int(10) NOT NULL,
  `equation` varchar(255) NOT NULL,
  `xl` float(20,3) NOT NULL,
  `xr` float(20,3) NOT NULL,
  `tolerance` float(10,10) NOT NULL,
  `maxIterations` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `falseposition`
--

INSERT INTO `falseposition` (`id`, `equation`, `xl`, `xr`, `tolerance`, `maxIterations`) VALUES
(1, 'x^2 - 4', 1.000, 3.000, 0.0001000000, 100),
(2, 'x^3 - 7x^2 + 14x - 6', 0.000, 2.000, 0.0001000000, 100),
(3, 'x^4 - 16', -1.000, 3.000, 0.0001000000, 100),
(4, 'x^3 - 4x^2 + 4x - 1', 2.000, 4.000, 0.0001000000, 100),
(5, 'x^3 - 9x^2 + 26x - 24', -2.000, 6.000, 0.0001000000, 100),
(6, 'x^3 + 2x^2 - 5', 0.000, 2.000, 0.0001000000, 100),
(7, 'x^3 - 5x^2 + 3x + 9', -2.000, 1.000, 0.0001000000, 100),
(8, 'x^2 - 10x + 21', 2.000, 6.000, 0.0001000000, 100),
(9, 'x^3 - 6x^2 + 9x + 4', -1.000, 1.000, 0.0001000000, 100),
(10, 'cos(x) - x', 0.000, 2.000, 0.0001000000, 100),
(11, 'sin(x) - x/2', -3.000, 2.000, 0.0001000000, 100),
(12, 'x^3 - 2x^2 - 4x + 8', -3.000, 1.000, 0.0001000000, 100),
(13, 'x^3 - 27', 0.000, 5.000, 0.0001000000, 100),
(14, 'x^2 - 7x + 10', 1.000, 3.000, 0.0001000000, 100),
(15, 'x^3 + 3x^2 - 1', -2.000, 0.000, 0.0001000000, 100);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bisection`
--
ALTER TABLE `bisection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `falseposition`
--
ALTER TABLE `falseposition`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bisection`
--
ALTER TABLE `bisection`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `falseposition`
--
ALTER TABLE `falseposition`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
