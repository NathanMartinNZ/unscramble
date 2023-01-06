import 'bulma/css/bulma.css'
import { useState, useEffect } from 'react'
import { getRandomWord } from './helpers/getRandomWord';
import axios from 'axios'
import Guess from './components/Guess';
import Hints from './components/Hints'
import SettingsModal from './components/SettingsModal';

type TScrambledWordArrItem = {
  letter: string,
  letterGuessed: boolean
}

function App() {
  let fetchWordAttempts = 0
  const [ word, setWord ] = useState<string|undefined>(undefined)
  const [ scrambledWordArr, setScrambledWordArr ] = useState<TScrambledWordArrItem[]>([])
  const [ wordHints, setWordHints ] = useState<any>(null)
  const [ gameStatus, setGameStatus ] = useState<string>("not-playing")
  const [ guess, setGuess ] = useState<string>("")
  const [ showSettings, setShowSettings ] = useState<boolean>(false)
  const [ typeOfWord, setTypeOfWord ] = useState<string>("all")

  useEffect(() => {
    // Fetch first word behind the scenes & when settings change
    fetchWord()
  }, [typeOfWord])

  useEffect(() => {
    checkMatchingLetters(guess)
  }, [guess])

  const fetchWord = async () => {
    const w = getRandomWord(typeOfWord)
    setWord(w)
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
      setScrambledWordArr(scrambleWord(w))
      if(response.data) {
        setWordHints(response.data[0])
        fetchWordAttempts = 0
        if(gameStatus !== "not-playing") { setGameStatus("playing") }
      }
    } catch(err) {
      fetchWordAttempts++
      fetchWordAttempts < 5 ? fetchWord() : setGameStatus("error")
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
          <div className="game-container column is-two-thirds-tablet is-half-desktop">
            <div className="card has-text-centered">
              <div className="card-content">
                {gameStatus === "not-playing" && (
                  <button className="button is-primary" onClick={() => setGameStatus("playing")}>Play</button>
                )}
                {gameStatus === "loading" && (
                  <div className="content mb-5">
                    <img src="/spinner.gif" />
                  </div>
                )}
                {gameStatus === "error" && (
                  <h4 className="is-size-4">Something went wrong :( <br/>Try refresh the page</h4>
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
            <div className="settings">
              <button className="button" onClick={() => setShowSettings(true)}>&#9881;</button>
            </div>
            <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings} typeOfWord={typeOfWord} setTypeOfWord={setTypeOfWord} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
