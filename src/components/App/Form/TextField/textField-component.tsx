import React, {forwardRef, useImperativeHandle, useState} from 'react';
import InvalidInput from '../ErrMessages/errorMssgs-component';
import {InputParams} from '../form-component';
import TextFieldController from './textField-controller';

const TextField: any = forwardRef(({id, className, name, value}: InputParams, ref: any): JSX.Element  => {
    const [val, setVal] = useState(value);
    const [showError, setShowError] = useState('');

    useImperativeHandle(ref, (): any => ({
        name,
        value : () => {
            return val;
        },
        isValid: (): any => {
           const valid = validateInput(val);
            /*if(valid === false){
                setShowError(!showError);
            }*/
           return valid;
        },
    }));
    // Verifs
    // tslint:disable-next-line:no-shadowed-variable
    const validateInput = (value: string) => {
        const verifTextField = new TextFieldController();
        const verif = (verifTextField.isNotEmpty(value) && verifTextField.verifInput(value));
        if (!verif) {
             setShowError('Invalid Field (' + name + ')');
        } else {
            setShowError('');
        }
        return verif;
    };
    return (
        <div>
            <label htmlFor={id}>{name}</label>
            {/* tslint:disable-next-line:max-line-length */}
            <input id={id} type='text' className={className} name={name} value={val} onChange={(e: any) => {setVal(e.target.value); }}/>
            {showError ? (<InvalidInput name={name} errorMsg={showError} />) : null}
        </div>
    );
});

export default TextField;
