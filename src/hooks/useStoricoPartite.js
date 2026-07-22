import { useState } from "react";

const KEY = "storico-partite";

export function useStoricoPartite() {
    const [storico, setStorico] = useState(() => {
        const salvato = localStorage.getItem(KEY);
        if (salvato !== null) {
            return JSON.parse(salvato);
        }
        return [];               //nessuna partita ancora giocata
    });

    function aggiungiPartita(livelloRaggiunto) {        //aggiungo una partita conclusa allo storico
        const oggi = new Date();
        const dataFormattata = `${oggi.getDate()}/${oggi.getMonth() + 1}`;          //formattazione della data: 22(giorno)/7(mese). il +1 perchè i mesi vanno da 0 a 11

        const nuovaPartita = {
            data: dataFormattata,
            livello: livelloRaggiunto,
        };

        const nuovoStorico = [...storico, nuovaPartita];            //crea un array con tutti gli elementi di storico più nuovaPartita aggiunta in fondo
        setStorico(nuovoStorico);
        localStorage.setItem(KEY, JSON.stringify(nuovoStorico));
    }

    return [storico, aggiungiPartita];
}