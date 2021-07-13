import React from 'react';

export default function CustomSignUpInput(props){
    return(
        <div className="signUp_input">
            <input onChange={props.onChange} type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} value={props.value}/>
        </div>        
        );
}