import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const KEY = "tema";

export function ThemeProvider({ children }){     
    const [tema, setTema] = useState(() => {
        const salvato = localStorage.getItem(KEY);
        if(salvato !== null){
            return JSON.parse(salvato);
        }
        return "scuro";         //tema di default
    });

    function cambiaTema(){
        const nuovoTema = tema == "scuro" ? "chiaro" : "scuro";
        setTema(nuovoTema);
        localStorage.setItem(KEY, JSON.stringify(nuovoTema));
    } 

    useEffect(() => {
        document.body.setAttribute("data-tema", tema);
    }, [tema]);
    
    return (
        <ThemeContext.Provider value={{ tema, cambiaTema }}>
            {children}
        </ThemeContext.Provider>
    );    
}

export function useTheme(){
    return useContext(ThemeContext);
}
