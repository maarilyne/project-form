<?php
//use FormComponents;
namespace React\Api;
use stdClass;

/**
 * Class RegisterRoute
 * TODO Explain class concept
 * @package React\Api
 */
class RegisterRoute{
    private const FORM_KEY = 'form';

  /**
   * Generates a json file that saves the user's data
   * @param array $myarr
   */
    public function generateJsonFile(array $myarr): void {
        $currentJSON = json_decode(file_get_contents('../../../database/usersData.json'));
        if (!$currentJSON) {
            $currentJSON = [];
        } else {
          foreach($currentJSON as $value) {
            if ($value->pseudo === $myarr['pseudo']){
              return;
            }
          }
        }

        $myarr['pwd'] = hash_hmac('sha256', $myarr['pwd'], file_get_contents("../../../database/pwdKey"));
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
