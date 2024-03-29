import {React,useState,useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


function Home(props){

    const [userEmail,setUserEmail] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const [isAuthenticated,setIsAuthencticated] = useState(false);
    const [isCorrectPassword,setIsCorrectPassword] = useState(true)
    function onChangeEventHandler(event){   
        const value=event.target.value
        if(event.target.name === "email"){
            setUserEmail(value)
            console.log("email:"+userEmail)
        }else if(event.target.name === "password"){
            setUserPassword(value)
            console.log("Password : "+userPassword)
        }
    }


    useEffect(()=>{
        // console.log("Process.env : "+ windows.env)
        axios({
            method:"GET",
            withCredentials:true,
            url:"http://localhost:5000/isAuth"
        })
        .then( response => {
            setIsAuthencticated(response.data.status)
            console.log("is auth ? : "+isAuthenticated)
        })
        // eslint-disable-next-line
    },[])


    function onSubmitEventHandler(event){
        event.preventDefault();
        axios({
            method:"POST",
            data:{
                email:userEmail,
                password:userPassword
            },
            withCredentials:true,
            url:"http://localhost:5000/login"
        })
        .then((response)=>{
            console.log(response)
            if(response.data.status === false){
                if(response.data.type === "password"){
                    setIsCorrectPassword(false)
                }
            }else{
                setIsCorrectPassword(true)
            }
            props.auth(response.data.status)
        })
        .catch(err =>{
            console.log(err)
        })

    };

    function responseGoogle(response){
        axios({
            method:"POST",
            data:{provider:"Google",googleId:response.googleId,type:"login"},
            withCredentials:true,
            url:"http://localhost:5000/auth/register"

        }).then(response =>{
            props.auth(response.data.status)
            console.log(response)
        })
    }


    const responseFacebook = response =>{
        console.log(response)
        axios({
            method:"POST",
            data:{provider:"Facebook",facebookId:response.id,type:"login"},
            withCredentials:true,
            url:"http://localhost:5000/auth/register"

        }).then(response =>{
            props.auth(response.data.status)
            console.log(response)
        })
    }



    return (
        <>
            <nav id="navbar">
                <div className="logo">ViVi</div>
                <div className="nav__menu">
                    <ul>
                        
                        <li><a href="/#">Features</a></li>
                        <li><a href="/#">Privacy & Safety</a></li>
                        <li><a href="/#" >Features</a></li>
                        <li><a href="/#">Privacy & Safety</a></li>
                        <a className="btn btn-primary sign-up-btn" href="/sign-up">Sign Up</a>
                    </ul>
                </div>
            </nav>
            <section id="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-7 heading">
                            <h1>Now connect from anywhere to everywhere.</h1>
                            <h3 className>It's all about privacy.</h3>
                        </div>
                        <div id="form" className="col-5">
                            <div className="form-inside">
                            <h4>Welcome back!</h4>
                            {/* method="post" action="/login" */}
                            <form className="loginForm" onSubmit={onSubmitEventHandler}>
                                <div className="input">
                                    <input onChange={onChangeEventHandler} className="input_field" type="text" required placeholder="email address" autoCapitalize="off" autoCorrect="off" value={userEmail}  name="email"/>
                                </div>
                                <div className="input">
                                    <input onChange={onChangeEventHandler} type="password" className="input_field" required placeholder="Password" autoCapitalize="off" autoCorrect="off" value={userPassword} name="password"/>
                                </div>
                                {isCorrectPassword ? null:<p style={{color:"red"}}>Password incorrect</p>}
                                <div className="submit_btn">
                                    <button type="submit"  className="btn btn-primary">Log In</button>
                                </div>
                                <div className="hr"></div>
                                <div className="social-login row">
                                    <div className="col">
                                    <FacebookLogin
                                        appId="1128461224319367"
                                        autoLoad={false}
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <button className="btn btn-block btn-facebook" onClick={renderProps.onClick}><i class="fab fa-facebook"></i>Connect with Facebook</button>
                                        )}
                                    />
                                    </div>

                                    <div className="col">
                                    <GoogleLogin
                                        clientId="836635343228-rqnc8q45iceoaot8qdnm93au67vv2ldf.apps.googleusercontent.com"
                                        render={renderProps => (
                                         <button className="btn btn-block btn-google" onClick={renderProps.onClick}><i class="fab fa-google"></i>Connect with Google</button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={false}
                                    />
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <span className="copyright">© <strong>ViVi</strong> 2021. Above used trademarks belongs to their respective owners.</span>
                    <span className="terms"><a href="/terms">Terms</a></span>
                    <span className="footer-logo">ViVi</span>
                </div>
            </footer>
        </>
    )    
}

export default Home; 
