// @ts-ignore
import React, {useState} from 'react';
import {SaveColor} from './SaveColor';
import ColorParams from '../../PanelColor/ColorParams';

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

    // Pattern singleton; On récupère une instance puis on appelle la méthode savecolor
    const colorParams: ColorParams = ColorParams.getInstance();
    colorParams.saveColor(objCustomCSS);
  }

  return (
    <form>
      <label htmlFor='save'>Sauvegarder la couleur</label>
      <button type='button' onClick={onclick} value='save'>Sauvegarder</button>
    </form>
  );
};
export default SaveColorBtnComponent;
