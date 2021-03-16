import React from 'react';
import LoadComponent from '../load-component';
import PanelColorComponent, {IPanelColorComponentProps} from '../PanelColor/panelColor-component';

// Opens the panel when the user clicks on the btn
const openPanel = (e: any) => {
  e.preventDefault();

  const formValue = document.querySelectorAll('#pageElem');
  formValue.forEach((item: any): void => {
    // console.log(item.value);
    const elTarget = item.value;
      /**
       * Charge le composant Panel Color (picker color)
       */
    LoadComponent.loadSideComponentWProps(PanelColorComponent, { elemType: elTarget } as IPanelColorComponentProps);
    });
};

// Functional component that enables the user to select which element of the page will be edited
const ElementSelector: React.FC<any> = () => {
  return (
    <form id='elemListForm'>
      <label htmlFor='pageElem'>Customize your page:</label>
      <select id='pageElem' name='pageElem'>
        <option hidden={true}>Choose a page element</option>
        <option disabled={true} >Choose a page element</option>
        <option value='.formElement'>Form</option>
        <option value='.title'>Title</option>
        <option value='.inputField'>Input Fields</option>
      </select>
      <button type='submit' className='btns btnsEl' onClick={openPanel}>Ok</button>
    </form>
  );
};

export default ElementSelector;
