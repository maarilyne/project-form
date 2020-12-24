import React, {createRef, MutableRefObject, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {LoadComponent} from '../../../../index';
// import {Simulate} from "react-dom/test-utils";
// import input = Simulate.input;

enum LoginInterface {
    username = 'Username',
    password = 'Password',
}

function load(login: string, pwd: string) {
    // response = Call server (login/pwd)
    // const auth = New AuthResponse(response);
    /*if (auth.isMatching()) {
        LoadComponent.load(InputFields);
        //ReactDOM.render(<InputFields/>, document.querySelector('#root'));
    } else {
        alert('Unknown User');
    }*/
}

/**
 * ACTION ON SUBMIT :
 * User submits form data
 * If at least one field is wrong we do nothing else we save form data by calling the server
 * @param e
 */
const onclick = (e: any) => {
    e.preventDefault();
    //let user = e.target['username'].value;

    const [val, setVal] = useState();

};

// Sends data to --> /api/v1/login
const sendData = (data: Array<any>): void => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    fetch('/api/v1/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    })
        .then((res) => {
                return res.json();
        },
        )
        .then(
            (result) => {
                // tslint:disable-next-line:no-console
                console.log('setData ' + result);
            },
            (error: TypeError) => {
                // tslint:disable-next-line:no-console
                console.log(error);
            },
        );
};

/*myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
}*/
/*const translation = new Translation();
const userName: string = translation.get('UserName');*/

const userName: string = 'Username';
const password: string = 'Password';
const LoginPage: React.FC<any> = () => {
    return (
        <>
            <h2>Connexion</h2>
            <form onSubmit={onclick}>
                <label htmlFor='username'>{userName}</label>
                <input id='username' type='text' className='usernameInput' name='username'/>
                <label htmlFor='pwd'>{password}</label>
                <input id='pwd' type='password' className='pwdInput' name='pwd'/>
                <button name='sendData' type='submit' className='btns logSubmitBtn'>Login</button>
            </form>
        </>
    );
};
export default LoginPage;
