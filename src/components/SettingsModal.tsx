import React from "react"
import { useRef } from "react"

function SettingsModal({ showSettings, setShowSettings, typeOfWord, setTypeOfWord }:
        { showSettings:boolean, 
          setShowSettings:React.Dispatch<React.SetStateAction<boolean>>,
          typeOfWord:string,
          setTypeOfWord:React.Dispatch<React.SetStateAction<string>>
        } 
    ) {

    const wordTypeRef = useRef<HTMLSelectElement>(null)

    const handleSubmitSettings = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(wordTypeRef.current) { setTypeOfWord(wordTypeRef.current.value) }
        setShowSettings(false)
    }

    return (
        <div className={`modal ${showSettings ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Settings</p>
                    <button className="delete" aria-label="close" onClick={() => setShowSettings(false)}></button>
                </header>
                <section className="modal-card-body">
                    
                        <form onSubmit={handleSubmitSettings}>
                            <div className="field">
                                <label className="label" htmlFor="word-type">Type of words:</label>
                                <div className="control">
                                    <div className="select">
                                        <select className="" name="word-type" id="word-type" defaultValue={typeOfWord} ref={wordTypeRef}>
                                            {["all", "nouns", "adjectives", "verbs"].map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button className="button is-success" type="submit">Save changes</button>
                        </form>

                </section>
            </div>
        </div>
    )
}

export default SettingsModal