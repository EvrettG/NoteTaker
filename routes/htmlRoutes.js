// Used to run express and allow the htmlRoutes to be exported
const pages = require('express').Router();

// Used for accessing the file directory and going to the index and notes
// via / and /notes
const path = require('path');

// directs to the index page from blank
pages.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);
// directs to the /notes page
pages.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);
// redirect from wrong pages to main index page
pages.use((req, res) => {
    res.redirect('/');
});
// exports for use 
module.exports = pages