import 'bulma/css/bulma.css'
import { useState, useEffect } from 'react'
import { getRandomWord } from './helpers/getRandomWord';
import axios from 'axios'
import Guess from './components/Guess';
import Hints from './components/Hints'

type TScrambledWordArrItem = {
  letter: string,
  letterGuessed: boolean
}

function App() {
  
  const [ word, setWord ] = useState<string|undefined>(undefined)
  const [ scrambledWordArr, setScrambledWordArr ] = useState<TScrambledWordArrItem[]>([])
  const [ wordHints, setWordHints ] = useState<any>(null)
  const [ gameStatus, setGameStatus ] = useState<string>("not-playing")
  const [ guess, setGuess ] = useState<string>("")

  useEffect(() => {
    // Fetch first word behind the scenes
    fetchWord()
    // Prefetch spinner gif
    const spinner = new Image()
    spinner.src = "/spinner.gif"
  }, [])

  useEffect(() => {
    checkMatchingLetters(guess)
  }, [guess])

  const fetchWord = async () => {
    const w = getRandomWord()
    setWord(w)
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
    setScrambledWordArr(scrambleWord(w))
    if(response.data) {
      setWordHints(response.data[0])
      if(gameStatus !== "not-playing") { setGameStatus("playing") }
    }
  }

  const checkMatchingLetters = (guess:string) => {
    if(!scrambledWordArr) { return }
    const guessArr = guess.toLowerCase().split("")

    const scrambledWordArrCopy = [...scrambledWordArr].map(item => {
      if(guessArr.includes(item.letter)) {
        const idx = guessArr.findIndex(letter => letter === item.letter)
        guessArr.splice(idx, 1)
        return {...item, letterGuessed: true}
      } else {
        return {...item, letterGuessed: false}
      }
    })

    setScrambledWordArr(scrambledWordArrCopy)
  }

  const scrambleWord = (w:string) => {
    console.log(w)
    const newWordArr:string[] = w.toLowerCase().split("")
    return newWordArr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => {
        return {
          letter: value,
          letterGuessed: false
        }
      })
  }

  const handleReset = () => {
    setGameStatus("loading")
    setWord(undefined)
    setScrambledWordArr([])
    setWordHints(null)
    fetchWord()
  }

  return (
    <div className="App section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds-tablet is-half-desktop">
            <div className="card has-text-centered">
              <div className="card-content">
                {gameStatus === "not-playing" && (
                  <>
                    <button className="button is-primary" onClick={() => setGameStatus("playing")}>Play</button>
                  </>
                )}
                {gameStatus === "loading" && (
                  <div className="content mb-5">
                    <img src="/spinner.gif" />
                  </div>
                )}
                {gameStatus === "playing" && word && wordHints && scrambledWordArr && (
                  <>
                    <div className="content mb-5">
                      <h2>
                        {scrambledWordArr.map((item, i) => (
                          <span key={i} className={`${item.letterGuessed ? 'has-background-primary' : ''}`}>{item.letter}</span>
                        ))}
                      </h2>
                    </div>
                    <Guess word={word} guess={guess} setGuess={setGuess} handleReset={handleReset} />
                    <Hints word={word} wordHints={wordHints} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
