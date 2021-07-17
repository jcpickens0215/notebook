// Initialization
//      Imports
const express = require('express');
const path = require('path');

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

// Listen
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));