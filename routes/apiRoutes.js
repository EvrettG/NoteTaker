// used to handle fetch requests from index.js
const api = require('express').Router();
// Where all files are stored
const noteDB = require('../db/db.json');

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
    // prepare a response object to send data back to a client
    let response

    // check if post request has at least title and text
    if(req.body?.title && req.body?.text) {
        response = {}
    } else{
        res.json(`request has been denined must contain title and text`)
    }
    console.log(req.bodey)
});

api.delete('/notes', (req, res)=>{

})

module.exports = api