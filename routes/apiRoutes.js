// used to handle fetch requests from index.js
const api = require('express').Router();
const uuid = require('../helpers/uuid');

const {readFromFile, writeToFile, readAndAppend,} = require("../helpers/fsUtils");

// appon reciving a get request for nots (or actually /api/notes) this function then reads from the db.json
// and returns it as usable string
api.get('/notes', (req, res)=>{
    console.log(`${req.method} request received to get notes`);
    // then converts it into usable js objuct for use
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// this function add's new note's to the db.json
api.post('/notes', (req, res)=>{
    console.log(`${req.method} request received to post to notes`);
    // Destructures the 
    const {title, text } = req.body
    // check if post request has at least title and text
    if(req.body?.title && req.body?.text) {
        // newNote is created from 
        const newNote = {
            title,
            text,
            id: uuid()
        };
        readAndAppend(newNote,'./db/db.json' )
        const resonse = {
            status: 'success',
            body: newNote,
        };
        res.json(resonse);
    } else{
        res.json(`request has been denined must contain title and text`)
    }
});
// this performs the delete funtion when a delete request is sent
// :id should register anything after notes
api.delete(`/notes/:id`, (req, res)=>{
    // this takes the :id part of the searchbar parameters and then turns it into a variable
    const noteID = req.params.id;
    // reads from the db.json 
    readFromFile('./db/db.json')
    // after that happens the next functions turns it from string to json
        .then((data) => JSON.parse(data))
        .then((json) => {
            // this function should then run a filter removing any object with the noteID from the db.json
            const newDB = json.filter((note) => note.id !== noteID);
            writeToFile('./db/db.json', newDB);

            // NOTE: if noteID is writen as noteId or anything else the proram crashes and kills the database
            res.json(`Note ${noteID} has been deleted`);
        })
    // console.log(`${req.method} request received to post to notes`);
    // oldNotes = readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

module.exports = api