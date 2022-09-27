const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();



app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



// routes for HTMl 

app.get('notes', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



app.listen(PORT, function(){
    console.log("Listening on PORT " + PORT);
});