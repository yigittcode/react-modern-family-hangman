export default function HintSystem({ 
  isGameOver, 
  showHints, 
  setShowHints, 
  currentHintIndex, 
  handleNextHint, 
  availableCharacters, 
  currentCharacterIndex 
}) {
  return (
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
            Hint #{currentHintIndex + 1}: {availableCharacters[currentCharacterIndex].hints[currentHintIndex]}
          </p>
          <button 
            className="next-hint-button"
            onClick={handleNextHint}
            disabled={currentHintIndex >= availableCharacters[currentCharacterIndex].hints.length - 1}
          >
            Next Hint ({currentHintIndex + 1}/{availableCharacters[currentCharacterIndex].hints.length})
          </button>
        </div>
      )}
    </section>
  )
} 