<?php


namespace React\Core;


class BundleLoader {

  /**
   * @var array
   */
  private $bundles;

  /**
   * BundleLoader constructor.
   * Initialize bundles list
   */
  public function __construct() {
    $this->bundles = json_decode(file_get_contents(__DIR__ . '/../../../public/client/manifest.json'), true);
  }

  /**
   * Get generated Bundle name
   * @param string $bundleName original bundle name
   * @return string
   */
  public function getBundle(string $bundleName): string {
    //return $this->bundles[$bundleName] ?? '';
    return $this->bundles[$bundleName] !== null ?
        str_replace('public/', '', $this->bundles[$bundleName]) : '';
  }

}
