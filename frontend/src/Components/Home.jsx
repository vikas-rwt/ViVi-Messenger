import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(){
    return (
        <>
            <nav id="navbar">
                <div className="logo">ViVi</div>
                <div className="nav__menu">
                    <ul>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Privacy & Safety</a></li>
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
                            <form className="loginForm" method="post" action="/login">
                                <div className="input">
                                    <input className="input_field" type="text" required placeholder="Username or email" autoCapitalize="off" autoCorrect="off"/>
                                </div>
                                <div className="input">
                                    <input type="password" className="input_field" required placeholder="Password" autoCapitalize="off" autoCorrect="off"/>
                                </div>
                                <div className="submit_btn">
                                    <button className="btn btn-primary">Log In</button>
                                </div>
                                <div className="hr"></div>
                                <div className="social-login row">
                                    <div className="col"><a className="btn btn-block btn-facebook" href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook"></i>Connect with Facebook</a></div>
                                    <div className="col"><a className="btn btn-block btn-gmail" href="https://www.google.com" target="_blank"><i class="fab fa-google"></i>Connect with Gmail</a></div>
                                    <div className="col"><a className="btn btn-block btn-twitter" href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i>Connect with Twitter</a></div>
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
