<?php

// disable cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$timeZoneConnect = mysqli_connect("localhost", "root", "", "world_clock");
$response = new StdClass();

if(!$timeZoneConnect) {
    $response->message = "database error";
    $response->data = [];
    print(json_encode($response));
    exit;
}

$response->message = "ok";
$key = $_GET['key'];
$query = mysqli_query($timeZoneConnect, "SELECT * FROM time_zone WHERE country_name LIKE '%$key%' LIMIT 20");
$timeZones = [];
while($data = mysqli_fetch_assoc($query)) {
    $timeZones[] = $data;
}
$response->data = $timeZones;
$response = json_encode($response);

print($response);