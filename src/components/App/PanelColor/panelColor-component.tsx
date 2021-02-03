import React, {createRef, useEffect} from 'react';
import Picker from 'vanilla-picker';
import SaveColorBtnComponent from '../Form/Login/SaveColorBtnComponent';
import LoadComponent from '../load-component';

/**
 * - Initializes a color picker with its options via the div's ref
 * - Applies the default color of each color pickers via the div's ref
 * The argument 'el' refers to the refs from each color picker's div.
 * Since the refs can be seen as Ids, we can consider that the Picker objects' "parents" are the refs
 * @param {HTMLElement} el, HTML Element linked to the color picker (used to initialize color picker component)
 * @param {string} color, Current(Default) Color
 */
const createPicker = (el: HTMLElement, color: string, elTarget: any) => {
    new Picker({
        parent: el,
        popup: false,
        alpha: false,
        editor: false,
        color,
        onChange(newColor) {
            console.log(elTarget);
            if (el.id === 'backgroud') {
                document.querySelector(elTarget).style.backgroundColor = newColor.rgbaString;
            } else if (el.id === 'text') {
                document.querySelector(elTarget).style.color = newColor.rgbaString;
            }
        },
    });
}

// Functional component that returns two color pickers in one panel
const PanelColor: React.FC<any> = ({elColorTarget}: any): JSX.Element => {
    const colorPicker1Ref: any = createRef();
    const colorPicker2Ref: any = createRef();

    // This useEffect hook triggers the following code everytime the page is loaded
    useEffect(() => {
         createPicker(colorPicker1Ref.current, 'orangered', elColorTarget);
         createPicker(colorPicker2Ref.current, 'red', elColorTarget);
    }, []);

    return (
        <div id='panel-container'>
            <div ref={colorPicker1Ref} id='background' className='colorpicker'><span>BACKGROUND COLOR</span></div>
            <div ref={colorPicker2Ref} id='text' className='colorpicker'><span>TEXT COLOR</span></div>
            <div className='panelBtns'>
                <button>Save</button>
                {/*<button name='color' className='btns signUpBtn' onClick={switchPageColor}>Save Color Page</button>*/}
                <SaveColorBtnComponent />
                <button onClick={closePanel}>Cancel</button>
            </div>
        </div>
    );
};

/**
 *
 *
 * @param e
 */
const switchPageColor = (e: any) => {
    LoadComponent.loadSideComponent(SaveColorBtnComponent);
};

// Closes the color picker panel when the user clicks on the Cancel btn
const closePanel = (e: any) => {
    e.preventDefault();
    const panel = document.querySelectorAll('#panel-container');
    panel.forEach(function open(item: any) {
        item.style.display = 'none';
    });
};

export default PanelColor;
