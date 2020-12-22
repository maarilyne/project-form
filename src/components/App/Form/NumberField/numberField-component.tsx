import React, {forwardRef, useImperativeHandle, useState} from 'react';
import InvalidInput from '../ErrMessages/errorMssgs-component';
import {InputParams} from '../form-component';
import NumberFieldController from './numberField-controller';

const NumberField: any = forwardRef(({id, className, name, value}: InputParams, ref: any): JSX.Element  => {
    const [val, setVal] = useState(value);
    const [showError, setShowError] = useState(false);

    useImperativeHandle(ref, (): any => ({
        name,
        value : () => {
            return val;
        },
        isValid: (): boolean => {
            const valid = validateInput(val);
            // if(valid === false){
            setShowError(!valid);
            // }
            return valid;
        },
    }));

    const updateValue: any = (e: any) => {
        setVal(e.target.value);
    };

    // Function that returns true if the database entered in the input is valid
    // tslint:disable-next-line:no-shadowed-variable
    const validateInput = (value: string) => {
        const verifTextField = new NumberFieldController();
        const verif = (verifTextField.isNotEmpty(value) && verifTextField.verifInput(value));
        return verif;
    };

    return (
    <div>
        <label htmlFor={id} >{name}</label>
        {/* tslint:disable-next-line:max-line-length */}
        <input id={id} type='number' className={className} name={name} value={val} onChange={(e: any) => {updateValue(e, setVal); }} />
        {showError ? (<InvalidInput name={name}/>) : null}
    </div>
    );
});

export default NumberField;
