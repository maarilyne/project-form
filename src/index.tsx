import React from 'react';
import InputFields from './components/App/Form/form-component';
import LoginPage from './components/App/Form/Login/loginPage-components';
import LoadComponent from './components/App/load-component';
import './components/App/styles/main.css';

declare var window: any;

if (window.isLogged) {
    LoadComponent.load(InputFields);
    // ReactDOM.render(<App/>, document.querySelector('#root'));
} else {
    LoadComponent.load(LoginPage);
    // LoadComponent.load(InscriptionPageComponents);
    // ReactDOM.render(<LoginPage/>, document.querySelector('#root'));
}
