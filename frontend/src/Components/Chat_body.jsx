import React from 'react';
import Search from './Search';
import Button from './Button';
import User_Img from './User_Img';

function Chat_body(){

    

    return (
        <div id='chat-container'>
            <div className='logo'>ViVi</div>
            <div className="search component"><Search /></div>
            <div className="button component"><Button /></div>

            <div className='friend1'>
                <div className='friend1-box'>
                    <div className='friendImg-box'>
                        <div className='friendImg'>
                            <User_Img />
                        </div>
                    </div>
                    <div className='friendDetail'>
                        <span className='friendName row'>Jolly</span>
                        <span className='friendMsg row'>Hello, Lorem Ipsum is simply dummy text </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat_body;