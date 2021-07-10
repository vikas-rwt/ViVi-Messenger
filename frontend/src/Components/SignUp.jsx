import React from 'react';

function SignUp(){
    return (
        <>
            <section>
                <div id="sign-up-form">
                    <h1 className="heading">ViVi Messenger</h1>
                    <h3 className="subheading">Connect with your friends and  leave <br />your privacy safety to us.</h3>
                    <form id="signUpForm">
                        <div className="signUp_input">
                            <input type="email" name="email" id="sign-up-email" placeholder="Email"/>
                        </div>
                        <div className="signUp_input">
                            <input type="text" name="fullName" id="sign-up-fullName" placeholder="Full Name"/>
                        </div>
                        <div className="signUp_input">
                            <input type="text" name="username" id="sign-up-username" placeholder="Username"/>
                        </div>
                        <div className="signUp_input">
                            <input type="password" name="password" id="sign-up-password" placeholder="Password"/>
                        </div>
                        <div className="signUp_btn">
                            <a className="btn btn-primary">Create Account</a>
                        </div>
                        <div className="signUpConfirm">By signing up, you agree to our Terms and Policy.</div>
                        <div className="hr"></div>
                        <div className="social-login">
                            <div className="soci-box"><a className="btn btn-block btn-facebook" href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook"></i>Facebook</a></div>
                            <div className="soci-box"><a className="btn btn-block btn-gmail" href="https://www.google.com" target="_blank"><i class="fab fa-google"></i>Gmail</a></div>
                            <div className="soci-box"><a className="btn btn-block btn-twitter" href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i>Twitter</a></div>
                        </div>
                        <h3 className="botton_heading">Have an account? <a href="/signin">Sign In</a></h3>
                    </form>
                </div>
            </section>
        </>
    )
}

export default SignUp;