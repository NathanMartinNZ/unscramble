import { useState } from 'react'


function Hints({ wordHints }:{wordHints:any}) {
  
  const [ showSynonyms, setShowSynonyms ] = useState<boolean>(false)
  const [ showDefinitions, setShowDefinitions ] = useState<boolean>(false)
  
  if(!wordHints) { return <></> }
  const hints = wordHints.meanings.filter((definition:any) => definition.partOfSpeech === "noun")
  console.log(hints)

  return (
    <div>
      {hints && hints.length > 0 && (
      <>
        {/* Synonyms */}
        <div>
          {showSynonyms ? (
            <span>Synonyms: {hints[0].synonyms.length > 0 ? hints[0].synonyms.join(", ") : "None found"}</span>
          ) : (
            <button onClick={() => setShowSynonyms(!showSynonyms)}>Show synonyms</button>
          )}
        </div>

        {/* Definitions */}
        <div>
          {showDefinitions ? hints[0].definitions.map((definition:any) => (
            <div key={definition.definition}>{definition.definition}</div>
          )) : (
            <button onClick={() => setShowDefinitions(!showDefinitions)}>Show definitions</button>
          )}
        </div>
      </>
      )}
    </div>
  )
}

export default Hints