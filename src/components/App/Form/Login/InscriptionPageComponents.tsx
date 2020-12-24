// @ts-ignore
import React, {useState} from 'react';
import {PageInscription} from './PageInscription';

export interface IDataUser {
  pseudo: string;
  pwd: string;
}

export const InscriptionPageComponents = (): JSX.Element => {
  const [loginInscription, setLoginInscription] = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  function onclick(event: any): void {
    event.preventDefault();

    const dataUser: IDataUser = {
      pseudo: loginInscription,
      pwd : loginPwd,
    };

    const pageInscription = new PageInscription();
    pageInscription.signIn(dataUser);
  }

  return (
    <form>
      <label htmlFor='pseudo'>Pseudo</label>
      <input id='pseudo' name='pseudo' type='text' title='pseudo' defaultValue={loginInscription}
             onBlur={(event: any) => {setLoginInscription(event.target.value); }} placeholder='Votre pseudo...'/>
      <label htmlFor='password'>Password</label>
      <input id='password' name='password' type='password' title='password' defaultValue={loginPwd}
             onBlur={(event: any) => {setLoginPwd(event.target.value); }} placeholder='Votre mot de passe...'/>
      <button type='button' onClick={onclick} value='save'>Envoyer</button>
    </form>
  );
};
