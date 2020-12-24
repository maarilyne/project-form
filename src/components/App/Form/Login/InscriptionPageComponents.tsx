// @ts-ignore
import React from 'react';
import {PageInscription} from './PageInscription';

export interface IDataUser {
  pseudo: string;
  pwd: string;
}

export const InscriptionPageComponents = (): JSX.Element => {

  function onclick(event: any): void {
    event.preventDefault();
    // ma fonction ici

    const dataUser: IDataUser = {
      pseudo: '',
      pwd : '',
    };

    const pageInscription = new PageInscription();
    pageInscription.signIn(dataUser);
  }

  return (
    <form>
      <label htmlFor='pseudo'>Pseudo</label>
      <input id='pseudo' name='pseudo' type='text' title='pseudo' value='VALUE' placeholder='Votre pseudo...'/>
      <label htmlFor='password'>Password</label>
      <input id='password' name='password' type='password' title='password' value='VALUE' placeholder='Votre mot de passe...'/>
      <button type='button' onClick={onclick} value='save'>Envoyer</button>
    </form>
  );
};
