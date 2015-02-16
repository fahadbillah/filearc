-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2015 at 01:04 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ng`
--

-- --------------------------------------------------------

--
-- Table structure for table `additional_infos`
--

CREATE TABLE IF NOT EXISTS `additional_infos` (
  `id_additional_info` int(11) NOT NULL AUTO_INCREMENT,
  `additional_info_name` varchar(200) DEFAULT NULL,
  `additional_info_value` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_additional_info`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `additional_infos`
--

INSERT INTO `additional_infos` (`id_additional_info`, `additional_info_name`, `additional_info_value`) VALUES
(3, 'ECE Chairman', 'AMC'),
(4, 'Chairman', 'MS. MAAL'),
(5, 'V.C.', 'W.H.O.'),
(6, 'vvc', 'vvvv');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id_categories` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_categories`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`) VALUES
('305c8bfef78545c0d05918e7ed996955', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', 1424085033, ''),
('39189721a24fe7047c47dacb510640a5', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', 1424084896, ''),
('792f61c387ed240e871c5b24e1d7939b', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', 1424084952, ''),
('93f6dc3c69a26b75d24e959b064002e5', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', 1424085033, 'a:7:{s:9:"user_data";s:0:"";s:8:"id_users";s:2:"12";s:10:"first_name";s:5:"fahad";s:9:"last_name";s:6:"billah";s:11:"academic_id";s:9:"930527542";s:9:"user_type";s:7:"faculty";s:9:"logged_in";b:1;}'),
('abd83f5a7736006e12ca769285592acd', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36', 1424085033, '');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `id_files` int(11) NOT NULL AUTO_INCREMENT,
  `file_title` varchar(200) NOT NULL,
  `file_category` varchar(100) NOT NULL,
  `file_url` text NOT NULL,
  `file_details` text NOT NULL,
  `id_users` int(11) NOT NULL,
  `file_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_files`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `file_tags`
--

CREATE TABLE IF NOT EXISTS `file_tags` (
  `id_files` int(11) NOT NULL,
  `id_tags` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `id_tags` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tags`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `academic_id` int(30) NOT NULL,
  `user_type` varchar(30) DEFAULT NULL,
  `access_status` varchar(50) NOT NULL,
  `activation_code` varchar(100) NOT NULL,
  `profile_picture` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `email` (`email`,`academic_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `first_name`, `last_name`, `email`, `password`, `academic_id`, `user_type`, `access_status`, `activation_code`, `profile_picture`, `date_created`, `date_updated`) VALUES
(11, 'Web', 'Admin', 'admin@admin.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 9090909, 'admin', 'activated', '', '', '2014-10-03 06:31:01', '0000-00-00 00:00:00'),
(12, 'fahad', 'billah', 'fahadbillah@yahoo.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 930527542, 'faculty', 'activated', '', '', '2014-10-28 11:18:19', '0000-00-00 00:00:00'),
(13, 'new', 'user', 'billah22@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 90909999, 'student', 'activated', '', '', '2015-02-16 09:36:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_archives`
--

CREATE TABLE IF NOT EXISTS `user_archives` (
  `id_users` int(11) NOT NULL,
  `id_files` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_likes`
--

CREATE TABLE IF NOT EXISTS `user_likes` (
  `id_users` int(11) NOT NULL,
  `id_files` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
