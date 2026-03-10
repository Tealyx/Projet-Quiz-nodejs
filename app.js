// backstick : `${}`
// Fichier Javascript pour le back-end
// ligne a supp pour test
const path = require("path"); //Importation du module path
const {engine} = require("express-handlebars")
const express = require("express"); //Importation du module express
const mysql = require("mysql");
const { Sequelize } = require('sequelize');

const app = express(); //Création de son application c'est-à-dire son projet
const port = 3000;



app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views', path.join(__dirname, 'views')); //Définie le nom qui sera utilisé et load les fichiers




app.use(express.static(path.join(__dirname,"public"))); //Permet d'automatiquement load ces fichiers. Pour utiliser les fichiers de public dans d'autres fichiers il sera uniquement nécessaire de les appeler depuis la racine public



app.get('/bdd',(req,res)=>{ //Attribut à l'adresse /about le fichier about se trouvant dans le dossier "views". Si le dossier ne s'appelle pas "views" il faudra préciser le chemin. 
  res.render('bdd',{title:'bdd'}); 
});


app.get('/', (req,res) =>{
  res.render('home',{
    title:'Home', //paramètre title pour nomme le nom de la page selon ce qu'on veut 
  });
});



//Connexion à MySQL
const db = mysql.createConnection({
    host: "localhost",   
    user: "root",   
    password: "password",
    database: "Projet_techno_du_web_L1" //ligne à rajouter après avoir créé la base de données 
  });
db.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); }); //Vérification que la connexion est bien établie
// Si erreur : éxecuter les requêtes suivant dans MySQL Workbench :
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
//flush privileges;
//Si ca ne marche pas, essayer sans la partie @'localhost'.

//Création de la base de données :
//db.query("CREATE DATABASE Projet_techno_du_web_L1", function (err, result) {if (err) throw err;console.log("Database created");});

//Création d'une table au sein de cette base de données :
//db.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, prénom VARCHAR(255), Nom VARCHAR(255), Age INT )",function(err,result){if (err) throw err;console.log("Table created")});


//fonction d'ajout d'un utilisateur dans la table users :
const ajout_utilisateur = function(prenom, nom, age) {
  db.query(
    `INSERT INTO users (prénom, Nom, Age) VALUES ('${prenom}','${nom}',${age})`,
    [prenom, nom, age],
    function(err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    }
  );
};


ajout_utilisateur("Paul","Dupont",35)


app.listen(port, ()=>{
  console.log(`App listening on port ${port}`)
});










/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

*/