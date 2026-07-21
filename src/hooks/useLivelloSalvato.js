import { useState } from "react";

const KEY = "livello-salvato";

export function useLivelloSalvato(){
    const [livelloSalvato, setLivelloSalvato] = useState(() => {
        const salvato = localStorage.getItem(KEY);
        if(salvato !== null){
            return JSON.parse(salvato);
        }
        return null;
    });

    function salvaLivello(livello){
        setLivelloSalvato(livello);
        localStorage.setItem(KEY, JSON.stringify(livello));
    }

    function cancellaSalvataggio() {
        setLivelloSalvato(null);
        localStorage.removeItem(KEY);
    }

    return [livelloSalvato, salvaLivello, cancellaSalvataggio];    
}