import { GET_VIDEOGAMES, GET_GENRES,
    FILTER_GENRE, FILTER_CREATED,
    ORDER_BY_NAME, ORDER_BY_RATING,
    GET_BY_NAME, CREATE_VIDEOGAME,
    GET_DETAILS } from '../actionTypes'


const initialState = {
videogames : [],   
allVideogames: [],
genres: []    
}


function rootReducer (state= initialState, action){
switch(action.type) {
     case GET_VIDEOGAMES: 
        return{
              ...state,
              videogames: action.payload,
              allVideogames: action.payload
        }
        
       case GET_BY_NAME:
        return{
            ...state,
            videogames: action.payload
        }    

        case GET_GENRES:
            return{
                ...state
            }

        case CREATE_VIDEOGAME:
            return{
                ...state,
                genres: action.payload
            }

        case FILTER_CREATED:
            const createdFilter = action.payload === 'created' ? state.allVideogames.filter(el => el.createdInDB) : state.allVideogames.filter(el => !el.createdInDB)
            return{
                ...state,
                videogames: createdFilter
        }

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function (a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) : 
                state.videogames.sort(function(a, b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;     
                    }
                    return 0;
                })
                return {
                    ...state,
                    videogames: sortedArr
                }
       default: 
            return state;

    }
}



export default rootReducer;