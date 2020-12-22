
// Controller
export default abstract class InputFieldController {
    // checks if the input isn't empty
    public abstract isNotEmpty(value: string): boolean;

    // checks if the value matches with the input's type
    public abstract verifInput(value: string): boolean;
}
