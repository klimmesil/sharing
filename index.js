require('dotenv').config(); // importe les constantes privees dans process.env (voir /.env)

// jshint pour debogger
// sudo npx nodemon index.js pour lancer le programme

// modules ///////////////////////////////////////////////////////////////////////////////////////
// node a plein de modules integres. Allez voir node.fs, node.jwt ou encore node.html par exemple
const express = require(`express`);
const path = require('path');
const fs = require('fs').promises; // vraiment allez voir les promesses.
const Logger = require(path.join(__dirname, 'logger.js'));

// constantes ///////////////////////////////////////////////////////////////////////////////////////
const app = express(); // on preferera utiliser express a html. C'est globalement mieux
const public_file_root = path.join(__dirname, "public"); // utilisez toujours path pour faire des chemins absolus
const my_logger = new Logger(); // pourquoi pas faire un logger? (fuck log3js)

// gestion ///////////////////////////////////////////////////////////////////////////////////////
// app.use(express.static(public_file_root)); // avec ca tous les fichiers publics seront accessibles via URI
app.use(express.json()); // JSON.stringify les objets quand on fait un write, send ou print

// routes //////////////////////////////////////////////////////////////////////////////////////////
// index

// app est utilise pour faire des apps RESTful (go google) .get .post .head etc pour les differentes requetes
// si vous connaissez pas trop JS allez apprendre comment fonctionnent les callbacks et les promesses
app.get(`/`, async (req, res) => {

    my_logger.log(`GET /`); // pour le debogage. Pensez 

    // allez voir la doc, node c'est trop bien.
    // exemples: send, sendFile, json. SendFile c'est pire qu'un aimbot sur CSGO: il fait tout pour toi
    // ATTENTION a bien mettre root = public_file_root de maniere explicite
    // Sinon en mettant express.static les utilisateurs pourraient acceder a "../../../pedoporn"... pas ouf
    res.sendFile(`/index.html`, { root: public_file_root });
});

// images
app.get('/images/banniere.png', async (req, res) => {
    my_logger.log("GET /images/banniere.png");
    res.sendFile('/images/banniere.png', { root: public_file_root });
});

// stylesheets
app.get(`/stylesheets/styles.css`, async (req, res) => {
    my_logger.log(`GET /stylesheets/styles.css`);
    res.sendFile('/stylesheets/styles.css', { root: public_file_root });
});


// logging ////////////////////////////////////////////////////////////////////////////////////////////
// vraiment. Ne negligez pas la puissance du "oh merde j'ai pas sauvegarde l'erreur"

my_logger.on("messageLogged", async (logObj) => {
    // tratiement du log
    await fs.appendFile(path.join(__dirname, "log.txt"), JSON.stringify(logObj) + "\n");
});

// on ouvre le port 80 - HTTP. Necessite un parfois acces root
app.listen(process.env.PORT);