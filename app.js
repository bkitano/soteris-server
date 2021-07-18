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

app.get('/getMaps/:word', (req, res) => {

  fs.readFile('./anagramMap2.txt', (err, data) => {

    if (err) {

      // // create map from words to character counts
      // const words = fs.readFileSync('/usr/share/dict/words', { encoding: 'utf8' });
      // const foundWords = words.split('\n');

      // const wordMap = {};

      // for (word of foundWords) {
      //   const charMap = getCharMapFromWord(word);
      //   const hash = getMapStringFromCharMap(charMap);

      //   if (wordMap[hash]) {
      //     wordMap[hash].push(word);
      //   } else {
      //     wordMap[hash] = [word];
      //   }
      // }

      // const wordMapData = JSON.stringify(wordMap);

      // // save the map to disk to load later
      // fs.writeFile('./anagramMap.txt', wordMapData, (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });

      res.send(JSON.stringify({
        message: "No hash map found. Please try again later."
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

app.get('/getMapForWord/:word', (req, res) => {

  const word = req.params.word;
  const charMap = getCharMapFromWord(word);
  const hash = getMapStringFromCharMap(charMap);

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