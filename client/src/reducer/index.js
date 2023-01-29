import { GET_VIDEOGAMES, GET_GENRES,
    FILTER_GENRE, FILTER_CREATED,
    ORDER_BY_NAME, ORDER_BY_RATING,
    GET_BY_NAME, CREATE_VIDEOGAME,
    GET_DETAILS } from '../actionTypes'


const initialState = {
videogames : [],   
allVideogames: []     
}


function rootReducer (state= initialState, action){
switch(action.type) {
   case GET_VIDEOGAMES: 
       return{
           ...state,
           videogames: action.payload,
           allVideogames: action.payload
       }
    //    case FILTER_GENRE:
    //        const allVideogames = state.videogames  
    //        const statusFiltered = action.payload === 'All' ? allVideogames :
    //              allVideogames.filter(el => el.genres === action.payload)
    //        return{
    //            ...state,
    //            videogames: statusFiltered    
    //        }
        case FILTER_CREATED:
            const createdFilter = action.payload === 'created' ? state.allVideogames.filter(el => el.createdInDB) : state.allVideogames.filter(el => !el.createdInDB)
            return{
                ...state,
                videogames: createdFilter
            }
       default: 
            return state;
}

}



export default rootReducer;