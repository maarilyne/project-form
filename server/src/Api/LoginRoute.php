<?php


namespace React\Api;


use React\Interfaces\IUser;

class LoginRoute {
  private const FORM_KEY = 'profileUser';

  /**
   * Get Saved Form Data
   * @return ?array
   */
  public function getData(): ?array {
    return !empty($_SESSION[self::FORM_KEY]) ? $_SESSION[self::FORM_KEY] : null;
  }

  /**
   * Save Form Data
   * @param ?array $data Form database
   */
  private function setData(?array $data): void {
    $_SESSION[self::FORM_KEY] = $data;
  }

  /**
   * Log the user if he exists
   * - if true => Add User name in session
   * @param array $credentials [user, pwd] User and password
   * @return bool True if user is logged else false
   */
  public function logUser(array $credentials): bool {
    $pwd = RegisterRoute::getPwdHashed($credentials[1]);
    echo
    $json_file = json_decode(file_get_contents('../../../database/usersData.json'));
    if (is_array($json_file)) {
      /** @var IUser $user */
      foreach ($json_file as $user) {
        if (isset($user->username, $user->pwd) && $user->username === $credentials[0] && $user->pwd === $pwd) {
          $this->setData(['username' => $credentials[0]]);
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Déconnecte l'utilisateur
   * - Vide $_SESSION
   * - Détruit le fichier de session
   * Si l'utilisateur n'est pas connecté la fonction retourne false
   * @return bool
   */
  public function logout(): bool {
    if ($this->getData() === null) {
      return false;
    }
    // $_SESSION = [];
    session_destroy();
    return true;
  }
}