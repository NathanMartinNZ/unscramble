import { useState } from 'react'


function Hints({ wordHints }:{wordHints:any}) {
  
  const [ showSynonyms, setShowSynonyms ] = useState<boolean>(false)
  const [ showDefinitions, setShowDefinitions ] = useState<boolean>(false)
  
  if(!wordHints) { return <></> }
  const hints = wordHints.meanings.filter((definition:any) => definition.partOfSpeech === "noun")
  console.log(hints)

  return (
    <div className="mb-5">
      {hints && hints.length > 0 && (
      <>
        {/* Synonyms */}
        <div className="my-2">
          {showSynonyms ? (
            <span>Synonyms: {hints[0].synonyms.length > 0 ? hints[0].synonyms.join(", ") : "None found"}</span>
          ) : (
            <button className="button is-light" onClick={() => setShowSynonyms(!showSynonyms)}>Show synonyms</button>
          )}
        </div>

        {/* Definitions */}
        <div className="my-2">
          {showDefinitions ? hints[0].definitions.map((definition:any) => (
            <div key={definition.definition} className="mb-2">{definition.definition}</div>
          )) : (
            <button className="button is-light" onClick={() => setShowDefinitions(!showDefinitions)}>Show definitions</button>
          )}
        </div>
      </>
      )}
    </div>
  )
}

export default Hints