import { clsx } from "clsx"

export default function Keyboard({ isGameOver, guessedLetters, currentCharacter, addGuessedLetter }) {
  return (
    <section className="keyboard">
      {"abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentCharacter.includes(letter)
        const isWrong = isGuessed && !currentCharacter.includes(letter)
        const className = clsx({
          correct: isCorrect,
          wrong: isWrong
        })

        return (
          <button
            className={className}
            key={letter}
            disabled={isGameOver || isGuessed}
            aria-disabled={guessedLetters.includes(letter)}
            aria-label={`Letter ${letter}`}
            onClick={() => addGuessedLetter(letter)}
          >
            {letter.toUpperCase()}
          </button>
        )
      })}
    </section>
  )
} 