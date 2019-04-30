DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the characters table
CREATE TABLE products
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (100) NOT NULL,
  department VARCHAR (100) NOT NULL,
  price FLOAT(10,2) NOT NULL,
  stock INT NOT NULL,
  PRIMARY KEY(id)
);