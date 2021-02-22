import React, {createRef, useEffect} from 'react';
import Picker from 'vanilla-picker';
import LoadComponent from '../load-component';
// tslint:disable-next-line:import-spacing
import ColorParams, {IColor} from '../PanelColor/ColorParams';

/**
 * - Initializes a color picker with its options via the div's ref
 * - Applies the default color of each color pickers via the div's ref
 * The argument 'el' refers to the refs from each color picker's div.
 * Since the refs can be seen as Ids, we can consider that the Picker objects' "parents" are the refs
 * @param {HTMLElement} el, HTML Element linked to the color picker (used to initialize color picker component)
 * @param {string} color, Current(Default) Color
 */

const colorParams: ColorParams = ColorParams.getInstance();

const createPicker = (elem: HTMLElement, colorShowed: IColor) => {
    let color: string = '';
    if (elem.id === 'background') {
        color = colorShowed.backgroundColor;
    } else if (elem.id === 'text') {
        color = colorShowed.textColor;
    }
    new Picker({
        parent: elem,
        popup: false,
        alpha: false,
        editor: false,
        color,
        onChange(newColor) {
            if (elem.id === 'background') {
                colorShowed.backgroundColor = newColor.rgbaString;
            } else if (elem.id === 'text') {
                colorShowed.textColor = newColor.rgbaString;
            }
            colorParams.applyPreviewColor(colorShowed);
        },
    });
};

/**
 * Interface des propriétés du composant PanelColorComponent
 * Sécurise l'utilisation des propriétés du composant
 * => en cas d'erreur, le transpiler génère une erreur
 */
export interface IPanelColorComponentProps {
    elemType: string;
}

/**
 * Functional component that returns two color pickers in one panel
 * Au demarrage, on charge les deux color pickers
 * The useEffect hook triggers the following code everytime the page is loaded
 */
const PanelColorComponent: React.FC<IPanelColorComponentProps> =
    ({elemType}: IPanelColorComponentProps): JSX.Element => {
        const colorShowed: IColor = colorParams.getColor(elemType);
        const colorPicker1Ref: any = createRef();
        const colorPicker2Ref: any = createRef();

        useEffect(() => {
            createPicker(colorPicker1Ref.current, colorShowed);
            createPicker(colorPicker2Ref.current, colorShowed);
        }, []);

        return (
            <div id='panel-container'>
                <div ref={colorPicker1Ref} id='background' className='colorpicker'><span>BACKGROUND COLOR</span></div>
                <div ref={colorPicker2Ref} id='text' className='colorpicker'><span>TEXT COLOR</span></div>
                <div className='panelBtns'>
                    <button onClick={(e: any) => {
                        saveColor(e, colorShowed);
                    }}>Save
                    </button>
                    <button onClick={closePanel}>Cancel</button>
                </div>
            </div>
        );
    };

/**
 * Appelle la fonction SaveColor de ColorParams
 * Sauvegarde les couleurs dans la database
 * @param e
 * @param colors
 */
const saveColor = (e: any, colorSaved: IColor): void => {
    colorParams.saveColor(colorSaved);
    closePanel(e);
};

// Closes the color picker panel when the user clicks on the Cancel btn
const closePanel = (e: any) => {
    e.preventDefault();
    colorParams.closePreviewMode();
    LoadComponent.unloadSideComponentWProps();
};

export default PanelColorComponent;
