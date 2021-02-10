<?php

use React\Api\LoginRoute;
use React\Autoloader;
use React\Core\BundleLoader;

session_start();
ob_start();

include_once __DIR__ . '/../server/src/Autoloader.php';
$autoloader = new Autoloader();
$autoloader->register();

$bundleLoader = new BundleLoader();
$mainJs = $bundleLoader->getBundle('main.js');
$mainCss = $bundleLoader->getBundle('main.css');

$loginRoute = new LoginRoute();
if ($loginRoute->getData() !== null) {
    $loggedVar = 'true';
} else {
    $loggedVar = 'false';
}
/*if($loginRoute->logout())
    session_destroy();
}
//$loggedVar = 'false';*/
ob_end_clean();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="<?php echo $mainCss; ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Formulaire dynamique</title>
  </head>
  </div>
  <body>
      <header>
          <h1>Projet 1 - Formulaire React</h1>
      </header>
    <div id="root"></div>
<!-- Div permettant d'afficher le component correspondant au panel color picker -->
    <div id="sideComponent"></div>
    <footer></footer>
    <script>window.isLogged = <?php echo $loggedVar ?>;</script>
    <script src="<?php echo $mainJs; ?>"></script>
  </body>
</html>
