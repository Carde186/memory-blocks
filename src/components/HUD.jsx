import { MAX_LIVES } from "../gameConfig.js";

const MESSAGGI = {
  showing: "Memorizza le celle accese",
  guessing: "Ripeti il pattern",
  success: "Livello superato!",
  gameover: "Partita finita",
  idle: "",
};

function HUD({ stato, livello, vite, dimensioneGriglia }) {
  return (
    <div className="hud">
      <div className="hud-riga">
        <span>Livello: {livello}</span>
        <span>Griglia: {dimensioneGriglia}x{dimensioneGriglia}</span>
      </div>

      <div className="vite">
        {Array.from({ length: MAX_LIVES }, (_, i) => (
          <span key={i} className={i < vite ? "cuore cuore-pieno" : "cuore cuore-vuoto"}>
            ❤
          </span>
        ))}
      </div>

      <p className="hud-messaggio">{MESSAGGI[stato]}</p>
    </div>
  );
}

export default HUD;