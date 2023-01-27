import React from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos a mi PI ostiaaaa</h1>
            <Link to ='/home'>
                <buttom>Ingresar</buttom>
            </Link>
        </div>
    )
}