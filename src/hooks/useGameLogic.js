import { useState, useRef, useCallback } from "react";

import {
    MAX_LIVES,
    getGridSize,
    getPatternCount,
    getShowTime,
    generatePattern,
} from "../gameConfig.js";

import { useRecord } from "./useRecord.js";
import { useLivelloSalvato } from "./useLivelloSalvato.js";

export const STATI = {          
    IDLE: "idle",               //schermata iniziale
    SHOWING: "showing",         //si accendono le celle
    GUESSING: "guessing",       //l'utente gioca
    SUCCESS: "success",         //livello superato
    GAMEOVER: "gameover",       //vite finite
};
  

export function useGameLogic() {
    const [stato, setStato] = useState(STATI.IDLE);
    const [livello, setLivello] = useState(1);
    const [vite, setVite] = useState(MAX_LIVES);
    const [record, aggiornaRecord] = useRecord();
    const [livelloSalvato, salvaLivello, cancellaSalvataggio] = useLivelloSalvato();

    const [pattern, setPattern] = useState([]);                     //celle da indovinare
    const [celleGiuste, setCelleGiuste] = useState([]);             //celle indovinate
    const [celleSbagliata, setCellaSbagliata] = useState(null);     //ultima cella cliccata sbagliata

    const timerRef = useRef(null);          //per tenere traccia di un eventuale timeout attivo



    function avviaLivello(nuovoLivello) {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const size = getGridSize(nuovoLivello);
        const quanteCelle = getPatternCount(nuovoLivello);
        const nuovoPattern = generatePattern(size * size, quanteCelle);

        setPattern(nuovoPattern);
        setCelleGiuste([]);
        setCellaSbagliata(null);
        setStato(STATI.SHOWING);        //mostro il pattern
        salvaLivello(nuovoLivello);     //salvo il progresso ogni volta che parte un livello

        //dopo un po' di tempo, spengo il pattern e do il via ai click
        timerRef.current = setTimeout(() => {
            setStato(STATI.GUESSING);
        }, getShowTime(nuovoLivello));
    }
    
    function iniziaPartita(livelloDiPartenza = 1) {
        setLivello(livelloDiPartenza);
        setVite(MAX_LIVES);
        avviaLivello(livelloDiPartenza);
    }

    function tornaAllaHome() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setStato(STATI.IDLE);
        setLivello(1);
        setVite(MAX_LIVES);
        cancellaSalvataggio();
    }

    function salvaEEsci() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setStato(STATI.IDLE);
        setVite(MAX_LIVES);
    }

    function clickCella(indice) {
        if (stato !== STATI.GUESSING) {     //contano solo i click durante lo stato "guessing"
            return;         
        }       

        if (celleGiuste.includes(indice)) {     //ignoro il doppio click se ho già cliccato una cella "giusta"
            return;         
        }


        const eGiusta = pattern.includes(indice);

        if (eGiusta) {
            const nuoveGiuste = [...celleGiuste, indice];
            setCelleGiuste(nuoveGiuste);

            if (nuoveGiuste.length === pattern.length) {        //controllo se ho completato il pattern
                aggiornaRecord(livello);
                setStato(STATI.SUCCESS);

                timerRef.current = setTimeout(() => {
                    const prossimoLivello = livello + 1;
                    setLivello(prossimoLivello);
                    avviaLivello(prossimoLivello);
                }, 900); //breve pausa per mostrare il flash di successo
            }
        } else {
            //cella sbagliata = cella rossa e -1 vita
            setCellaSbagliata(indice);
            const viteRimaste = vite - 1;
            setVite(viteRimaste);

            timerRef.current = setTimeout(() => {
                setCellaSbagliata(null);

                if (viteRimaste <= 0) {
                    setStato(STATI.GAMEOVER);
                }
                //se restano vite, il giocatore continua a provare sullo stesso pattern
            }, 400); //durata del flash rosso
        }
      }


    return {
        stato,
        livello,
        vite,
        record,
        livelloSalvato,
        cancellaSalvataggio,
        salvaEEsci,
        pattern,
        celleGiuste,
        celleSbagliata,
        iniziaPartita,
        tornaAllaHome,
        clickCella,
    };
}
