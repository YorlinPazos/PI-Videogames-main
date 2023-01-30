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

export function orderByName(payload){                      // ok
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

export function getNameVideogames(name){                           //ok
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: json.data
        })
        } catch (error) {
            console.log(error)
        }
        
    }

}

export function getGenres(){
    return async function(dispatch){
        var info = await axios("http://localhost:3001/genres",{

        })
        return dispatch({type: GET_GENRES, payload: info.data})
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        var response = await axios.post("http://localhost:3001/create", payload)
        console.log(response)
        return response;
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