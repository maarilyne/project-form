<?php
/*echo 'api';
var_dump($_SERVER);*/

require '../../../vendor/autoload.php';

// This file saves the new subscribers' database
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use React\Autoloader;
use Slim\App;
use React\Api\RegisterRoute;
use React\Api\LoginRoute;
use React\Api\SaveColorRoute;

session_start();
ob_start();

include_once __DIR__ . '/../../../server/src/Autoloader.php';
$autoloader = new Autoloader();
$autoloader->register();

/**
 * Write Rest API Response
 * => Clean output buffer before writting response
 * @param Response $response Rest API Response Object
 * @param string $result Data to send to client (response)
 */
function writeResponse(Response $response, string $result): void {
  ob_clean();
  $response->getBody()->write($result);
}

$app = new App();

//Retrieves all the data sent in /form url and displays it on this page
$app->get('/form', function (Request $request, Response $response, array $args) {
  $routeClass = new RegisterRoute();
  $retrievedData = $routeClass->getData();
  writeResponse($response, json_encode($retrievedData));
});


//Saves data sent in /form url, inside the $_SESSION variable
$app->post('/form', function (Request $request, Response $response) {
  $reqData = $request->getParsedBody();
  $registerClass = new RegisterRoute();
  $registerClass->setData($reqData);
  writeResponse($response, json_encode(true));
});

//Saves data sent in /form url, inside the $_SESSION variable
$app->post('/login', function (Request $request, Response $response) {
  $reqData = $request->getParsedBody();
  $loginClass = new LoginRoute();
  $isLogged = $loginClass->logUser($reqData);
  writeResponse($response, json_encode($isLogged));
});

$app->get('/inscription', function (Request $request, Response $response, array $args) {
  $routeClass = new RegisterRoute();
  $retrievedData = $routeClass->getData();
  writeResponse($response, json_encode($retrievedData));
});

$app->post('/inscription', function (Request $request, Response $response) {
  $reqData = $request->getParsedBody();
  $registerClass = new RegisterRoute();
  $registerClass->setData($reqData);
  writeResponse($response, json_encode(true));
});

$app->get('/logout', function (Request $request, Response $response) {
  $logoutClass = new LoginRoute();
  $isLoggedOut = $logoutClass->logout();
  writeResponse($response, json_encode($isLoggedOut));
});

/**
 * Route permettant de sauvegarder la couleur via SaveColorRoute
 */
$app->post('/savecolor', function (Request $request, Response $response) {
  $reqData = $request->getParsedBody();
  $registerClass = new SaveColorRoute();
  $registerClass->setData($reqData);
  writeResponse($response, json_encode(true));
});

// sleep(3);

$app->run();
