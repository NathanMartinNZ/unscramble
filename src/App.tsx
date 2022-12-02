import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Guess from './components/Guess';
import Hints from './components/Hints'


function App() {
  
  const [ word, setWord ] = useState<string|undefined>(undefined)
  const [ scrambledWord, setScrambledWord ] = useState<string|undefined>(undefined)
  const [ wordHints, setWordHints ] = useState<any>(null)
  const [ playing, setPlaying ] = useState<boolean>(false)

  useEffect(() => {
    fetchWord()
  }, [])

  const fetchWord = () => {
    axios.get("https://random-words-api.vercel.app/word/noun")
      .then(res => {
        if(res.data) {
          const w:string = res.data[0].word
          setWord(w)
          console.log(w)
          setScrambledWord(scrableWord(w))
          axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
            .then(res => {
              if(res.data) {
                setWordHints(res.data[0])
              }
            })
        }
      })
  }

  const scrableWord = (word:string) => {
    return word
      .toLowerCase()
      .split("")
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .join("")
  }

  const handleReset = () => {
    setWord(undefined)
    setScrambledWord(undefined)
    setWordHints(null)
    fetchWord()
  }

  return (
    <div className="App">
      {!playing && (
        <div>
          <button onClick={() => setPlaying(!playing)}>Play</button>
        </div>
      )}
      {playing && word && wordHints && scrambledWord && (
        <div>
          {scrambledWord}
          <Guess word={word} handleReset={handleReset} />
          <Hints wordHints={wordHints} />
        </div>
      )}
    </div>
  );
}

export default App;
