import {React,useState} from 'react';
import {useHistory} from "react-router-dom"
import CustomSignUpInput from "./SignUpInput";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

function SignUp(){
    const history = useHistory()
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [confirmUserPassword,setConfirmUserPassword] = useState("")
    const [isValidPassword , setIsValidPassword] = useState(true)
    const [userName,setUserName] = useState("")
    const [userAge,setUserAge] = useState("")



    function onSubmitEventHandler(e){
        e.preventDefault()
        if(userPassword === confirmUserPassword){
            setIsValidPassword(true)
            axios({
                method:"POST",
                data:{
                    username:userName,
                    age:userAge,
                    email:userEmail,
                    password:userPassword
                },
                withCredentials:true,
                url:"http://localhost:5000/register"
            }).then((response)=>{
                console.log(response.data)
                if(response.data.status === true){
                    if(response.data.type ==="register"){
                        if(userEmail === response.data.email){
                            console.log("in login section")
                            axios({
                                method:"POST",
                                url:"http://localhost:5000/login",
                                data:{
                                    email:response.data.email,
                                    password:userPassword
                                },
                                withCredentials:true
                            })
                            .then( response =>{
                                history.push("/")
                            })
                        }else{
                            console.log("Wrong returned email")
                        }
                    }
                }
            })
        }else{
            setIsValidPassword(false)
        }

    }
    function onChangeEventHandler(e){
        const value = e.target.value
        const name = e.target.name
        if(name === "email"){
            setUserEmail(value)
        }else if(name === "password"){
            setUserPassword(value)
        }else if(name === "confirm-password"){
            setConfirmUserPassword(value)
        }else if(name === "username"){
            setUserName(value)
        }else if(name==="userAge"){
            setUserAge(value)
        }
    }

    const responseGoogle = response => {
        console.log(response)
        axios({
            method:"POST",
            data:{provider:"Google",googleId:response.googleId,type:"register"},
            withCredentials:true,
            url:"http://localhost:5000/auth/register"
        }).then(response => {
            console.log(response)
            if(response.data.status){
                history.push("/")
            }else{
                console.log("Authentication failed")
            }
        })
    }

    const responseFacebook = response =>{
        console.log(response)
        axios({
            method:"POST",
            data:{provider:"Facebook",facebookId:response.id,type:"register"},
            withCredentials:true,
            url:"http://localhost:5000/auth/register"

        }).then(response =>{
            console.log(response)
        })
    }


    return (
        <>
            <section>
                <div id="sign-up-form">
                    <h1 className="heading">ViVi Messenger</h1>
                    <h3 className="subheading">Connect with your friends and  leave <br />your privacy safety to us.</h3>
                    <form id="signUpForm" onSubmit={onSubmitEventHandler}>
                        <CustomSignUpInput onChange={onChangeEventHandler} type="text" name="username" id="sign-up-username" placeholder="Username" value={userName} />
                        <CustomSignUpInput onChange={onChangeEventHandler} type="text" name="userAge" id="sign-up-userage" placeholder="User Age" value={userAge} />
                        <CustomSignUpInput onChange={onChangeEventHandler} type="email" name="email" id="sign-up-email" placeholder="Email" value={userEmail}/>
                        <CustomSignUpInput onChange={onChangeEventHandler} type="password" name="password" id="sign-up-password" placeholder="Password" value={userPassword} />
                        <CustomSignUpInput onChange={onChangeEventHandler} type="password" name="confirm-password" id="sign-up-password" placeholder="Confirm password" value={confirmUserPassword} />

                        {isValidPassword ? null : <p style={{color:"red"}}>Password and confirm password does not match</p>}
                        <div className="signUp_btn">
                            <button type="submit" className="btn btn-primary">Create Account</button>
                        </div>
                        <div className="signUpConfirm">By signing up, you agree to our Terms and Policy.</div>
                        <div className="hr"></div>
                        <div className="social-login">
                        <FacebookLogin
                           appId="1128461224319367"
                           callback={responseFacebook}
                           render={renderProps => (
                               <button type="button" className="btn btn-block btn-facebook" onClick={renderProps.onClick}><i class="fab fa-facebook"></i>Facebook</button>
                           )}
                        />
                        </div>
                        <div className="social-login">
                            <GoogleLogin
                                clientId="836635343228-rqnc8q45iceoaot8qdnm93au67vv2ldf.apps.googleusercontent.com"
                                render={renderProps => (
                                <button type="button" className="btn btn-block btn-google" onClick={renderProps.onClick} disabled={renderProps.disabled}><i class="fab fa-google"></i>Google</button>
                                )}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <h3 className="botton_heading">Have an account? <a href="/">Sign In</a></h3>
                    </form>
                </div>
            </section>
        </>
    )
}

export default SignUp;