import {React,useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";


export default function Dashboard()
{
    const history = useHistory();
    const [isAuthenticated,setIsAuthencticated] = useState(false);
    useEffect(()=>{
        axios({
            method:"GET",
            withCredentials:true,
            url:"http://localhost:5000/isAuth"
        })
        .then(response => {
            console.log(response.data)
            if(response.data.status === true){
                // history.push("/dashboard")
                setIsAuthencticated(true)
                console.log("User is authenticated")
            }else{
                console.log("User isn't authenticated")
                history.push("/")
            }
        })
    },[])

    return(<>
        {isAuthenticated ? <h1>This is user dashboard and it's protected</h1> : null }
    </>)
}