import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, filterCreated, orderByName} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado'


export default function Home(){

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> state.videogames)
    //uso esto para que cuando seteo la pag(1), modifique el est. local y se renderize
    const [orden, setOrden] = useState('')
    //declaro est. local, y págania actual. la pag. actual arranca en 1
    const [currentPage, setCurrentPage] = useState(1)
    //luego otro est. local, donde tengo la cantidad de vg por página
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    //indice del ultimo vg es igual a la pagina por el numero de vg por pagina
    const indexOfLastVideogame = currentPage * videogamesPerPage
    //indice del primer vg sera igual a la pagina act. mult. por los vig por pag.
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    //medio confuso este.
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)


    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getVideogames())
    },[dispatch]);

function handleClick(event){
    event.preventDefault()
    dispatch(getVideogames())
};

function handleFilterCreated(event){
    dispatch(filterCreated(event.target.value))
}

function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado${e.target.value}`)
}


return(
    <div>
         <Link to= '/videogame'>Create videogame</Link>
         <h1>Titulo de la página</h1>
         <button onClick={event=> {handleClick(event)}}>
            reload videogames
         </button>
          <div>
            <select onChange={e => handleSort(e)}>
              <option value='asc'>A to Z</option>
              <option value='desc'>Z to A</option>
            </select>
            <select>
                <option value='rating'>Rating order</option> 
                <option value='high'>High rating</option>
                <option value='low'>Low rating</option>
            </select>
            <select>
                <option value='genre'>By genre</option>
            </select>
            <select onChange={event => handleFilterCreated(event)}>
                <option value='All'>All</option>
                <option value='created'>Created</option>
                <option value='Exist'>Existing</option>
            </select>   
            <Paginado
            videogamesPerPage= {videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado = {paginado}
            />
          {currentVideogames?.map((el) =>{
            return(
                <div>
                <Link to={"/home/" + el.id}>
                <Card name={el.name} image={el.image} genres={el.genres} key={el.id} /> 
                </Link>
                </div>
            );
        })}
          </div>
    </div>  
)

};