import React from 'react';

function Button(){
    return (
        <form action="/friendslist" method="post">
            <button id='newChat'>Start new chat</button>
        </form>
    )
}

export default Button;