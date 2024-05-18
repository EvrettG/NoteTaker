// Used to run and manage sever side elements like routes
const express = require(`express`)

// I beleive this is for using the index.js for doing it's work or for telling the index.js where to find it while running as a server
// above inccorect used to perfom call and run routes from 
const pages = require(`./routes/htmlRoutes`)
const apiRoutes = require('./routes/apiRoutes')
// Used for testing class to site and overwriten when hosted to server
const PORT = 3001
const app = express()

// Middleware for parsing JSON and urlencoded form data
// note revist if using json stuff
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to serve up static assets from the public folder
app.use(express.static('public'));
// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api', apiRoutes);
app.use('/', pages);


// Used to tell the website where to listen for get send pull etc requests
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);