<?php
require('config.php');

// Ensure that the `code` parameter is being received correctly
$code = isset($_GET['code']) ? $_GET['code'] : '';

$sql = "SELECT playstory FROM user WHERE code = :code";

$stmt = $pdo->prepare($sql);

// Bind the parameter to the SQL statement
$stmt->bindParam(':code', $code, PDO::PARAM_STR);

$erfolg = $stmt->execute();

$response = [];

if ($erfolg) {
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        $response['playStory'] = $result['playstory'];
    } else {
        $response['playStory'] = '0';
    }
} else {
    $response['error'] = 'Database query failed';
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
