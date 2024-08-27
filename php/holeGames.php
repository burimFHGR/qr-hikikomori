<?php

require('config.php');

$sql = "SELECT code, gkendama, gzappingu, ghikikomori, gtsundoku, gyarikomi FROM game WHERE code = ?";
$stmt = $pdo->prepare($sql);

// Assuming 'code' is passed via POST
$code = $_POST['code']; 

// Pass the $code variable as a parameter to the execute() method
$erfolg = $stmt->execute([$code]);

if ($erfolg) {
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch associative array
    $jsonArray = json_encode($array);
    print_r($jsonArray); // Output the JSON encoded array
} else {
    echo "Error executing the query.";
}

