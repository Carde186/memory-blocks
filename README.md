# Memory Blocks

🔗 **[Prova il gioco online](https://memory-blocks-cardellini.netlify.app/)**

Gioco di memoria a griglia, costruito in **React + Vite**. Alcune celle si accendono per un istante: memorizzale e ripetile. La difficoltà cresce livello dopo livello.

## Come si gioca

- Alcune celle si illuminano per un breve tempo, poi si spengono.
- Clicca le celle che ricordi.
- Cella giusta → resta accesa. Cella sbagliata → flash rosso e -1 vita.
- Completa il pattern → livello successivo.
- Le vite finiscono → game over.

## Funzionalità

- Difficoltà crescente: griglia più grande e tempo di visualizzazione più corto a ogni livello.
- Sistema vite (4 cuori).
- **Record**: il livello più alto mai raggiunto, salvato nel browser.
- **Salvataggio partita**: il progresso resta salvato. Alla riapertura puoi scegliere se continuare da dove eri o iniziare una nuova partita.
- **Tema chiaro/scuro**, a scelta e salvato.
- **Colore celle personalizzabile**: scegli tra 4 colori per le celle corrette, da un menù impostazioni.
- **Pagina Statistiche**: record, numero di partite giocate e un grafico dell'andamento dei livelli raggiunti nelle ultime partite.

## Pagine

Il progetto usa **React Router** per navigare tra due pagine:

| Percorso | Contenuto |
|---|---|
| `/` | Home: schermata iniziale e gioco |
| `/statistiche` | Record, partite giocate e grafico dei progressi |

## Stack tecnologico

- React
- Vite
- React Router — navigazione tra pagine
- Recharts — grafico dei progressi nella pagina Statistiche
- CSS puro (nessun framework CSS esterno)
- JavaScript

Nessun backend: tutti i salvataggi (record, progresso, storico partite, tema, colore) usano `localStorage`, la memoria del browser.

## Per iniziare (per uno sviluppatore che clona il repo)

### Requisiti

- [Node.js](https://nodejs.org) versione 18 o superiore
- npm (incluso con Node.js)

### Installazione

```bash
git clone https://github.com/Carde186/memory-blocks.git
cd memory-blocks
npm install
npm run dev
```

Apri l'indirizzo mostrato in console (di solito `http://localhost:5173`).

**Nessun dato da inserire, nessun account o login richiesto**: l'app è pronta all'uso subito dopo l'installazione. Tutti i progressi (record, livello, tema, colori) si salvano automaticamente nel browser man mano che giochi — nessuna configurazione iniziale necessaria.

## Pubblicazione online

Il sito è pubblicato tramite **[Netlify](https://www.netlify.com/)**, collegato direttamente a questa repository GitHub: ogni `git push` sul branch `main` avvia automaticamente un nuovo deploy.

Il progetto include anche un file `public/_redirects` necessario per far funzionare correttamente React Router: senza di esso, ricaricare la pagina su un percorso diverso dalla home (es. `/statistiche`) restituirebbe un errore 404, perché il server cercherebbe un file fisico con quel nome invece di lasciare che sia React Router a gestire la navigazione.


## Struttura del progetto
```text
src/
├── main.jsx
├── App.jsx                     #mappa delle pagine (React Router)
├── gameConfig.js
├── pages/
│   ├── Home.jsx                #schermata iniziale + gioco
│   └── Statistiche.jsx         #record, partite giocate, grafico
├── components/
│   ├── Cell.jsx
│   ├── GameBoard.jsx
│   ├── GameOverModal.jsx
│   ├── HUD.jsx
│   ├── MenuImpostazioni.jsx
│   └── StartScreen.jsx
├── hooks/
│   ├── useColoreCelle.js
│   ├── useGameLogic.js
│   ├── useLivelloSalvato.js
│   ├── useRecord.js
│   ├── useStoricoPartite.js
│   └── useTheme.jsx
└── styles/
    └── index.css
```


## Scelte tecniche

- **Logica separata dalla presentazione**: tutta la macchina a stati del gioco vive in `useGameLogic`, i componenti si limitano a mostrare i dati che ricevono.
- **`localStorage` per la persistenza**: nessun bisogno di backend per salvare record, progresso, storico partite e preferenze.
- **`useContext` per il tema**: il tema serve a più componenti contemporaneamente, quindi evita di passare la prop manualmente a ogni livello dell'albero.
- **React Router** per separare la Home dalla pagina Statistiche con URL distinti, mantenendo comunque una Single Page Application.
- **Recharts** per il grafico: libreria pensata specificamente per React, mantenuta attivamente, si integra come componenti JSX invece di manipolare direttamente un canvas.

## Possibili sviluppi futuri

- Implementare gli utenti, quindi pagina di login e salvare i propri avanzamenti in un db.
- Ulteriori temi di colore, magari scelti direttamente dall'utente tramite una ruota colori e non predefiniti.

## Riferimenti utili

- [Documentazione ufficiale React](https://react.dev/)
- [Documentazione Recharts](https://recharts.org/)

## Licenza

MIT.