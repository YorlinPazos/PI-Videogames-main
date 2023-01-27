import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames",{              // Surge la magia
        });
       
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

