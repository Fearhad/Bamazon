DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Fjallraven Greenland Jacket', 'Clothing', 299.99, 13);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('US Robotics v32 Modem', 'Ancient Computer Accessories', 199.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Red Scarf', 'Clothing', 19.99, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Blue Socks', 'Clothing', 5.99, 23);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('HP Dot Matrix Printer', 'Ancient Computer Accessories', 399.99, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('5.25 Inch Floppy Drive', 'Ancient Computer Accessories', 69.99, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Tomato peeler', 'Useless Junk', 9.99, 5000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Hat Rack', 'Useless Junk', 49.99, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('1 Inch USB Cable', 'Useless Junk', 14.99, 10000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Marbles', 'Useless Junk', 5.99, 25000);
