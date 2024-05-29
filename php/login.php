<?php
require('config.php');

$code = $_POST["code"];


$sql = "SELECT * FROM user WHERE code = '$code'";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $anzahlResultate = count ($array);

    $dbCode = $array[0]['code'];
    $userID = $array[0]['ID'];

    if ($anzahlResultate == 1) {
        echo("Verbindung war erfolgreich.");

        print_r($dbCode . " " . $code);

        playstoryAufeins($userID, $pdo);
    } 

    else {
        echo("Verbindung fehlgeschlagen, bitte den Code überprüfen.");
    }

    // $jsonArray = json_encode($array);

    // print_r($jsonArray);
}

function playstoryAufeins($ID, $pdo) {
    $sql = "UPDATE user SET playstory = 1 WHERE ID = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$ID]);
}


