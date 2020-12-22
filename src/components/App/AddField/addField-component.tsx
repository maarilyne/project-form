import React from 'react';
import {NavLink} from 'react-router-dom';

// Classe fonctionnelle qui retourne le form permettant d'ajouter des champs dans le form d'inscription
class AddField extends React.Component {
    public render() {
        return(
            <>
                <h1>New Field</h1>
                <form className='addField-form'>
                    <label htmlFor='' >Field's name</label>
                    <input id='add_input' type='text' name='fieldName'/>
                    <div>
                        <button type='submit' className='btns addField-btn'>Add</button>
                        <NavLink to='/' className='btns returnBtn'>Return</NavLink>
                    </div>
                </form>
            </>
        );
    }
}

export default AddField;
