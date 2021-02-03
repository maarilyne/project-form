// @ts-ignore
import React, {useState} from 'react';
import {SaveColor} from './SaveColor';

export interface IColor {
  textColor: string;
  backgroundColor: string;
  type: string;
}

export const SaveColorBtnComponent = (): JSX.Element => {
  const [textColor, setTextColor] = useState('orange');
  const [backgroundColor, setBackgroundColor] = useState('yellow');
  const [typeSelected, setTypeSelected] = useState('h2');

  function onclick(event: any): void {
    event.preventDefault();

    const objCustomCSS: IColor = {
      textColor,
      backgroundColor,
      type : typeSelected,
    };

    const saveColor = new SaveColor();
    saveColor.save(objCustomCSS);
  }

  // @ts-ignore
  return (
    <form>
      {/*<label htmlFor='save'>Sauvegarder la couleur</label>*/}
      <button className='btns signUpBtn' type='button' onClick={onclick} value='save'>Sauvegarder</button>
    </form>
  );
};
export default SaveColorBtnComponent;
