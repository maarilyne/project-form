import {IColor} from './SaveColorBtnComponent';

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
          // tslint:disable-next-line:no-console
          console.log(result);

          // window.location.href = 'jjj';
          // LoadComponent.load(XXX);
        },
        (error: TypeError) => {
          // tslint:disable-next-line:no-console
          console.log(error);
        },
      );
  }
}
