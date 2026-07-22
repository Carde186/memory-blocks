function GameOverModal({ livello, ricomincia, home }) {
    return (
        <div className="overlay">
            <div className="modale">
                <h2>Game Over</h2>
                <p>Livello raggiunto: {livello}</p>

                <button className="bottone bottone-primario" onClick={() => ricomincia()}>
                    Ricomincia
                </button>
                <button className="bottone bottone-secondario" onClick={() => home()}>
                    Torna alla home
                </button>
            </div>
        </div>
    );
}

export default GameOverModal;