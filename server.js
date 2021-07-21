// Initialization
//      Imports
const express = require('express');
const path = require('path');
const File = require('fs');

//      Express Config
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
//      Get Homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//      Get Notebook
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//      Get Assets
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, './public/assets/css/styles.css')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, './public/assets/js/index.js')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

//      Post to db
app.post('/api/notes', (req, res) => {

    let container; // Container variable for data operation
    let dbPath = path.join(__dirname, './db/db.json');

    File.readFile(dbPath, 'utf8', (err, data) => {

        if (err) console.error('ERROR: Could not read file!');

        container = JSON.parse(data);
        container.push(req.body);

        File.writeFile(dbPath, JSON.stringify(container), (err) => {});
    })

});

// Listen
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));