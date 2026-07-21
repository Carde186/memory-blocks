function StartScreen({ alClicStart, livelloSalvato, cancellaSalvataggio }) {
  const partitaSalvata = livelloSalvato !== null && livelloSalvato > 1;     //vera se c'è un salvataggio e il livello è maggiore di 1

  function continua() {
    alClicStart(livelloSalvato);
  }

  function nuovaPartita() {
    cancellaSalvataggio();
    alClicStart();
  }

  return (
    <div className="schermata-iniziale">
      <h1>Memory Blocks</h1>
      <p>Ricorda le celle che si accendono, poi ripetile.</p>

      {partitaSalvata ? (
        <>
          <button className="bottone bottone-primario" onClick={continua}>
            Continua (livello {livelloSalvato})
          </button>
          <button className="bottone bottone-secondario" onClick={nuovaPartita}>
            Nuova partita
          </button>
        </>
      ) : (
        <button className="bottone bottone-primario" onClick={() => alClicStart()}>
          Inizia
        </button>
      )}
    </div>
  );
}

export default StartScreen;