<?php
require('config.php');

$code = $_POST["code"];
$gkendama = $_POST["gkendama"];
$ghikikomori = $_POST["ghikikomori"];
$gtsundoku = $_POST["gtsundoku"];
$gyarikomi = $_POST["gyarikomi"];
$gzappingu = $_POST["gzappingu"];



// $code = "BFBFB";
// $gkendama = "1";
// $ghikikomori = "1";
// $gtsundoku = "1";
// $gyarikomi = "0";
// $gzappingu = "1";

$sql = "INSERT INTO game (code, gkendama, ghikikomori, gtsundoku, gyarikomi, gzappingu) VALUES (:Code, :Gkendama, :Ghikikomori, :Gtsundoku, :Gyarikomi, :Gzappingu)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Code' => $code, 'Gkendama' => $gkendama, 'Ghikikomori' => $ghikikomori, 'Gtsundoku' => $gtsundoku, 'Gyarikomi' => $gyarikomi, 'Gzappingu' => $gzappingu));

if ($erfolg) {

    print_r('Registrierung erfolgreich.');
} else {

    print_r($erfolg);
};