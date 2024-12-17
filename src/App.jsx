import { useState, useEffect } from "react"
import { clsx } from "clsx"
import { characters } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"

export default function ModernFamilyGame() {
  // State values
  const [currentCharacter, setCurrentCharacter] = useState(() => {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex].name.toLowerCase()
  })
  const [guessedLetters, setGuessedLetters] = useState([])
  const [showHints, setShowHints] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(() => {
    return Math.floor(Math.random() * characters.length)
  })

  // Derived values
  const numGuessesLeft = characters.length - 1
  const wrongGuessCount = guessedLetters.filter(letter => !currentCharacter.includes(letter)).length
  const isGameWon = currentCharacter.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentCharacter.includes(lastGuessedLetter)

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }

  const handleNextHint = () => {
    if (currentHintIndex < characters[currentCharacterIndex].hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
    }
  }

  const resetHints = () => {
    setShowHints(false)
    setCurrentHintIndex(0)
  }

  const startNewGame = () => {
    const newIndex = Math.floor(Math.random() * characters.length)
    setCurrentCharacterIndex(newIndex)
    setCurrentCharacter(characters[newIndex].name.toLowerCase())
    setGuessedLetters([])
    resetHints()
  }

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * characters.length)
    setCurrentCharacterIndex(newIndex)
    setCurrentCharacter(characters[newIndex].name.toLowerCase())
  }, [])

  const languageElements = characters.map((char, index) => {
    const isLanguageLost = index < wrongGuessCount
    const styles = {
      backgroundColor: char.backgroundColor,
      color: char.color
    }
    const className = clsx("chip", isLanguageLost && "lost")
    return (
      <span
        className={className}
        style={styles}
        key={char.name}
      >
        {char.name}
      </span>
    )
  })

  const letterElements = currentCharacter.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    )
  })

  const keyboardElements = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
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
  })

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(characters[wrongGuessCount - 1].name)}
        </p>
      )
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Time for a family meeting 😭</p>
          <p>The character was: {currentCharacter.toUpperCase()}</p>
        </>
      )
    }

    return null
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      
      <header>
        <h1>Modern Family Character Game</h1>
        <p>Guess which Modern Family character this is within {characters.length - 1} attempts!</p>
      </header>

      <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}
      >
        {renderGameStatus()}
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="hint-section">
        <button 
          className="hint-button"
          onClick={() => setShowHints(true)}
          disabled={isGameOver || showHints}
        >
          Need Hints?
        </button>
        
        {showHints && (
          <div className="hints-container">
            <p className="character-hint">
              Hint #{currentHintIndex + 1}: {characters[currentCharacterIndex].hints[currentHintIndex]}
            </p>
            <button 
              className="next-hint-button"
              onClick={handleNextHint}
              disabled={currentHintIndex >= characters[currentCharacterIndex].hints.length - 1}
            >
              Next Hint ({currentHintIndex + 1}/{characters[currentCharacterIndex].hints.length})
            </button>
          </div>
        )}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver &&
        <button
          className="new-game"
          onClick={startNewGame}
        >New Game</button>}
    </main>
  )
}
