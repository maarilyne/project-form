<?php
//use FormComponents;
namespace React\Api;

use React\Interfaces\IUser;
use stdClass;

/**
 * Class RegisterRoute
 * TODO Explain class concept
 * @package React\Api
 */
class RegisterRoute {
  private const FORM_KEY = 'form';

  /**
   * Hashes a password and returns it
   * @param string $pwd Password to hash
   * @return string Hashed password
   */
  public static function getPwdHashed(string $pwd): string {
    return hash_hmac('sha256', $pwd, file_get_contents("../../../database/pwdKey"));
  }

  /**
   * Generates a json file that saves the user's data
   * @param array $myarr
   */
  public function generateJsonFile(array $myarr): void {
    $currentJSON = json_decode(file_get_contents('../../../database/usersData.json'));
    if (!$currentJSON) {
      $currentJSON = [];
    } else {
      /** @var IUser $value */
      foreach ($currentJSON as $value) {
        if ($value->username === $myarr['pseudo']) {
          return;
        }
      }
    }

    $myarr['username'] = $myarr['pseudo'];
    unset($myarr['pseudo']);
    $myarr['pwd'] = self::getPwdHashed($myarr['pwd']);
    $currentJSON[] = $myarr;
    $json = json_encode($currentJSON);
    file_put_contents("../../../database/usersData.json", $json);
  }

  /**
   * Get Saved Form Data
   * @return ?array
   */
  public function getData(): ?array {
    return !empty($_SESSION[self::FORM_KEY]) ? $_SESSION[self::FORM_KEY] : null;
  }

  /**
   * Save Form Data
   * @param array $data Form database
   */
  public function setData(array $data): void {
    //$_SESSION[self::FORM_KEY] = $data;
    $this->generateJsonFile($data);
  }
}
