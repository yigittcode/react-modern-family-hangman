import { clsx } from "clsx"

export default function WordDisplay({ currentCharacter, isGameLost, guessedLetters }) {
  return (
    <section className="word">
      {currentCharacter.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
          isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
          <span key={index} className={letterClassName}>
            {shouldRevealLetter ? letter.toUpperCase() : ""}
          </span>
        )
      })}
    </section>
  )
} 