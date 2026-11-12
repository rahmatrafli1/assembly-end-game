# Assembly: Endgame

A word-guessing game built with React and Vite. Guess the hidden word before you run out of attempts or time, or the programming languages fall one by one until only **Assembly** remains.

## Features

- **Hangman-style gameplay**: guess letters on an on-screen A–Z keyboard.
- **Language "lives"**: each wrong guess eliminates a programming language chip (HTML, CSS, JavaScript, React, TypeScript, Node.js, Python, Ruby). Eight wrong guesses lose the game (`languages.length - 1`).
- **60-second timer**: the timer turns red at 10 seconds or less. Running out of time ends the game.
- **Farewell messages**: a random message appears each time a language is lost.
- **Win and lose effects**: confetti on a win, and falling skull and bug emojis on a loss.
- **Reveal on loss**: missed letters are shown when the game is lost.
- **Accessibility**: ARIA live regions announce the latest guess, the remaining attempts and the current word state to screen readers.
- **New Game button**: appears when a game ends and picks a new random word.

## Tech Stack

| Tool                                                         | Purpose                 |
| ------------------------------------------------------------ | ----------------------- |
| [React 19 (RC)](https://react.dev/)                          | UI library              |
| [Vite](https://vitejs.dev/)                                  | Dev server and bundler  |
| [clsx](https://github.com/lukeed/clsx)                       | Conditional class names |
| [react-confetti](https://github.com/alampros/react-confetti) | Win celebration effect  |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (a current LTS version is recommended)
- npm

### Installation

```bash
npm install
```

### Run the development server

```bash
npm start
```

`npm run dev` does the same thing. Then open the URL printed in the terminal (usually `http://localhost:5173`).

### Available scripts

| Command                     | Description                          |
| --------------------------- | ------------------------------------ |
| `npm start` / `npm run dev` | Start the Vite development server    |
| `npm run build`             | Create a production build            |
| `npm run preview`           | Preview the production build locally |

## How to Play

1. A random word is chosen and shown as blank slots.
2. Click a letter on the keyboard. Correct letters are revealed in the word, and wrong letters are marked.
3. Each wrong guess removes one language chip and shows a farewell message.
4. **You win** if you reveal every letter of the word.
5. **You lose** if you make 8 wrong guesses or the 60-second timer reaches zero.
6. Click **New Game** to play again.

## Project Structure

```
.
├── index.html      # HTML entry point
├── index.jsx       # React entry point (mounts the app)
├── App.jsx         # Main game component and game logic
├── index.css       # Styles
├── languages.js    # Language chips (name and colors) that act as lives
├── words.js        # List of words to guess
├── utils.js        # getRandomWord() and getFarewellText()
├── vite.config.js  # Vite configuration (React plugin)
└── package.json    # Dependencies and scripts
```

## How It Works

The game logic lives in the `AssemblyEndGame` component in [App.jsx](./App.jsx).

**State**

- `currentWord`: the word to guess.
- `guessedLetters`: the letters the player has guessed.
- `timeLeft`: seconds remaining, starting at `TIME_LIMIT` (60).

**Derived values**

- `wrongGuessCount`: guessed letters that aren't in the word.
- `numGuessesLeft`: `languages.length - 1 - wrongGuessCount`.
- `isGameWon`, `isGameLost`, `isGameOver`: computed from the guesses and the timer rather than stored.

**Effects**

- A one-second interval decrements the timer while the game is running.
- Page scrolling is locked while the confetti plays after a win.
- `useViewportSize` keeps the confetti canvas sized to the viewport.

**Helpers** (in [utils.js](./utils.js))

- `getRandomWord()`: returns a random entry from `words.js`.
- `getFarewellText(language)`: returns a random farewell message for the eliminated language.

## Customization

- **Change the time limit**: edit `TIME_LIMIT` in `App.jsx`.
- **Add or remove words**: edit the array in `words.js`. Use lowercase words, since the keyboard is lowercase `a–z`.
- **Change the difficulty**: add or remove entries in `languages.js`. The number of allowed wrong guesses is `languages.length - 1`.
- **Add farewell messages**: add strings to the `options` array in `getFarewellText`.

## Credits

This project is based on the final project of the [Scrimba](https://scrimba.com/) Frontend Developer Career Path. Scrimba aims to create the best possible coding school at the cost of a gym membership.

- [Scrimba courses](https://scrimba.com/courses)
- [The Frontend Career Path](https://scrimba.com/fullstack-path-c0fullstack)
- [Scrimba Pro](https://scrimba.com/pricing)

Happy coding!
