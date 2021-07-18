const express = require('express');
const fs = require('fs');

const app = express()
const port = 4500

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getWords', (req, res) => {
    const words = fs.readFileSync('/usr/share/dict/words', {encoding: 'utf8'});

    response = JSON.stringify({
      words: words
    })

    res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})