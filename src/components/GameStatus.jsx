import { clsx } from "clsx"
import { getFarewellText } from "../utils"
import Confetti from "react-confetti"

export default function GameStatus({ isGameOver, isGameWon, isGameLost, isLastGuessIncorrect, wrongGuessCount, availableCharacters }) {
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(availableCharacters[wrongGuessCount - 1].name)}
        </p>
      )
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done!, Family is together. 🎉</p>
        </>
      )
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Time for a family meeting 😭</p>
        </>
      )
    }

    return null
  }

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}
      >
        {renderGameStatus()}
      </section>
    </>
  )
} 