import InputFieldController from '../InputField/inputField-controller';

export default class NumberFieldController extends InputFieldController {

    public isNotEmpty(value: string): boolean {
        return (value === '' || value === undefined) ? false : true;
        // console.log('numbField_isEmpty : ' + a);
    }

    // Checks if the input's value only contains numbers
    public verifInput(value: string): boolean {
        const regex: RegExp = /^[0-9]{10}$/g;
        return regex.test(value);
        // console.log('numbField_VerifInput : ' + a);
    }
}
