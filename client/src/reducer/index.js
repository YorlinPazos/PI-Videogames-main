
const initialState = {
    videogames : []                // esta linea la tenia con un = y se pintaba de rojo.
}


function rootReducer (state= initialState, action){
    switch(action.type) {
        case 'GET_VIDEOGAMES': 
            return{
                ...state,
                videogames: action.payload
            }
    }
}



export default rootReducer;