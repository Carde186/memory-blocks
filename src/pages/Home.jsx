import { useGameLogic, STATI } from "../hooks/useGameLogic.js";

import GameBoard from "../components/GameBoard.jsx";
import HUD from "../components/HUD.jsx";
import StartScreen from "../components/StartScreen.jsx";
import GameOverModal from "../components/GameOverModal.jsx";

import { getGridSize } from "../gameConfig.js";
import { useTheme } from "../hooks/useTheme.jsx";

import { useState } from "react";
import { useColoreCelle } from "../hooks/useColoreCelle.js";
import MenuImpostazioni from "../components/MenuImpostazioni.jsx";

import { Link } from 'react-router-dom'


function Home() {
    const gioco = useGameLogic();
    const { tema, cambiaTema } = useTheme();

    const [coloreCelle, cambiaColoreCelle] = useColoreCelle();
    const [menuAperto, setMenuAperto] = useState(false);

    const dimensioneGriglia = getGridSize(gioco.livello);
    const partitaIniziata = gioco.stato !== STATI.IDLE;

    return (
        <div className="app">
            <div className="barra-in-alto">
                <button className="bottone-tema" onClick={() => cambiaTema()}>
                    {tema === "scuro" ? "☀️ Chiaro" : "🌙 Scuro"}
                </button>

                <button className="bottone-tema" onClick={() => setMenuAperto(true)}> ⚙️ Colori </button>

                <Link to="/statistiche" className="bottone-tema"> 📊 Statistiche </Link>
            </div>

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

            {menuAperto && (
                <MenuImpostazioni
                    coloreAttuale={coloreCelle}
                    alClicColore={cambiaColoreCelle}
                    alClicChiudi={() => setMenuAperto(false)}
                />
            )}
        </div>
    );
}

export default Home;
