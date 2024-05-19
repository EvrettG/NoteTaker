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

api.post('/notes', (req, res)=>{
    console.log(`${req.method} request received to post to notes`);
    // Destructures the 
    const {title, text } = req.body
    

    // check if post request has at least title and text
    if(req.body?.title && req.body?.text) {
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

api.delete('/notes', (req, res)=>{

})

module.exports = api