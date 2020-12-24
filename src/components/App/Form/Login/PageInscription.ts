import {IDataUser} from './InscriptionPageComponents';

export class PageInscription {
  public signIn(login: IDataUser) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    fetch('/api/v1/inscription', {
      method: 'POST',
      headers,
      body: JSON.stringify(login),
    })
      .then((res) => {
          return res.json();
        },
      )
      .then(
        (result) => {
          // tslint:disable-next-line:no-console
          console.log(result);
        },
        (error: TypeError) => {
          // tslint:disable-next-line:no-console
          console.log(error);
        },
      );
  }
}
