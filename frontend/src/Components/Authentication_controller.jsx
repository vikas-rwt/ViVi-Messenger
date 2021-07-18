import React,{useState,useEffect}  from 'react';
import Home from "./Home.jsx"
import axios from "axios";//this is all about login for now,we need to add more styles later ye

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
            {isAuthenticated ? <h1>You are in conversation section</h1> : <Home auth={setIsAuthenticated}/>}
        </> 
    )
}