import { useState } from 'react'


function Guess({ word, handleReset }:{word:string, handleReset:() => void}) {
  
  const [ guess, setGuess ] = useState<string>("")
  const [ correct, setCorrect ] = useState<boolean>(false)
  const [ tryAgain, setTryAgain ] = useState<boolean>(false)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(word.toLowerCase() === guess) {
      setCorrect(!correct)
    } else {
      setTryAgain(true)
      setTimeout(() => {
        setTryAgain(false)
      }, 2000)
    }
    setGuess("")
  }

  return (
    <div className="column mb-5">
      {!correct && (
        <>
          <form onSubmit={handleSubmit}>
            <input className="input" type="text" value={guess} onChange={(e) => setGuess(() => e.target.value)}></input>
          </form>
          { tryAgain && guess === "" && (
            <span>Try again</span>
          )}
        </>
      )}
      {correct && (
        <div className="content">
          <p>Hooray! You guessed the correct word <i>{word}</i></p>
          <button className="button is-primary" onClick={handleReset}>Play again</button>
        </div>
      )}
    </div>
  )
}

export default Guess