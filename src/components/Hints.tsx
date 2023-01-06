import { useState, useMemo } from 'react'


function Hints({ word, wordHints }:{word:string, wordHints:any}) {
  
  const firstLetter = useMemo(() => word.split("")[0], [word])
  const [ showFirstLetter, setShowFirstLetter ] = useState<boolean>(false)
  const [ showSynonyms, setShowSynonyms ] = useState<boolean>(false)
  const [ showDefinitions, setShowDefinitions ] = useState<boolean>(false)
  const [ revealWord, setRevealWord ] = useState<boolean>(false)

  const FirstLetter = () => {
    return (
      <div className="my-2">
        {showFirstLetter ? (
          <span><b>{firstLetter.toUpperCase()}</b></span>
        ) : (
          <button className="button is-light" onClick={() => setShowFirstLetter(!showFirstLetter)}>Show first letter</button>
        )}
      </div>
    )
  }
  
  const Synonyms = () => {
    if(!hints[0].synonyms.length) return <></>

    return (
      <div className="my-2">
        {showSynonyms ? (
          <span>Synonyms: {hints[0].synonyms.join(", ")}</span>
        ) : (
          <button className="button is-light" onClick={() => setShowSynonyms(!showSynonyms)}>Show synonyms</button>
        )}
      </div>
    )
  }

  const Reveal = () => {
    return (
      <div className="my-2">
        {revealWord ? (
          <span>{word}</span>
        ) : (
          <button className="button is-light" onClick={() => setRevealWord(!revealWord)}>Just tell me</button>
        )}
      </div>
    )
  }

  const Definitions = () => {
    if(!hints[0].definitions.length) return <></>

    return (
      <div className="my-2">
          {showDefinitions ? hints[0].definitions.map((definition:any) => (
            <div key={definition.definition} className="mb-2">{definition.definition}</div>
          )) : (
            <button className="button is-light" onClick={() => setShowDefinitions(!showDefinitions)}>Show definitions</button>
          )}
      </div>
    )
  }
  
  if(!wordHints) { return <></> }
  const hints = wordHints.meanings

  return (
    <div className="mb-5">
      {hints && hints.length > 0 && (
      <>
        <FirstLetter />
        <Synonyms />
        <Definitions />
        <Reveal />
      </>
      )}
    </div>
  )
}

export default Hints