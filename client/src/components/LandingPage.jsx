import React from 'react';
import {Link} from 'react-router-dom';


export default function landinPage(){
    return(
        <div>
            <h1>Bienvenidos a mi PI ostiaaaa</h1>
            <Link to ='/home'>
                <buttom>Ingresar</buttom>
            </Link>
        </div>
    )
}