import {React,useState} from 'react';
import CustomSignUpInput from "./SignUpInput";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';

function SignUp(){
    
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [confirmUserPassword,setConfirmUserPassword] = useState("")
    const [isValidPassword , setIsValidPassword] = useState(true)
    function onSubmitEventHandler(e){
        e.preventDefault()
        if(userPassword === confirmUserPassword){
            setIsValidPassword(true)
            console.log("True")
            axios({
                method:"POST",
                data:{
                    email:userEmail,
                    password:userPassword
                },
                withCredentials:true,
                url:"http://localhost:5000/register"
            }).then((response)=>{
                console.log(response.data)
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

        }
    }

    // 836635343228-rqnc8q45iceoaot8qdnm93au67vv2ldf.apps.googleusercontent.com
    // OM8KMvvAF6XgWgNCm5HmSmWL

    const responseGoogle = response => {
        console.log(response.googleId)
        axios({
            method:"POST",
            data:{googleId:response.googleId},
            withCredentials:true,
            url:"http://localhost:5000/auth/google"
        }).then(response => {
            console.log(response)
            if(response.data.status){
                console.log("You are authenticated")
            }else{
                console.log("Authentication failed")
            }
        })
    }

    return (
        <>
            <section>
                <div id="sign-up-form">
                    <h1 className="heading">ViVi Messenger</h1>
                    <h3 className="subheading">Connect with your friends and  leave <br />your privacy safety to us.</h3>
                    <form id="signUpForm" onSubmit={onSubmitEventHandler}>
                        <CustomSignUpInput onChange={onChangeEventHandler} type="email" name="email" id="sign-up-email" placeholder="Email" />
                        <CustomSignUpInput onChange={onChangeEventHandler} type="password" name="password" id="sign-up-password" placeholder="Password" />
                        <CustomSignUpInput onChange={onChangeEventHandler} type="password" name="confirm-password" id="sign-up-password" placeholder="Confirm password" />
                        {isValidPassword ? null : <p style={{color:"red"}}>Password and confirm password does not match</p>}
                        <div className="signUp_btn">
                            <button type="submit" className="btn btn-primary">Create Account</button>
                        </div>
                        <div className="signUpConfirm">By signing up, you agree to our Terms and Policy.</div>
                        <div className="hr"></div>
                        <div className="social-login">
                            <div className="soci-box"><a className="btn btn-block btn-facebook"  rel="noreferrer" href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook"></i>Facebook</a></div>
                            <GoogleLogin
                                clientId="836635343228-rqnc8q45iceoaot8qdnm93au67vv2ldf.apps.googleusercontent.com"
                                render={renderProps => (
                                <button className="btn btn-block btn-google" onClick={renderProps.onClick} disabled={renderProps.disabled}><i class="fab fa-google"></i>Google</button>
                                )}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
                            <div className="soci-box"><a className="btn btn-block btn-twitter"  rel="noreferrer" href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i>Twitter</a></div>
                        </div>
                        <h3 className="botton_heading">Have an account? <a href="/signin">Sign In</a></h3>
                    </form>
                </div>
            </section>
        </>
    )
}

export default SignUp;