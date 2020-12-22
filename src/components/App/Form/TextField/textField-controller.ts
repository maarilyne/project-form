import InputFieldController from "../InputField/inputField-controller";

export default class TextFieldController extends InputFieldController{

    public isNotEmpty(value: string): boolean {
        return (value === '' || value === undefined) ? false : true;
        //console.log('textField_isEmpty : ' + a);
    }

    //Checks if the input's value only contains letters
    public verifInput(value: string): boolean {
        const regex: RegExp = /^['a-zA-Zàéèëïöù]+$/g;
        return regex.test(value); //returns true if the value is composed by letters only
        //console.log('textField_VerifInput : ' + a);
    }
}