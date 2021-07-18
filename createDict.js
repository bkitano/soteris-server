const fs = require('fs');

const words = fs.readFileSync('/usr/share/dict/words', { encoding: 'utf8' });
const foundWords = words.split('\n');

const getCharMapFromWord = (word) => {
    const letters = word.toLowerCase().split('');

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

const wordMap = {};

for (let i = 0; i < foundWords.length; i++) {
    const word = foundWords[i];
    const hashSize = Object.keys(wordMap).length;

    if (hashSize % 1000 == 0) {
        console.log("map is ", hashSize)
    }

    if (i % 1000 == 0) {
        console.log("word is ", i, word)
    }

    const charMap = getCharMapFromWord(word);
    const hash = getMapStringFromCharMap(charMap);

    if (wordMap[hash]) {
        wordMap[hash].push(word);
    } else {
        wordMap[hash] = [word];
    }
}

const wordMapData = JSON.stringify(wordMap);

// save the map to disk to load later
fs.writeFile('./anagramMap.txt', wordMapData, (err) => {
    if (err) {
        console.log(err);
    }
});