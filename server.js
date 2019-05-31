const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}` + '\n';

    console.log(log);

    fs.appendFile('server.log', log, (err) => {
        if (err) { console.log(err) }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: "Home page",
        welcome: "Hi, this is the home page",
        name: "Butilka",
        content: "Whiskey"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects page",
        welcome: "Welcome to our projects page",
        content: "List of the projects"
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    })
});

app.listen(port, () => {
    console.log(`The server is up on port ${port}`)
});