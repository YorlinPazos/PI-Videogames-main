import axios from 'axios';
import { GET_VIDEOGAMES, GET_GENRES, FILTER_GENRE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, GET_BY_NAME, CREATE_VIDEOGAME, GET_DETAILS } from '../actionTypes'


export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames",{              //  ok
        });
       
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    } 
}


export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames",{           
        });
       
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}


export function filterGenre(payload){
    return {
        type: FILTER_GENRE,
        payload
    }
}

export function filterCreated(payload){                      // ok
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){                      // Load...
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function getByName(name){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type: GET_BY_NAME,
            payload: json.data
        })
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        var data = await axios.post("http://localhost:3001/videogames", payload)
        console.log(data)
        return data;
    }
}

export function getDetail(id){
    return async function (dispatch){
        var data = await axios.get("http://localhost:3001/videogames/" + id)
        return dispatch ({
            type: GET_DETAILS,
            payload: data.data
        })
    }
}