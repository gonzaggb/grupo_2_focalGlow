CREATE SCHEMA `focal_glow_db` ;

USE `focal_glow_db`;

CREATE TABLE products (
	id INT  AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
	CONSTRAINT id PRIMARY KEY (id)
	);
CREATE TABLE images ( 
	id INT  AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM ('main','slider','dimension'),
    product_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    );

CREATE TABLE features (
	id INT  AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
    type ENUM ('cct','optic','power','material','source','dim') NOT NULL,
    price DECIMAL NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
    );

CREATE TABLE categories (
	id INT  AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
    image_cover VARCHAR(255) NOT NULL,
    image_home VARCHAR(255) NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
    );

CREATE TABLE files (
	id INT  AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
	type ENUM ('dataSheet','installSheet'),
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
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) ,
    address VARCHAR(50) ,
    profile_img VARCHAR(255) NOT NULL,
    role ENUM ('user','admin'),
    CONSTRAINT id PRIMARY KEY (id)
	);

    CREATE TABLE orders (
	id INT  AUTO_INCREMENT NOT NULL,
    total DECIMAL NOT NULL,
    created_at BIGINT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
	);

    CREATE TABLE items(
	id INT  AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    product_price INT NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_features VARCHAR(250) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL NOT NULL,
    order_id INT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
    )




    