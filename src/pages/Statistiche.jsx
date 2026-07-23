import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useGameLogic } from "../hooks/useGameLogic.js";

function Statistiche() {
    const gioco = useGameLogic();

    const cePartite = gioco.storico.length > 0;

    // Aggiungo un numero progressivo univoco a ogni partita (1, 2, 3...),
    // così l'asse X ha sempre valori unici anche se le date si ripetono.
    const datiGrafico = gioco.storico.map((partita, indice) => ({
        numeroPartita: indice + 1,
        livello: partita.livello - 1,
        data: partita.data,
    }));

    return (
        <div className="app">
            <div className="pagina-statistiche">
                <h1>Statistiche</h1>

                <div className="stat-riepilogo">
                    <span>Record: {gioco.record > 0 ? gioco.record : "-"}</span>
                    <span>Partite giocate: {gioco.storico.length}</span>
                </div>

                {cePartite ? (
                    <div className="grafico-contenitore">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={datiGrafico}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--bordo)" />
                                <XAxis
                                    dataKey="numeroPartita"
                                    stroke="var(--testo-attenuato)"
                                    interval={0}
                                    label={{ value: "Partita n.", position: "insideBottom", offset: -5 }}
                                />
                                <YAxis 
                                    stroke="var(--testo-attenuato)" 
                                    allowDecimals={false} 
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--pannello)",
                                        border: "1px solid var(--bordo)",
                                        color: "var(--testo)",
                                    }}
                                    labelFormatter={(numeroPartita, payload) => {
                                        const data = payload[0]?.payload.data;
                                        return `Partita ${numeroPartita} (${data})`;
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="livello"
                                    stroke="#34f5a0"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p>Gioca almeno una partita per vedere il grafico dei tuoi progressi.</p>
                )}

                <Link to="/" className="bottone bottone-primario">
                    Torna al gioco
                </Link>
            </div>
        </div>
    );
}

export default Statistiche;