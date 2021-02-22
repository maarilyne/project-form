<?php
//use FormComponents;
namespace React\Api;
use stdClass;

/**
 * Class SaveColorRoute
 * TODO Explain class concept
 * @package React\Api
 */
class SaveColorRoute{
  private const FORM_KEY = 'form';
  /**
   * Generates a json file that saves the user's color data
   * - Get previous values
   * - Create a new array (will be used to save new json content)
   * - Add current changes ($myarr)
   * - Loop over existing values and add those differents from current changes (type attribute)
   * - save new array into colorsData.json
   * @param array $myarr
   */
  public function generateJsonFile(array $myarr): void {
    $currentJSON = json_decode(file_get_contents('../../../database/colorsData.json'));
    $newContentJson = [];
    $newContentJson[] = $myarr; // Stores new values
    if ($currentJSON !== false) {
      foreach ($currentJSON as $value) {
        if ($value->type !== $myarr['type']) {
          $newContentJson[] = $value; // keeps saved values
        }
      }
    }

    // save $newContentJson into colorsData.json
    $json = json_encode($newContentJson);
    file_put_contents("../../../database/colorsData.json", $json);
  }

  /**
   * Get Saved Form Data
   * @return ?array
   */
  public function getData(): array {
      $currentJSON = json_decode(file_get_contents('../../../database/colorsData.json'));
      if (is_array($currentJSON)) {
          return $currentJSON;
      }
      return [];
      // var_dump($_SESSION[self::FORM_KEY]);exit;
    //return !empty($_SESSION[self::FORM_KEY]) ? $_SESSION[self::FORM_KEY] : [];

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
