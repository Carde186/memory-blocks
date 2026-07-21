import { useState } from "react";

const KEY = "record";

export function useRecord(){
    const [record, setRecord] = useState(() =>{
        const salvato = localStorage.getItem(KEY);
        if(salvato !== null){
            return JSON.parse(salvato);
        }
        return 0;
    });

    function aggiornaLivello(nuovoLivello){
        if(nuovoLivello > record){
            setRecord(nuovoLivello);
            localStorage.setItem(KEY, JSON.stringify(nuovoLivello));
        }
    }

    return [record, aggiornaLivello];
}