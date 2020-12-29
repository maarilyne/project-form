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
     */
    public function generateJsonFile(array $myarr) {
        $currentJSON = json_decode(file_get_contents('../../../database/inscriptionData.json'));
        if (!$currentJSON) {
            $currentJSON = [];
        } else {
          foreach($myarr as $value){
            if ($currentJSON === $value['pseudo']){
              echo 'error user already exist';
              die;
            }
            $myarr['pwd'] = hash_hmac('sha256', $myarr['pwd'], file_get_contents("../../../database/pwdKey"));
            $currentJSON[] = $myarr;
          }
        }

        $json = json_encode($currentJSON);
        file_put_contents("../../../database/inscriptionData.json", $json);
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
