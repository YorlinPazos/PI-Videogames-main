import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";


export default function Detail(props){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])


const myVideogame = useSelector((state) => state.detail)

return (
    <div>
        {
            myVideogame.length > 0 ?
            <div>
                <h1>{myVideogame.name}</h1>
                <img src={myVideogame.image} alt="" width="500px" height="700px" />
                <h2>Genres: {myVideogame.genres}</h2>
                <h3>Released: {myVideogame.released}</h3>
                <h4>Rating: {myVideogame.rating}</h4>
                <h2>Platforms: {myVideogame.platforms}</h2>
                <p>Description: {myVideogame.description}</p>
            </div> : <p>Loading...</p>
        }
        <Link to='/home'>
            <button>Go Back</button>
        </Link>
    </div>
)
}