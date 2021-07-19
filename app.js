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

const getMapStringFromCharMap = (charMap) => {
  const orderedCharMap = Object.keys(charMap).sort().reduce(
    (obj, key) => {
      obj[key] = charMap[key];
      return obj;
    },
    {}
  );

  return JSON.stringify(orderedCharMap);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getMaps/:word', (req, res) => {

  fs.readFile('./anagramMap2.txt', (err, data) => { // for testing
  // fs.readFile('./anagramMap.txt', (err, data) => { // uncomment for real

    if (err) {
      res.send(JSON.stringify({
        message: "No hash map found. Please run node createDict.js before starting."
      }))
    } else {

      const wordMap = JSON.parse(data.toString());
      
      const desiredWord = req.params.word;
      
      console.log("desiredWord: ", desiredWord)
      
      const charMap = getCharMapFromWord(desiredWord);
      const hash = getMapStringFromCharMap(charMap);
      const solutions = wordMap[hash] || [];
      
      console.log("solutions: ", solutions);
      
      res.send(JSON.stringify({
        solutions
      }));
    }
    
  })
})

app.get('/getWords', (req, res) => {
  const words = fs.readFileSync('/usr/share/dict/words', { encoding: 'utf8' });

  response = JSON.stringify({
    words: words
  })

  res.send(response)
})

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get('/getWord', (req, res) => {
  const words = fs.readFileSync('/usr/share/dict/words', { encoding: 'utf8' });
  const wordsArray = words.split('\n');

  const word = wordsArray[randomIntFromInterval(0, wordsArray.length - 1)]

  response = JSON.stringify({
    // word: word // uncomment for real
    word: 'abase' // for testing 
  })

  res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})