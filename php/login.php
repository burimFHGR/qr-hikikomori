<?php
require('config.php');

$code = $_POST["code"];

$sql = "SELECT * FROM user WHERE code = :code";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':code', $code, PDO::PARAM_STR);
$erfolg = $stmt->execute();

if ($erfolg) {
    $array = $stmt->fetchAll();

    $anzahlResultate = count($array);

    if ($anzahlResultate == 1) {
        $dbCode = $array[0]['code'];
        $userID = $array[0]['ID'];

        echo("Verbindung war erfolgreich.");

        playstoryAufeins($userID, $pdo);
    } else {
        echo("Verbindung fehlgeschlagen, bitte den </br> Code überprüfen.");
    }
} else {
    echo("Datenbankabfrage fehlgeschlagen. Bitte Desktop-Seite neu laden und erneut mit neuem Code versuchen.");
}

function playstoryAufeins($ID, $pdo) {
    $sql = "UPDATE user SET playstory = 1 WHERE ID = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$ID]);
}
?>
