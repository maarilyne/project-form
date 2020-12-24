import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app-component';
import InputFields, {InputParams} from './components/App/Form/form-component';
import {InscriptionPageComponents} from './components/App/Form/Login/InscriptionPageComponents';
import LoginPage from './components/App/Form/Login/loginPage-components';
import './components/App/styles/main.css';

export class LoadComponent {
    /**
     * Load a new component/page
     * @param Component Component to load. It will replace all window content
     */
    public static load(Component: FC<any>): void {
        ReactDOM.render(<Component />, document.querySelector('#root'));
    }

    /**
     * Load a new component/page
     * @param Component Component to load. It will replace all window content
     */
    public static loadWithProps(Component: FC<any>, props: Array<InputParams>): void {
        ReactDOM.render(<Component />, document.querySelector('#root'));
    }
}

declare var window: any;

if (window.isLogged) {
    LoadComponent.load(InputFields);
    // ReactDOM.render(<App/>, document.querySelector('#root'));
} else {
    LoadComponent.load(InscriptionPageComponents);
    // ReactDOM.render(<LoginPage/>, document.querySelector('#root'));
    // testest
    // test2
}
