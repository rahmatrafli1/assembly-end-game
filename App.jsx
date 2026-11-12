import { useEffect, useState } from "react";
import { languages } from "./languages";
import { clsx } from "clsx";
import { getFarewellText, getRandomWord } from "./utils";
import ReactConfetti from "react-confetti";

function useViewportSize() {
  const get = () => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  const [size, setSize] = useState(get);

  useEffect(() => {
    const onResize = () => setSize(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}

export default function AssemblyEndGame() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const TIME_LIMIT = 60;
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  const maxWrongGuesses = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const numGuessesLeft = maxWrongGuesses - wrongGuessCount;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isTimeUp = timeLeft <= 0;
  const isGameLost = !isGameWon && (numGuessesLeft <= 0 || isTimeUp);
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const className = clsx("chip", isLanguageLost && "lost");
    const styles = { backgroundColor: lang.backgroundColor, color: lang.color };

    return (
      <span className={className} key={lang.name} style={styles}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const shouldReveal = isGuessed || isGameLost;
    const className = clsx(isGameLost && !isGuessed && "missed-letter");

    return (
      <span key={index} className={className}>
        {shouldReveal ? letter.toUpperCase() : ""}
      </span>
    );
  });

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        key={letter}
        className={className}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (!isGameOver) return null;

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }

    return (
      <>
        <h2>Game over!</h2>
        <p>
          {isTimeUp
            ? "Time's up! ⏰"
            : "You lose! Better start learning Assembly 😭"}
        </p>
      </>
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setTimeLeft(TIME_LIMIT);
  }

  const { width, height } = useViewportSize();

  useEffect(() => {
    if (!isGameWon) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = "";
    };
  }, [isGameWon]);

  useEffect(() => {
    if (isGameWon || isGameLost) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isGameWon, isGameLost]);

  return (
    <main>
      {isGameWon && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      {isGameLost && (
        <div className="anti-confetti" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {["💀", "☠️", "🐛", "💥"][i % 4]}
            </span>
          ))}
        </div>
      )}
      <header className="game-header">
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct The Letter ${lastGuessedLetter} is in the word.`
            : `Sorry, The Letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current Word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank.",
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboardElements}</section>
      <p className="guesses-left">
        Remaining guesses: <strong>{numGuessesLeft}</strong>
      </p>
      <p className={clsx("timer", timeLeft <= 10 && "danger")}>⏱ {timeLeft}s</p>
      {isGameOver && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </main>
  );
}
