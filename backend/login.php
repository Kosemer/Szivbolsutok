<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$username = $input["username"];
$password = $input["password"];

$correctUsername = $_ENV['USERNAME'];
$correctPassword = $_ENV['PASSWORD'];

if ($username === $correctUsername && $password === $correctPassword) {
    http_response_code(200);
    echo json_encode(["success" => true]);
} else {
    http_response_code(401);
    echo json_encode(["success" => false]);
}
?>
