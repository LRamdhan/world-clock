<?php

// disable cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$key = $_GET["key"];
$result = file_get_contents("https://timeapi.io/api/Time/current/zone?timeZone=$key");
echo $result;

?>