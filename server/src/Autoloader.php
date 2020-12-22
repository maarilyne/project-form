<?php
// $Revision$

namespace React;

/**
 * PSR-0 Autoloader
 */
class Autoloader {

  /** @var string Project NameSpace */
  private const REACT_NAMESPACE = 'React';

  /**
   * Get NameSpace Path
   * @param array $nameSpaceList
   * @param string $baseNamespaceToIgnore If first namespace is equal to this string, it will be ignored
   * @return string
   */
  protected function getPathForNameSpace(array $nameSpaceList, string $baseNamespaceToIgnore): string {
    $nameSpaceList = array_map(
        static function (string $nameSpace): string {
          return $nameSpace;
        },
        $nameSpaceList
    );

    if (strtolower($nameSpaceList[0]) === strtolower($baseNamespaceToIgnore)) {
      array_shift($nameSpaceList);
    }

    return implode('/', $nameSpaceList);
  }

  /**
   * Get Name Space List
   * @param string $nameSpace
   * @return array
   */
  protected function getNameSpaceList(string $nameSpace): array {
    $nameSpaceList = explode('\\', $nameSpace);
    if ($nameSpaceList[0] === "") {
      array_shift($nameSpaceList);
    }

    return $nameSpaceList;
  }

  /**
   * Get File Path to include
   * @param string $classWithNameSpace
   * @return string
   */
  protected function getFilePath(string $classWithNameSpace): string {
    $endNamespace = strrpos($classWithNameSpace, '\\');
    if ($endNamespace > 0) {
      $nameSpace = substr($classWithNameSpace, 0, $endNamespace + 1);
      $className = substr($classWithNameSpace, $endNamespace + 1);

      $nameSpaceList = $this->getNameSpaceList($nameSpace);
      if (strtolower($nameSpaceList[0]) === strtolower(self::REACT_NAMESPACE)) {
        // Common Files
        $nameSpace = $this->getPathForNameSpace($nameSpaceList, self::REACT_NAMESPACE);
        return __DIR__ . '/' . $nameSpace . $className . '.php';
      }
    }

    return '';
  }

  /**
   * Try to load a class
   *
   * @param string $classWithNameSpace The class name to load
   * @return boolean If the loading was successful
   */
  final public function load(string $classWithNameSpace): bool {
    $result = false;

   $fileName = $this->getFilePath($classWithNameSpace);

    // if the file exists, require it
    if ($fileName !== '' && file_exists($fileName)) {
      include_once $fileName;
      $result = true;
    }

    return $result;
  }

  /**
   * Register the autoloader to PHP
   *
   * @return boolean The status of the registration
   */
  final public function register(): bool {
    return spl_autoload_register([$this, 'load']);
  }
}
