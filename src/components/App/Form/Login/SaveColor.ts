import ColorParams, {IColor} from '../../PanelColor/ColorParams';

type getColorCallbackType = (result: Array<IColor>) => void;

/**
 * Calls the server via the fetch API method
 * Sends the colors' data to the route 'savecolor'
 * @public
 */
export class SaveColor {

  public save(objCustomCSS: IColor) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    fetch('api/v1/savecolor', {
      method: 'POST',
      headers,
      body: JSON.stringify(objCustomCSS),
    })
      .then((res) => {
          return res.json();
        },
      )
      .then(
        (result) => {
          // console.log(result);
        },
        (error: TypeError) => {
          console.log(error);
        },
      );
  }

  /**
   * Gets the last colors saved by the user
   * @public
   */
  // public getDataColors(callback: ((result: Array<IColor>) => void)): void {
  public getDataColors(callback: getColorCallbackType): void {
    fetch('api/v1/getcolor', {
      method: 'GET',
      headers: new Headers(),
    })
        .then((res) => {
              return res.json();
            },
        )
        .then(
            (result) => {
                /*result.forEach((subArray: Array<IColor>) => {
                    callback(subArray);
                }*/
                callback(result);

              console.log('The colors are:' + result);
            },
            (error: TypeError) => {
              console.log(error);
            },
        );
  }

}
