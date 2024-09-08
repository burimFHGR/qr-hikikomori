<?php

require('config.php');

$code = $_POST["code"];

$sql = "UPDATE journal SET jzappingu = 1 WHERE code = ?";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$code]);

if ($erfolg) {
    echo "Zappingu wurde erfolgreich aktualisiert.";
} else {
    print_r($erfolg);
}
?>
