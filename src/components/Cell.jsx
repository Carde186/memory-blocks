function Cell({ indice, colore, disabilitata, alClic }) {
    return (
      <button
        className={`cella cella--${colore}`}
        disabled={disabilitata}
        onClick={() => alClic(indice)}
      ></button>
    );
}
  
export default Cell;  