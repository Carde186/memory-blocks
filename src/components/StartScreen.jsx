function StartScreen({ alClicStart }) {
    return (
      <div className="schermata-iniziale">
        <h1>Memory Blocks</h1>
        <p>Ricorda le celle che si accendono, poi ripetile.</p>
        <button className="bottone bottone--primario" onClick={alClicStart}>
          Inizia
        </button>
      </div>
    );
}
  
export default StartScreen;