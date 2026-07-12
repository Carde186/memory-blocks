import Cell from "./Cell.jsx";
import { STATI } from "../hooks/useGameLogic.js";

function GameBoard({ stato, dimensioneGriglia, pattern, celleGiuste, celleSbagliata, alClic }) {
  const totaleCelle = dimensioneGriglia * dimensioneGriglia;
  const celleBloccate = stato !== STATI.GUESSING;

  const celle = [];
  for (let i = 0; i < totaleCelle; i++) {
    let colore = "spenta";

    if (i === celleSbagliata) {
      colore = "rossa";
    } else if (celleGiuste.includes(i)) {
      colore = "verde";
    } else if (stato === STATI.SHOWING && pattern.includes(i)) {
      colore = "verde";
    }

    celle.push(
      <Cell
        key={i}        
        indice={i}
        colore={colore}
        disabilitata={celleBloccate}
        alClic={alClic}
      />
    );
  }

  return (
    <div
      className="griglia"
      style={{ gridTemplateColumns: `repeat(${dimensioneGriglia}, 1fr)` }}
    >
      {celle}
    </div>
  );
}

export default GameBoard;