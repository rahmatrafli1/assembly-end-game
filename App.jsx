import React from "react";
import { languages } from "./languages";

export default function AssemblyEndGame() {
  const [currentWord, setCurrentWord] = React.useState("react");
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((lang) => (
    <span
      className="chip"
      key={lang.name}
      style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
    >
      {lang.name}
    </span>
  ));

  const letterElements = currentWord
    .split("")
    .map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  const keyboardElements = alphabet.split("").map((letter) => (
    <button key={letter} onClick={() => addGuessedLetter(letter)}>
      {letter.toUpperCase()}
    </button>
  ));

  return (
    <main>
      <header className="game-header">
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
