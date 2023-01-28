import React from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <div>
            <h1>¿Ready?</h1>
            <Link to ='/home'>
                <buttom>Start</buttom>
            </Link>
        </div>
    )
}