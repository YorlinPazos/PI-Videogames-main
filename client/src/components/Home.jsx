import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado'


export default function Home(){

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> state.videogames)
    const [currentPage, setCurrentPage] = (1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(16)
    const indexOfLastVideogame = currentPage * videogamesPerPage // 15? ponte de acuerdo selene jejej
    const indexOffirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
    const currentVideogames = allVideogames.slice(indexOffirstVideogame, indexOfLastVideogame)


    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    // 1------0------16
    // 2------17------33   revisar mejor esta logica

    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch]);

function handleClick(event){
    event.preventDefault()
    dispatch(getVideogames())
};


                        //Crear vg, recargar los videojuegos, ordenar a-z o z-a , botones de opciones
                        //por rating bajo, por rating alto, por genero
return(
    <div>
         <Link to= '/videogame'>Create videogame</Link>
         <h1>Titulo de la página</h1>
         <button onClick={event=> {handleClick(event)}}>
            volver a cargar todos los personajes
         </button>
          <div>
            <select>
              <option value="asc">Ascendente</option>
              <option value="desc">Ascendente</option>
            </select>
            <select>
                <option value="rating">By rating</option> 
            </select>
            <select>
                <option value="genre">By genre</option>
            </select>
            <select>
                <option value="All">All</option>
                <option value="create">From Database</option>
                <option value="api">From api</option>
            </select>
            <Paginado
            videogamesPerPage= {videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado = {paginado}
            />
          {currentVideogames?.map((el) =>{
            return(
                <fragment>
                <Link to={"/home/" + el.id}>
                <Card name={el.name} image={el.image} genres={el.genres} /> 
                </Link>
                </fragment>
            );
        })}
          </div>
    </div>  
)

};

