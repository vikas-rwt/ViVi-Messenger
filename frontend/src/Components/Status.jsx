import React, { useState, useRef, target, } from 'react';
import SunImg from '../png/sun.png';
import MoonImg from '../png/moon.png';
import HappyImg from '../png/happy.png';
import { Button, Overlay, Tooltip,  } from 'react-bootstrap';
import e from 'connect-flash';

function Status(){ // wait
    const [show, setShow] = useState(false);
    const target = useRef(null);

    function handleClick(event){
        const afk = event.target.innerHTML;
        
        // if (afk == "Set to AFK"){
        //     console.log('Afk clicked');
        // } else {
        //     console.log('Custom clicked');
        // }

        console.log(event);
    }

      return (
        <>
          <Button id='status-btn' ref={target} onClick={() => setShow(!show)}>
            <img src={SunImg} alt='Active' />
          </Button>
          <Overlay target={target.current} show={show} placement="bottom">
            {(props) => (
              <Tooltip id="overlay" {...props}>
                <div className="btn afk-status" onClick={handleClick}>
                    <img src={MoonImg} alt="Afk" />
                    <div>Set to AFK</div>
                </div>
                <div className="btn custom-status" onClick={handleClick}>
                    <img src={HappyImg} alt="Status" />
                    <div>Set custom status</div>
                </div>
              </Tooltip>
            )}
          </Overlay>
        </>
      );

    // render(<Example />)
}

export default Status;