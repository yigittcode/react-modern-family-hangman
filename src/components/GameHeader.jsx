import { phillQuotes } from "../phill-quotes"

export default function GameHeader({ currentQuote }) {
  return (
    <header>
      <h1>Modern Family Character Game</h1>
      <p>Guess which Modern Family character this is within 3 attempts!</p>
      <blockquote className="phil-quote">
        "{currentQuote}"
        <footer>- Phil Dunphy</footer>
      </blockquote>
    </header>
  )
} 