<?php

require('config.php');

$code = $_POST["code"];

$sql = "UPDATE game SET gzappingu = 0, gkendama = 0, ghikikomori = 0, gtsundoku = 0, gyarikomi = 0 WHERE code = ?";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$code]);

if ($erfolg) {
    echo "Games wurden auf 0 gebracht.";
} else {
    print_r($erfolg);
}
?>
