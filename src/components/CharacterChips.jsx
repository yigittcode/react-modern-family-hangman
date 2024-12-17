import { clsx } from "clsx"

export default function CharacterChips({ availableCharacters, wrongGuessCount }) {
  return (
    <section className="character-chips">
      {availableCharacters.map((character, index) => {
        const isCharacterLost = index < wrongGuessCount
        const styles = {
          backgroundColor: character.backgroundColor,
          color: character.color
        }
        const className = clsx("chip", isCharacterLost && "lost")
        return (
          <span
            className={className}
            style={styles}
            key={character.name}
          >
            {character.name}
          </span>
        )
      })}
    </section>
  )
} 