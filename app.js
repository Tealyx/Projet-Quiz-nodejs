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
app.use(express.json()); //Permet de parser les données reçues en JSON, c'est à dire de les convertir en objet utilisable en JS


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

// route pour récupérer une question aléatoire
app.get("/questions/random", (req, res) => {

    db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 1", (err, result) => {

        const question = result[0];

        if (question.type !== "qcm") {
            return res.json(question);
        }

        db.query(
            "SELECT * FROM reponses WHERE question_id = ?",
            [question.id],
            (err2, reponses) => {

                question.reponses = reponses;

                res.json(question);
            }
        );

    });

});

// route pour ajouter une question à la base de données
app.post("/questions/add", (req, res) => {

    const question = req.body.question;
    const type = req.body.type;
    const bonne_reponse = req.body.bonne_reponse;
    const toutes_reponses = req.body.toutes_reponses;

    //insérer la question
    db.query(
        "INSERT INTO questions (titre_question, type, bonne_reponse) VALUES (?, ?, ?)",
        [question, type, bonne_reponse],
        function(err, result) {

            if (err) {
                console.log(err);
                return res.status(500).send("Erreur DB");
            }

            const questionId = result.insertId;

            //si ce n'est pas un QCM -> fini
            if (type !== "qcm") {
                return res.send("Question ajoutée");
            }

            //si QCM → insérer les réponses
            const values = toutes_reponses.map(rep => [questionId, rep]);

            db.query(
                "INSERT INTO reponses (question_id, texte_reponse) VALUES ?",
                [values],
                function(err2) {

                    if (err2) {
                        console.log(err2);
                        return res.status(500).send("Erreur DB réponses");
                    }

                    res.send("QCM ajouté");
                }
            );

        }
    );

});

// Connexion à la base de données MySQL
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});





