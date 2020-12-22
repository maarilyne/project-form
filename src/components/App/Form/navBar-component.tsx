import React from 'react';
import {NavLink} from 'react-router-dom';

// Functional component that returns the navigation bar
const NavBar: React.FC = () => (
    <React.Fragment>
        <NavLink to='/add-field' className='btns addBtn-link'>Add a field</NavLink>
        <NavLink to='/login' className='btns loginBtn-link'>Connexion</NavLink>
    </React.Fragment>
);

export default NavBar;
// <a href='#' className='btns delBtn-link'>Delete a field</a>
