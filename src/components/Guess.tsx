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
    <div>
      {!correct && (
        <>
          <form onSubmit={handleSubmit}>
            <input type="text" value={guess} onChange={(e) => setGuess(() => e.target.value)}></input>
          </form>
          { tryAgain && guess === "" && (
            <span>Try again</span>
          )}
        </>
      )}
      {correct && (
        <div>
          <span>Hooray! You guessed the correct word <i>{word}</i></span>
          <button onClick={handleReset}>Play again</button>
        </div>
      )}
    </div>
  )
}

export default Guess