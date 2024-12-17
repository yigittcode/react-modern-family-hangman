import { useState, useEffect } from "react"
import { characters } from "./characters"
import { phillQuotes } from "./phill-quotes"
import GameHeader from "./components/GameHeader"
import GameStatus from "./components/GameStatus"
import CharacterChips from "./components/CharacterChips"
import WordDisplay from "./components/WordDisplay"
import HintSystem from "./components/HintSystem"
import Keyboard from "./components/Keyboard"

export default function ModernFamilyGame() {
  const [availableCharacters] = useState(() => {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  // State values
  const [currentCharacter, setCurrentCharacter] = useState(() => {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    return availableCharacters[randomIndex].name.toLowerCase();
  });
  const [guessedLetters, setGuessedLetters] = useState([])
  const [showHints, setShowHints] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(() => {
    return Math.floor(Math.random() * availableCharacters.length)
  })
  const [currentQuote, setCurrentQuote] = useState(() => {
    return phillQuotes[Math.floor(Math.random() * phillQuotes.length)]
  })

  // Derived values
  const numGuessesLeft = 3;
  const wrongGuessCount = guessedLetters.filter(letter => !currentCharacter.includes(letter)).length
  const isGameWon = currentCharacter.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentCharacter.includes(lastGuessedLetter)

  // Event handlers
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }

  const handleNextHint = () => {
    if (currentHintIndex < availableCharacters[currentCharacterIndex].hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
    }
  }

  const resetHints = () => {
    setShowHints(false)
    setCurrentHintIndex(0)
  }

  const startNewGame = () => {
    const newIndex = Math.floor(Math.random() * availableCharacters.length);
    setCurrentCharacterIndex(newIndex);
    setCurrentCharacter(availableCharacters[newIndex].name.toLowerCase());
    setGuessedLetters([]);
    resetHints();
    setCurrentQuote(phillQuotes[Math.floor(Math.random() * phillQuotes.length)]);
  }

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * availableCharacters.length);
    setCurrentCharacterIndex(newIndex);
    setCurrentCharacter(availableCharacters[newIndex].name.toLowerCase());
  }, [availableCharacters]);

  return (
    <main>
      <GameHeader currentQuote={currentQuote} />
      
      <GameStatus 
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
        availableCharacters={availableCharacters}
      />

      <CharacterChips 
        availableCharacters={availableCharacters}
        wrongGuessCount={wrongGuessCount}
      />

      <WordDisplay 
        currentCharacter={currentCharacter}
        isGameLost={isGameLost}
        guessedLetters={guessedLetters}
      />

      <HintSystem 
        isGameOver={isGameOver}
        showHints={showHints}
        setShowHints={setShowHints}
        currentHintIndex={currentHintIndex}
        handleNextHint={handleNextHint}
        availableCharacters={availableCharacters}
        currentCharacterIndex={currentCharacterIndex}
      />

      <Keyboard 
        isGameOver={isGameOver}
        guessedLetters={guessedLetters}
        currentCharacter={currentCharacter}
        addGuessedLetter={addGuessedLetter}
      />

      {isGameOver &&
        <button
          className="new-game"
          onClick={startNewGame}
        >New Game</button>}
    </main>
  )
}
