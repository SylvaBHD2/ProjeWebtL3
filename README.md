# ProjeWebtL3

CREATE DATABASE webmarkeplace;
USE webmarkeplace;

CREATE USER 'adminwebmarkeplace'@'localhost' IDENTIFIED BY '198673476';

GRANT ALL PRIVILEGES ON webmarkeplace.* TO 'adminwebmarkeplace'@'localhost';

ALTER USER 'adminwebmarkeplace'@'localhost' IDENTIFIED WITH mysql_native_password BY '198673476';

FLUSH PRIVILEGES;


-- Création de la table "produits"
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    stock INT
);

-- Création de la table "users"
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50)
);

-- Création de la table "commande"
CREATE TABLE commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    produit_id INT,
    quantite INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);



INSERT INTO users (username, email, password, role)
VALUES ('root', 'root@administrator.com', '$2a$10$btdVTFgzZvYP9oaa7HBse.Q/DO20vFBEFL6yaf/cYSTizDOayC81S', 'administrator');


<!-- mdphaché =  rootpassword-->


# TODO 
- remplacer les routes fetch par des axios ?