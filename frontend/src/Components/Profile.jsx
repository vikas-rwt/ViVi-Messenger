import React from 'react';

function Profile(){
    return (
        <> 
                <div className="w-container">
                    <div className="nickname">
                        <label>Nickname</label><br />
                        <input type="text" name="nickname" id="nickname" />
                    </div>
                    <div className="bio">
                        <label>Bio</label><br />
                        <textarea name="bio" id="bio" rows="3"></textarea>
                    </div>
                    <div className="mix-box">
                        <div className="email">
                            <label>Email</label><br />
                            <input type="text" name="email" id="email" />
                        </div>
                            <div className="age">
                                <label>Age</label><br />
                                <input type="text" name="age" id="age" />
                            </div>
                        </div>
                    <div className="pic-label">
                        <label>Profile Picture</label>
                    </div>
                    <div className='picture'>
                        <img src="" alt="Profile"/>
                        <ul>
                            {/* <li><a href="/#">Upload new picture</a></li>
                            <li><a href="#">Remove</a></li> */}
                        </ul>
                    </div>
                </div>
            
        
        </>
    )
}

export default Profile;