<?php

namespace React\Api;

use React\Interfaces\IColorsUsers;

/**
 * Class SaveColorRoute
 * TODO Explain class concept
 * @package React\Api
 */
class SaveColorRoute {
  private const JSON_FILENAME = '../../../database/colorsData.json';

  /**
   * Generates a json file that saves the user's color data
   * - Get previous values
   * - Create a new array (will be used to save new json content)
   * - Add current changes ($myarr)
   * - Loop over existing values and add those differents from current changes (type attribute)
   * - save new array into colorsData.json
   * @param IColorsUsers $userData Colors object for connected user
   */
  private function generateJsonFile(IColorsUsers $userData): void {
    /** @var IColorsUsers[]|false $currentJSON */
    $currentJSON = json_decode(file_get_contents(self::JSON_FILENAME));

    // Stores new values
    $newContentJson = [$userData];

    if ($currentJSON !== false) {
      foreach ($currentJSON as $value) {
        // Lorsque le user dans le fichier json est déférent au username passé en params on l'ajoute
        if ($value->user !== $userData->user) {
          $newContentJson[] = $value;
        }
      }
    }

    // save $newContentJson into colorsData.json
    $json = json_encode($newContentJson);
    file_put_contents(self::JSON_FILENAME, $json);
  }

  /**
   * Get Saved Form Data
   * @return ?array
   */
  public function getData(): array {
    $currentJSON = json_decode(file_get_contents(self::JSON_FILENAME));
    if (is_array($currentJSON)) {
      return $currentJSON;
    }
    return [];
  }

  /**
   * Save Colors for connected user
   * @param array $data Colors for connected user
   * @param string $username Connected user name
   */
  public function setData(array $data, string $username): void {
    $userData = new IColorsUsers();
    $userData->user = $username;
    $userData->colors = $data;
    $this->generateJsonFile($userData);
  }
}
