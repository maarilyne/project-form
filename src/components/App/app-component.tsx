import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddField from './AddField/addField-component';
import InputFields from './Form/form-component';
import LoginPage from './Form/Login/loginPage-components';

// Classe fonctionnelle qui retourne tout le composantes dans le dossier "/components"
class App extends React.Component {
    public render() {
        return (
            <>
                <form className='main-form'>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/login' component={LoginPage}/>
                            <Route path='/add-field' component={AddField}/>
                            <Route exact path='/' component={InputFields}/>
                        </Switch>
                    </BrowserRouter>
                </form>

            </>
        );
    }
}

export default App;
