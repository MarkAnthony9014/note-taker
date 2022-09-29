const express = require('express');
const { db } = require('./db/db');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3003;

const app = express();



app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


const addNote = (body, dbArray) => {
  const newNote = body;

 dbArray.push(newNote);

  fs.writeFileSync(path.join(__dirname, './db/db.json'),
  JSON.stringify({ db: dbArray }, null, 2)
  );

  return newNote;
};


// routes for HTMl 

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', function(req, res) {
    console.log('hello')
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// app.get('*', function(req, res){
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// routes for API

app.get('/api/db', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      res.json(notes);
    });
  });
  



  app.post('/api/db', (req, res) => {

    req.body.id = db.length.toString();

    const newNote = addNote(req.body, db);

    res.json(newNote);
});
    
   

app.listen(PORT, function(){
    console.log("Listening on PORT " + PORT);
});






