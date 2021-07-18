const express = require('express');
const fs = require('fs');

const app = express()
const port = 4500

// to deal with cors errors so one localhost can call another localhost
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const getCharMapFromWord = (word) => {
  const letters = word.split('');

  const map = {};
  for (letter of letters) {
    if (map[letter]) {
      map[letter] += 1;
    } else {
      map[letter] = 1;
    }
  }
  return map;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getPuzzle', (req, res) => {
  
  function makeRandomString(length) {
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
})

app.get('/getMaps', (req, res) => {
  
  // create map from words to character counts
  const words = fs.readFileSync('/usr/share/dict/words', { encoding: 'utf8' });
  const foundWords = words.split('\n').length;
})

app.get('/getMapForWord/:word', (req, res) => {
  
  const word = req.params.word;
  console.log(getCharMapFromWord(word));

})

app.get('/getWords', (req, res) => {
  const words = fs.readFileSync('/usr/share/dict/words', { encoding: 'utf8' });

  response = JSON.stringify({
    words: words
  })

  res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})