import React, {createRef, useEffect} from 'react';
import Picker from 'vanilla-picker';
import SaveColorBtnComponent, {IColor} from '../Form/Login/SaveColorBtnComponent';
import LoadComponent from '../load-component';
// tslint:disable-next-line:import-spacing
import ColorParams from  '../PanelColor/ColorParams';
import ClickEvent = JQuery.ClickEvent;

/**
 * - Initializes a color picker with its options via the div's ref
 * - Applies the default color of each color pickers via the div's ref
 * The argument 'el' refers to the refs from each color picker's div.
 * Since the refs can be seen as Ids, we can consider that the Picker objects' "parents" are the refs
 * @param {HTMLElement} el, HTML Element linked to the color picker (used to initialize color picker component)
 * @param {string} color, Current(Default) Color
 */

const colorParams: ColorParams = ColorParams.getInstance();

const createPicker = (el: HTMLElement, colors: IColor) => {
  let color: string = '';
  if (el.id === 'background') {
    color = colors.backgroundColor;
  } else if (el.id === 'text') {
    color = colors.textColor;
  }
  new Picker({
        parent: el,
        popup: false,
        alpha: false,
        editor: false,
        color,
        onChange(newColor) {
            if (el.id === 'background') {
                colors.backgroundColor = newColor.rgbaString;
            } else if (el.id === 'text') {
                colors.textColor = newColor.rgbaString;
            }
            colorParams.applyPreviewColor(colors);
        },
    });
};

// Functional component that returns two color pickers in one panel
const PanelColorComponent: React.FC<any> = ({elColorTarget}: any): JSX.Element => {
    const colors: IColor = colorParams.getColor(elColorTarget);
    const colorPicker1Ref: any = createRef();
    const colorPicker2Ref: any = createRef();

    // This useEffect hook triggers the following code everytime the page is loaded
    useEffect(() => {
         createPicker(colorPicker1Ref.current, colors);
         createPicker(colorPicker2Ref.current, colors);
    }, []);

    return (
        <div id='panel-container'>
            <div ref={colorPicker1Ref} id='background' className='colorpicker'><span>BACKGROUND COLOR</span></div>
            <div ref={colorPicker2Ref} id='text' className='colorpicker'><span>TEXT COLOR</span></div>
            <div className='panelBtns'>
                <button onClick={(e: any) => { saveColor(e, colors); }}>Save</button>
                {/*<button name='color' className='btns signUpBtn' onClick={switchPageColor}>Save Color Page</button>*/}
                <button onClick={closePanel}>Cancel</button>
            </div>
        </div>
    );
};

const saveColor = (e: any, colors: IColor): void => {
  colorParams.saveColor(colors);
  closePanel(e);
};

// Closes the color picker panel when the user clicks on the Cancel btn
const closePanel = (e: any) => {
    e.preventDefault();
    colorParams.closePreviewMode();
    LoadComponent.unloadSideComponentWProps();
};

export default PanelColorComponent;
