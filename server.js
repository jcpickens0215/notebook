// Initialization
//      Imports
const express = require('express');
const path = require('path');
const File = require('fs');
const {v4 : uuidv4} = require('uuid');

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

    const dbPath = path.join(__dirname, './db/db.json');  // Set the db path
    const uniqueID = uuidv4();                            // Create a new uuid

    // Attempt to read the db.json
    File.readFile(dbPath, 'utf8', (err, data) => {

        // If it can't be read, send an error
        if (err) {

            console.error('ERROR: Could not read file!')
            req.status(500).end; // Send 500 status
        };

        // Assign the uuid to a new key labelled "id"
        req.body.id = uniqueID;

        const container = JSON.parse(data);  // Store the data from db.json as an array
        container.push(req.body);            // Add the new text object to the array

        // Attempt to write db.json
        File.writeFile(dbPath, JSON.stringify(container), (err) => {

            // If it can't be written, send an error
            if (err) {

                console.error('ERROR: Could not write file!')
                req.status(500).end; // Send 500 status
            };
        });

        // Respond OK (200)
        res.status(200).end();
    })

});

//      Delete from db
app.delete('/api/notes/:ID', (req, res) => { 

    const selectID = req.params.ID;                      // Pull ID from route path
    const dbPath = path.join(__dirname, './db/db.json'); // Set the db path

    // Attempt to read the db.json
    File.readFile(dbPath, 'utf8', (err, data) => {

        // If it can't be read, send an error
        if (err) {

            console.error('ERROR: Could not read file!')
            req.status(500).end; // Send 500 status
        };

        // Perform the deletion
        const container = JSON.parse(data); // Store the data from db.json as an array

        //      Get the index of a text object in the array with an ID matching the path
        const index = container.findIndex(texts => texts.id == selectID);
        container.splice(index, 1); // Remove the chosen text object

        // Attempt to write db.json
        File.writeFile(dbPath, JSON.stringify(container), (err) => {

            // If it can't be written, send an error
            if (err) {

                console.error('ERROR: Could not write file!')
                req.status(500).end; // Send 500 status
            };
        });

        // Respond OK (200)
        res.status(200).end();
    })

});


// Listen
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));