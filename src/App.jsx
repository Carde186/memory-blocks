  import { useGameLogic, STATI } from "./hooks/useGameLogic.js";

  import GameBoard from "./components/GameBoard.jsx";
  import HUD from "./components/HUD.jsx";
  import StartScreen from "./components/StartScreen.jsx";
  import GameOverModal from "./components/GameOverModal.jsx";

  import { getGridSize } from "./gameConfig.js";

  function App() {
    const gioco = useGameLogic();

    const dimensioneGriglia = getGridSize(gioco.livello);
    const partitaIniziata = gioco.stato !== STATI.IDLE;

    return (
      <div className="app">
        {!partitaIniziata ? (
          <StartScreen alClicStart={gioco.iniziaPartita} />
        ) : (
          <>
            <HUD
              stato={gioco.stato}
              livello={gioco.livello}
              vite={gioco.vite}
              dimensioneGriglia={dimensioneGriglia}
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
