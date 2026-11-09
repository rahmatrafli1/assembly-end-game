import React from "react";

export default function AssemblyEndGame() {
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
    </main>
  );
}
