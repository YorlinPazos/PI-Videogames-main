import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import {Link} from 'react-router-dom';

export default function Home(){

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state)=> state.videogames)


    useEffect(()=>{
        dispatch(getVideogames())
    },[]);

function handleClick(event){
    event.preventDefault()
    dispatch(getVideogames())
};



return(
    <div>
         <Link to= '/videogame'>Create videogame</Link>
         <h1>Titulo de la página</h1>
         <button onClick={event=> {handleClick(event)}}>
            volver a cargar todos los personajes
         </button>
    </div>
    
)

};

