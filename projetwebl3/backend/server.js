const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
//pour le token d'autentification
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const my_secret_key = "675c893029cd2b77c8a6ec2c7da433e0b54239aed8163b7cdde05897a913951e";

const app = express();
app.use(express.json());
const port = 3000;

// Utilisez le middleware cors pour autoriser les requêtes CORS
app.use(cors());

// Vos autres configurations et routes ici...


// Création d'une connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'adminwebmarkeplace',
    password: '198673476',
    database: 'webmarkeplace',
});

// Vérification de la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à MySQL:', err);
    return;
  }
  console.log('Connexion à MySQL réussie');
});

// Route de test
app.get('/', (req, res) => {
  res.send('Bonjour depuis le serveur backend !');
});


// Route pour l'inscription
app.post('/register', (req, res) => {
  console.log('route register', req.body);
  const { username, email, password } = req.body;

  // Hacher le mot de passe avant de l'enregistrer dans la base de données
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe:', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }

    // Enregistrer l'utilisateur dans la base de données avec le mot de passe haché
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (error, results) => {
      if (error) {
        console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }

      // Récupérer l'ID de l'utilisateur nouvellement inséré
      const userId = results.insertId;
      console.log('Utilisateur inséré avec l\'ID:', userId);

      // Authentification réussie, générer un token JWT avec l'ID de l'utilisateur
      const token = jwt.sign({ userId: userId, username: username}, my_secret_key, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});



// Route pour l'authentification
app.post('/login', (req, res) => {
  console.log('route login', req.body);
  const { email, password } = req.body;

  // Vérification des identifiants dans la base de données
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification des identifiants:', error);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }

    if (results.length > 0) {
      // Utilisateur trouvé, vérifier le mot de passe
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Erreur lors de la comparaison des mots de passe:', err);
          res.status(500).json({ message: 'Erreur serveur' });
          return;
        }
        if (isMatch) {
          // Mot de passe correct, générer un token JWT
          const token = jwt.sign({ userId: user.id }, my_secret_key, { expiresIn: '1h' });
          res.json({ token });
        } else {
          // Mot de passe incorrect
          res.status(401).json({ message: 'Identifiants invalidesBE' });
        }
      });
    } else {
      // Utilisateur non trouvé
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  });
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});