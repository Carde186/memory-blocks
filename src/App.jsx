  import { useGameLogic, STATI } from "./hooks/useGameLogic.js";

  import GameBoard from "./components/GameBoard.jsx";
  import HUD from "./components/HUD.jsx";
  import StartScreen from "./components/StartScreen.jsx";
  import GameOverModal from "./components/GameOverModal.jsx";

  import { getGridSize } from "./gameConfig.js";
  import { useTheme } from "./hooks/useTheme.jsx";

  function App() {
    const gioco = useGameLogic();
    const { tema, cambiaTema } = useTheme();

    const dimensioneGriglia = getGridSize(gioco.livello);
    const partitaIniziata = gioco.stato !== STATI.IDLE;

    return (
      <div className="app">
        <button className="bottone-tema" onClick={() => cambiaTema()}>
          {tema === "scuro" ? "☀️ Chiaro" : "🌙 Scuro"}
        </button>

        {!partitaIniziata ? (
          <StartScreen
            alClicStart={gioco.iniziaPartita}
            livelloSalvato={gioco.livelloSalvato}
            cancellaSalvataggio={gioco.cancellaSalvataggio}
          />
        ) : (
          <>
            <HUD
              stato={gioco.stato}
              livello={gioco.livello}
              vite={gioco.vite}
              record={gioco.record}
              dimensioneGriglia={dimensioneGriglia}
              alClicEsci={gioco.salvaEEsci}
            />

            <GameBoard
              stato={gioco.stato}
              dimensioneGriglia={dimensioneGriglia}
              pattern={gioco.pattern}
              celleGiuste={gioco.celleGiuste}
              celleSbagliata={gioco.celleSbagliata}
              alClic={gioco.clickCella}
            />
          </>
        )}

        {gioco.stato === STATI.GAMEOVER && (
          <GameOverModal
            livello={gioco.livello}
            ricomincia={gioco.iniziaPartita}
            home={gioco.tornaAllaHome}
          />
        )}
      </div>
    );
  }

  export default App;
