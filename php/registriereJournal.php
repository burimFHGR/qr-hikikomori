<?php
require('config.php');

$code = $_POST["code"];
$jkendama = $_POST["jkendama"];
$jhikikomori = $_POST["jhikikomori"];
$jtsundoku = $_POST["jtsundoku"];
$jyarikomi = $_POST["jyarikomi"];
$jzappingu = $_POST["jzappingu"];



// $code = "BFBFB";
// $gkendama = "1";
// $ghikikomori = "1";
// $gtsundoku = "1";
// $gyarikomi = "0";
// $gzappingu = "1";

$sql = "INSERT INTO journal (code, jkendama, jhikikomori, jtsundoku, jyarikomi, jzappingu) VALUES (:Code, :Jkendama, :Jhikikomori, :Jtsundoku, :Jyarikomi, :Jzappingu)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Code' => $code, 'Jkendama' => $jkendama, 'Jhikikomori' => $jhikikomori, 'Jtsundoku' => $jtsundoku, 'Jyarikomi' => $jyarikomi, 'Jzappingu' => $jzappingu));

if ($erfolg) {

    print_r('Registrierung erfolgreich.');
} else {

    print_r($erfolg);
};