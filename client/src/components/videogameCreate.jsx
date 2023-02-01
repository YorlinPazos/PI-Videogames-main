import React, {useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom';
import { postVideogame, getGenres } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';



function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'se requiere un Nombre';
    }
    else if(!input.description){
        errors.description = 'description es obligatorio';
    }
    return errors;
}



export default function VideogameCreate(){ 
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const [errors, setErrors] = useState({})


    const [input, setInput] = useState({
                name: "",
                description: "",
                released: "",
                rating: "",
                image: "",
                platforms: [],
                genres: [] 
    })

    
    useEffect(() => {
        dispatch(getGenres())
    },[])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })  
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
        
}           

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input))
        alert("Videogame has been created")
        setInput({
            name:" ",
            description:"",
            released:"",
            rating: "",
            image:"",
            platforms:[],
            genres:[]
        })
        useHistory.push('/home')
    }

    function handleGenresSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }



    function handlePlatformSelect(e){
        setInput({
          ...input,
          platforms: [...input.platforms, e.target.value],
          
        });
      }

    return(
        <div>
            <Link to= '/home'><button>Go Back</button></Link>
            <h1>Create your videogame</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type="text"
                    value= {input.description} 
                    name= "description"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Released:</label>
                    <input
                    type= "text"
                    value= {input.released}
                    name= "released"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type= "text"
                    value= {input.rating}
                    name= "rating"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                     type="text"
                     value={input.image}
                     name= "image"
                     onChange={(e)=>handleChange(e)}
                     />
                </div>
                <div>
                    <label>Platforms:</label> 
                    <select
                     name="Platforms" 
                    onChange={(e)=> handlePlatformSelect(e)}
                    >
            <option disabled selected>Select an option</option>
            <option value="PC">PC</option>
            <option value="MacOs">MacOs</option>
            <option value="Android">Android</option>
            <option value="Sega">Sega</option>
            <option value="iOs">iOs</option>
            <option value="PS2">PlayStation 2</option>
            <option value="PS3">PlayStation 3</option>
            <option value="PS4">PlayStation 4</option>
            <option value="PS5">PlayStation 5</option>
            <option value="XOne">Xbox One</option>
            <option value="360">Xbox 360</option>
            <option value="S/X">Xbox Series S/X</option>
            <option value="Vita">PS Vita</option>
            <option value="Switch">Nintendo Switch</option>
            <option value="New Nintendo 3DS XL">New Nintendo 3DS XL</option>
                    </select>
                </div>
                <div>
                    <label>Genres:</label>
                <select onChange={(e) => handleGenresSelect(e)}>
                        <option disabled selected>Select an option</option>
                    {genres.map((gen) => {
                        return <option key={gen.id} value={gen.name}>{gen.name}</option>
                        })}
                </select>
                </div>

                        <ul><li>{input.genres.map(el => el + " ,")}</li></ul>
                <button type='submit'>Create Videogame</button>

            </form>
        </div>
    )
}