import { useState, useEffect } from "react";

const KEY = "colore-celle";

export const COLORI_DISPONIBILI = ["verde", "blu", "viola", "arancione"];

export function useColoreCelle() {
    const [colore, setColore] = useState(() => {
        const salvato = localStorage.getItem(KEY);
        if (salvato !== null) {
            return JSON.parse(salvato);
        }
        return "verde";     //colore di default
    });

    useEffect(() => {
        document.body.setAttribute("data-colore-celle", colore);
    }, [colore]);

    function cambiaColore(nuovoColore) {
        setColore(nuovoColore);
        localStorage.setItem(KEY, JSON.stringify(nuovoColore));
    }

    return [colore, cambiaColore];
}