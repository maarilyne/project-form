import React, {createRef, MutableRefObject, useState} from 'react';
import {LoadComponent} from '../../../../index';
import InputFields from '../form-component';

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

// Sends data to --> /api/v1/login
const sendData = (data: Array<any>): void => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    fetch('api/v1/login', {
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
                // console.log('setData ' + result);
                // LoadComponent.load(InputFields);
                window.location.reload(true);
            },
            (error: TypeError) => {
                console.log(error);
            },
        );
};

const userName: string = 'Username';
const password: string = 'Password';

const LoginPage: React.FC<any> = () => {
    // Hook useState : enables us to retrieve any input data submitted in the form
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    /**
     * Submit Form
     * @param e Submit Event
     */
    const onclick = (e: any) => {
        e.preventDefault();
        sendData([user, pwd]);
    };

    return (
        <>
            <h2>Connexion</h2>
            <form onSubmit={onclick}>
                <label htmlFor='username'>{userName}</label>
                <input id='username' type='text' className='usernameInput' name='username' defaultValue={user}
                       onBlur={(e: any) => {setUser(e.target.value); }}/>
                <label htmlFor='pwd'>{password}</label>
                <input id='pwd' type='password' className='pwdInput' name='pwd' defaultValue={pwd}
                       onBlur={(e: any) => {setPwd(e.target.value); }}/>
                <button name='sendData' type='submit' className='btns logSubmitBtn'>Login</button>
            </form>
        </>
    );
};
export default LoginPage;
