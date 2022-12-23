import { nouns, adjectives, verbs } from "../data/words"

export function getRandomWord(wordType="nouns") {
  let list:string[] = []
  switch(wordType) {
    case "nouns":
      list = nouns
      break
    case "adjectives":
      list = adjectives
      break
    case "verbs":
      list = verbs
      break
  }

  return list[Math.floor(Math.random() * list.length)]
}