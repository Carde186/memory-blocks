import { COLORI_DISPONIBILI } from "../hooks/useColoreCelle";

const ETICHETTE = {
    verde: "Verde",
    blu: "Blu",
    viola: "Viola",
    arancione: "Arancione",
};

function MenuImpostazioni({ coloreAttuale, alClicColore, alClicChiudi }) {
  return (
    <div className="overlay">
      <div className="modale">
        <h2>Impostazioni</h2>
        <p>Colore celle corrette</p>

        <div className="lista-colori">
          {COLORI_DISPONIBILI.map((colore) => {
            const selezionato = colore === coloreAttuale;       //vero se è il colore attualmente selezionato, mi serve per dargli un bordo diverso
            return (
              <button
                key={colore}
                className={`swatch swatch-${colore}${selezionato ? " swatch-selezionato" : ""}`}
                onClick={() => alClicColore(colore)}
                aria-label={ETICHETTE[colore]} ></button>
            );
          })}
        </div>

        <button className="bottone bottone-secondario" onClick={() => alClicChiudi()}> Chiudi </button>
      </div>
    </div>
  );
}

export default MenuImpostazioni;