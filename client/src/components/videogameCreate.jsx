import React, {useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom';
import { postVideogame, getGenres } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

export default function videogameCreate(){
    const dispatch = useDispatch()
    const genres = useSelector((state)=> state.genres)

    const [input, setInput] = useState({
                name: "",
                description: "",
                released: "",
                rating: "",
                image: "",
                platforms: [],
                genres:[]
    })

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    return(
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Create your videogame</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type="text"
                    value= {input.description}
                    name= "description"
                    />
                </div>
                <div>
                    <label>Released:</label>
                    <input
                    type= "text"
                    value= {input.released}
                    name= "released"
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type= "text"
                    value= {input.rating}
                    name= "rating"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                     type= "text"
                     value={input.image}
                     name= "image"
                     />
                </div>
                <div>
                    <label>Platforms</label>
                    <label><input
                    type= "checkbox"
                    name= "Play Station 5"
                    value= "Play station 5"
                    />Play Statio 5
                    </label>
                </div>
            </form>
        </div>
    )
}