import React, {useState} from 'react';
import LoadComponent from '../../load-component';
import InscriptionPageComponents from './InscriptionPageComponents';

// Sends data to --> /api/v1/login
async function sendData(data: Array<any>, callback: () => void): Promise<void> {
// const sendData = (data: Array<any>, callback: () => void): void => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    await fetch('/api/v1/login', {
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
                console.log('setData ' + result);
                window.location.reload();
            },
            (error: TypeError) => {
                console.log(error);
            },
        );
}

const switchPage = (e: any) => {
    LoadComponent.load(InscriptionPageComponents);
   // window.location.href = './InscriptionPageComponents.tsx';
};

const userName: string = 'Username';
const password: string = 'Password';

const LoginPage: React.FC<any> = () => {
    // Hook useState : enables us to retrieve any input data submitted in the form
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    /**
     * If true login is processed so server is calling
     */
    const [submittingForm, setSubmittingForm] = useState(false);

    /**
     * Submit Form
     * @param e Submit Event
     */
    async function onsubmit(e: any): Promise<void> {
        e.preventDefault();
        if (submittingForm) {
            return; // Server has been already called and process is not finished
        }
        setSubmittingForm(true); // Block submit while processing
        await sendData([user, pwd], () => {
            console.log('callback');
            // setSubmittingForm(false); // unblock submit process
        });
        setSubmittingForm(false); // unblock submit process
        console.log('fin onsubmit');
    }

    /**
     * A key has been pressed in Input Login
     * -> If key pressed is Enter, we stop event propagation to do not submit form in login part
     * @param e Keyboard Event
     */
    const loginKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    /**
     * pointer to Input Password
     */
    const pwdInput: React.Ref<any> = React.createRef();

    /**
     * A key has been pressed in Input Password
     * -> If key pressed is Enter, we save password content because Form will be submitted
     * @param e Keyboard Event
     */
    const pwdKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
          setPwd(pwdInput.current.value);
          if (submittingForm) {
            e.preventDefault();
            e.stopPropagation(); // Server is already called
          }
      }
    };

    return (
        <>
            <h2>Connexion</h2>
            <form onSubmit={onsubmit} className='loginForm'>
                <label htmlFor='username'>{userName}</label>
                <input id='username' type='text' className='usernameInput' name='username' defaultValue={user}
                       onKeyDown={(e: any) => { loginKeyDown(e); }} onBlur={(e: any) => {setUser(e.target.value); }}/>
                <label htmlFor='pwd'>{password}</label>
                <input ref={pwdInput} id='pwd' type='password' className='pwdInput' name='pwd' defaultValue={pwd}
                       onKeyDown={(e: any) => { pwdKeyDown(e); }} onBlur={(e: any) => {setPwd(e.target.value); }}/>
                <button name='sendData' type='submit' className='btns logSubmitBtn'
                        disabled={submittingForm}>Login</button>
                <button name='inscription' className='btns signUpBtn' onClick={switchPage}>Sign Up</button>
            </form>
        </>
    );
};
export default LoginPage;
