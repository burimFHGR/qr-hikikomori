<?php
require('config.php');

$code = $_POST["code"];
$playstory = $_POST["playstory"];
$timestamp = $_POST["timestamp"];


// $code = "BFBFB";
// $playstory = "1";
// $timestamp = "2024-04-30 02:00:00";

$sql = "INSERT INTO user (code, playstory, timestamp) VALUES (:Code, :Playstory, :Timestamp)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Code' => $code, 'Playstory' => $playstory, 'Timestamp' => $timestamp));

if ($erfolg) {

    // print_r('Registrierung erfolgreich.');
} else {

    print_r($erfolg);
};