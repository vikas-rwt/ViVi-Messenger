import React from 'react'; 
import User_Img from './User_Img';
import Friend_name from './Friend_name';
import Convo_Received from './Convo_Received';
import Convo_Sent from './Convo_Sent';
import RecordImg from '../png/recorder.png'
import SendImg from '../png/send.png'
import UploadImg from '../png/upload.png'

function Conversation_body(){
    return (
        <>
        <div id='conversation-body'>
            <div className='c-container'>
                <div className="header">
                    <header className="friendBar"><User_Img /><Friend_name /></header>
                </div>
                <div className='convo-body'>
                    <div className='message in'>
                        <Convo_Received />
                    </div>
                    <div className='message out'>
                        <Convo_Sent />
                    </div>
                </div>
                <footer id='footer'>
                    <div className="t-container">
                        <div className="typing-box">
                            <div className="media-upload">
                                <div role='button' className='upload bt'><img src={UploadImg} alt="upload" /></div>
                            </div>
                            <div className='typing'>
                                <div className="typing2">
                                    {/* <div className="message-holder">Type something...</div> */}
                                    <div contentEditable='true' id="typing">Type something...</div>
                                </div>
                            </div>
                        </div>
                        <div className='audio-send-box'>
                            <div className="recording">
                                <div role='button' className='record bt'>
                                    <img src={RecordImg} alt="upload" />
                                </div>
                            </div>
                            <div className="sending">
                                <div role='button' className='send bt'>
                                    <img src={SendImg} alt="send" />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

        </>
    )
}

export default Conversation_body;