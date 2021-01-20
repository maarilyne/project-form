import React from 'react';
import PanelColor from '../PanelColor/panelColor-component';
import LoadComponent from '../load-component';

let panelIsLoaded = false;

// Opens the panel when the user clicks on the btn
const openPanel = (e: any) => {
    e.preventDefault();
    if (!panelIsLoaded) {
        LoadComponent.loadSideComponent(PanelColor);
        panelIsLoaded = true;
    } else {
        const panel = document.querySelectorAll('#panel-container');
        panel.forEach(function open(item: any) {
            item.style.display = 'inline-block';
        });
    }
};

// Functional component that enables the user to select which element of the page will be edited
const ElementSelector: React.FC<any> = () => {
    return (
        <form id='elemListForm'>
            <label htmlFor='pageElem'>Customize your page:</label>
            <select id='pageElem' name='pageElem'>
                <option hidden={true}>Choose a page element</option>
                <option disabled={true} >Choose a page element</option>
                <option value='form'>Form</option>
                <option value='title'>Title</option>
                <option value='inputFields'>Input Fields</option>
            </select>
            <button type='submit' className='btns btnsEl' onClick={openPanel}>Ok</button>
        </form>
    );
};

export default ElementSelector;
