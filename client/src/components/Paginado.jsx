import React from "react";

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++){ 
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <div className='paginado'>
                {   pageNumbers && 
                    pageNumbers.map(number => (
                        <button className='number' key={number}>
                        <a href onClick={() => paginado(number)}>{number}</a>
                        </button>
                    ))}
            </div>
        </nav>
    )    
}

