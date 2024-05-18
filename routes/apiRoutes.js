
const api = require('express').Router();
const noteDB = require('../db/db.json');




api.get('/api/notes', (req, res)=>{
    console.log(`${req.method} request received to get notes`);
    return res.json(noteDB)
});

api.post('/api/notes', (req, res)=>{
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

module.exports = api