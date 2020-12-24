import React, {createRef, MutableRefObject, useState} from 'react';
import NavBar from './navBar-component';
import NumberField from './NumberField/numberField-component';
import TextField from './TextField/textField-component';
import InvalidInput from './ErrMessages/errorMssgs-component';

enum ITypeEnum {
    text = 'text',
    number = 'number',
    default = 'text'
}

export interface InputParams {
    ref?: any,
    id: string,
    className: string,
    name: string,
    value: any
}

interface InputFieldDefinition {
    type: ITypeEnum,
    props: InputParams
}

const inputData: Array<InputFieldDefinition> = [
    {type: ITypeEnum.text, props: {id: 'item1', className: 'item1', name: 'firstname', value: ''}},
    {type: ITypeEnum.text, props: {id: 'item2', className: 'item2', name: 'lastname', value: ''}},
    {type: ITypeEnum.number, props: {id: 'item3', className: 'item3', name: 'phone', value: ''}}
]

const fieldMap: any = {
    text: TextField,
    number: NumberField,
    default: TextField
}

/**
 * ACTION ON SUBMIT :
 * User submits form data
 * We get form data and check fields validity
 * If at least one field is wrong we do nothing else we save form data by calling the server
 * @param e
 */
const onclick = (e: any) => {
    e.preventDefault();
    let formIsValid: boolean = true;
    const postData: any = {};

    // We retrive the form's values and check if all the fields are valid
    a.forEach((ref: MutableRefObject<any>) => {
        if (!formIsValid) {
            return; // at least one field is invalid so we stop treatment
        }
        if (ref.current) {
            formIsValid = formIsValid && ref.current.isValid();
            postData[ref.current.name] = ref.current.value();
        }
    });
    console.log(formIsValid);

    /**
     * If each input values are valid, we can POST the data via fetch API
     * On convertit le tableau postData en objet car le JSON (et donc le fetch API) ne supporte pas les tableaux associatifs.
    */
    if (formIsValid) {
        saveData(postData);
    }
};

/**
 * Save Form Data and send it to --> /api/v1/form
 * @param data
 */
const saveData = (data: Array<any>) : void => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    fetch('/api/v1/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then((res) => {
                //debugger;
                //console.log(res);
                return res.json();
            }
        )
        .then(
            (result) => {
                console.log('setData ' + result);
            },
            (error: TypeError) => {
                console.log(error);
            }
        );
};

/**
 * Get Form Data
 * @param data
 */
const getData = () : void => {
    fetch('/api/v1/form', {
        method: 'GET',
        headers: new Headers()
    })
        .then((res) => {
                return res.json();
            }
        )
        .then(
            (result) => {
                console.log('getData ' + result);
            },
            (error: TypeError) => {
                console.log(error);
            }
        );
};
//getData();

//Array that will store the inputRefs
const a: Array<any> = [];

//Functional component that returns the form's inputs & calls the navigation bar
const InputFields: React.FC<InputParams> = ({id, className, name}: InputParams): JSX.Element => {
    return (
        <>
            <h2>Inscription</h2>
            <form>
                {
                    inputData.map((componentDef: InputFieldDefinition, index: number): JSX.Element => {
                        const Component: React.FC<InputParams> = fieldMap[componentDef.type];
                        const inputRef: any = createRef();
                        a.push(inputRef);

                        return (
                                <Component key={index} ref={inputRef} id={componentDef.props.id}
                                           className={componentDef.props.className} name={componentDef.props.name}
                                           value={componentDef.props.value}/>
                        )
                    })
                }
                <button name='sendData' type='submit' className="btns submitBtn" onClick={onclick}>Send</button>
            </form>
            <NavBar/>
        </>
    )
}

export default InputFields;