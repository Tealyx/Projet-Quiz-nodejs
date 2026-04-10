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
    title:'KnowIt - Acceuil', //paramètre title pour nomme le nom de la page selon ce qu'on veut 
  });
});

app.get('/quiz', (req,res) =>{
  res.render('quiz',{
    title:'KnowIt - Quiz', //paramètre title pour nomme le nom de la page selon ce qu'on veut 
  });
});

app.get('/login', (req,res) =>{
  res.render('login',{
    title:'KnowIt - Login', //paramètre title pour nomme le nom de la page selon ce qu'on veut 
  });
});

app.get('/register', (req,res) =>{
  res.render('register',{
    title:'KnowIt - Register', //paramètre title pour nomme le nom de la page selon ce qu'on veut 
  });
});

// route pour ajouter un utilisateur à la base de données
app.post("/addUser",(req,res)=>{

  ajout_utilisateur(
    req.body.username,
    req.body.email,
    req.body.password
  );

  res.send("ok");

});

// route pour ajouter une question à la base de données
app.post("/addQuestion", (req, res) => {

    console.log(req.body);

    res.send("ok");

});



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3059",
  database: "Projet_techno_du_web_L1"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à MySQL !");
});

const ajout_utilisateur = function(username, email, password) {

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],

    function(err, result) {

      if (err) {
        console.log(err);
        return;
      }

      console.log("Utilisateur ajouté !");
    }

  );

};


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});





