const express = require('express');
const port = 8000;

const db = require('./config/mongoose');

// create express app
const app = express();

//middleware to get form data
app.use(express.urlencoded({extended: true}));

//set view engine to ejs
app.set("view engine", "ejs");

//set path for views
app.set("views", "./views");

//set path for routing
app.use('/', require('./routes'))

//set path for static files
app.use(express.static('./assets'));

//start listening on port and handle error
app.listen(port, function(err){
    if(err){
        console.log(`Error occured in creating the server. Error: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});
