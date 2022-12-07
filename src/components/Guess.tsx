import { useState, useRef, MutableRefObject } from 'react'


function Guess({ word, guess, setGuess, handleReset }:{word:string, guess:string, setGuess:React.Dispatch<React.SetStateAction<string>>, handleReset:() => void}) {
  
  const [ correct, setCorrect ] = useState<boolean>(false)
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(word.toLowerCase() === guess.toLowerCase()) {
      setCorrect(!correct)
    } else {
      inputRef.current.classList.add("incorrect")
      setTimeout(() => {
        inputRef.current.classList.remove("incorrect")
      }, 2000)
    }
    setGuess("")
  }

  return (
    <div className="column mb-5">
      {!correct && (
        <>
          <form onSubmit={handleSubmit}>
            <input className="input" type="text" ref={inputRef} value={guess} onChange={(e) => setGuess(() => e.target.value)}></input>
          </form>
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