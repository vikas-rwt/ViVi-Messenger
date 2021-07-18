import React,{useState,useEffect}  from 'react';
import Home from "./Home.jsx"
import axios from "axios";


export default function Authentication_controller(){

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    useEffect(()=>{
        axios({
            method:"GET",
            url:"http://localhost:5000/isAuth",
            withCredentials:true
        })
        .then( response =>{
            setIsAuthenticated(response.data.status)
            console.log(response.data.status)
        })
    })

    return(
        <>
            {isAuthenticated ? <h1>You are authenticated</h1> : <Home auth={setIsAuthenticated}/>}
        </>
    )
}