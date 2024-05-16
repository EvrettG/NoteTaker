// Used to run and manage sever side elements like routes
const express = require(`express`)
// double check on this but i think it's the part that lets pages connect and run together
const path = require(`path`)
// I beleive this is for using the index.js for doing it's work or for telling the index.js where to find it while running as a server
// above inccorect used to perfom call and run routes from 
const api = require(`./routes/htmlRoutes`)
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
app.use('/api', api);

// This view route is a GET route for the homepage
// used to make the base site direct to the index.html in the public folder
app.get(`/`, (req, res) =>
    res.sendFile(path.join(__dirname, `/public/index.html`))
);

// This view route is a GET route for the feedback page
// I belive that this is used to connect to the notes page when the server is running
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// Used to tell the website where to listen for get send pull etc requests
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);