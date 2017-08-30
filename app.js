const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
const index = require('./index.js')

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({'Robin Favorite Color'
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.render('start');
});

app.post('/', function (req, res) {
  let playordontplay = req.body.playordontplay;
  accept = playordontplay;
  res.redirect('/playgame');
});

app.get('/playgame', function (req, res) {
  emptyGuess = [];
  mysteryWord = [];
  guessedLetters = [];
  result = false;
  remainingGuesses = 8;
  index.chooseGame(accept);
  console.log(mysteryWord);
  res.render('game', {
    emptyGuess: index.emptyGuess,
    remainingGuesses: index.remainingGuesses,
    result: index.result
  })
});

app.post("/playgame", function (req, res) {
  let inputItem = req.body.guess;
  let errors = req.validationErrors();
  if (errors) {
    res.status(500).send('Whoops, Error Boo!')
  } else if (remainingGuesses > 0) {
    index.match(inputItem[0].toUpperCase());
    index.repeat();
    index.findResult(emptyGuess);
    res.render('game', {
      emptyGuess: index.emptyGuess,
      guessedLetters: index.guessedLetters,
      remainingGuesses: index.remainingGuesses,
      result: index.result
    })
  }
});

app.listen(3000, function(){
  console.log("Successfully started express application!")
});
