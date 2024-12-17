import { characters } from "./chracters"

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex].name.toLowerCase()
}

export function getFarewellText(character) {
    const options = [
        `Goodbye, ${character}!`,
        `See you later, ${character}!`, 
        `Oh no, not ${character}!`,
        `${character} has left the Dunphy house`,
        `${character} needs a moment`,
        `${character} is taking a break`,
        `${character} went to get coffee`,
        `${character} is having a dramatic exit`,
        `${character} stormed out`,
        `${character} needs some space`,
        `${character} is done with this`,
        `${character} has left the scene`
    ]

    const randomIndex = Math.floor(Math.random() * options.length)
    return options[randomIndex]
}