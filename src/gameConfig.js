export const MAX_LIVES = 4;

export function getGridSize(level) {
    if (level <= 3) {        //livelli 1-3  -> griglia 3x3
        return 3; 
    }   
    
    if (level <= 6) {       //livelli 4-6  -> griglia 4x4
        return 4;
    }   
    
    if (level <= 10) {      //livelli 7-10 -> griglia 5x5
        return 5; 
    } 
    
    return 6;                   // dal livello 11 in poi -> 6x6
}
  

export function getPatternCount(level) {
    const size = getGridSize(level);
    const total = size * size;

    let count = 3 + Math.floor(level / 2);      //parte da 3 e aumenta di 1 ogni 2 livelli

    const max = Math.floor(total * 0.55);
    if (count > max){
        count = max;
    }

    return count;
}

export function getShowTime(level) {        //mostra il tempo di visualizzazione del pattern
    let time = 2600 - (level - 1) * 180;    //ogni livello diminuisce il tempo fino ad un minimo
    if (time < 900) time = 900;

    return time;
}


export function generatePattern(total, count) {         //genera le celle da accendere in modo casuale
    const scelte = [];      //ritorna una lista di numeri (leposizioni delle celle)

    while (scelte.length < count) {
        const numeroCasuale = Math.floor(Math.random() * total);

        if (!scelte.includes(numeroCasuale)) {        //controllo se non ho già scelto la cella, in tal caso la aggiungo
            scelte.push(numeroCasuale);
        }
    }

    return scelte;
}
  