CREATE DATABASE `discord`;
use discord;
CREATE TABLE `ragequit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player` varchar(255) NOT NULL,
  `counter` varchar(255) NOT NULL,
  `last_rage_quit` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;