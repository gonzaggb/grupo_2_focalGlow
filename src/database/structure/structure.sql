CREATE SCHEMA `focal_glow_db` ;

USE `focal_glow_db`;

CREATE TABLE products (
	id INT  AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
     CONSTRAINT id PRIMARY KEY (id)
	);
CREATE TABLE images ( 
	id INT  AUTO_INCREMENT NOT NULL,
    image VARCHAR(100) NOT NULL,
    type ENUM ('main','slider','product_dimension'),
    product_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    );

CREATE TABLE features (
	id INT  AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
    type VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
    );

CREATE TABLE categories (
	id INT  AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
    image VARCHAR(100) NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
    );

CREATE TABLE files (
	id INT  AUTO_INCREMENT NOT NULL,
	type ENUM ('spec_sheet','install_sheet'),
    product_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
	FOREIGN KEY (product_id) REFERENCES products(id)
    );
    
 CREATE TABLE product_feature (
	id INT  AUTO_INCREMENT NOT NULL,
	product_id INT NOT NULL,
    feature_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (feature_id) REFERENCES features(id)
	);

 CREATE TABLE users (
	id INT  AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    image VARCHAR(50) NOT NULL,
    role ENUM ('user','admin'),
    CONSTRAINT id PRIMARY KEY (id)
	);

CREATE TABLE orders (
	id INT  AUTO_INCREMENT NOT NULL,
    order_number INT NOT NULL,
    total INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
	);

CREATE TABLE items(
	id INT  AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    product_price VARCHAR(50) NOT NULL,
    product_description VARCHAR(200) NOT NULL,
    product_features VARCHAR(50) NOT NULL,
    product_image VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    subtotal INT NOT NULL,
    order_id INT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
    )
    