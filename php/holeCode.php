<?php
header('Content-Type: application/json'); // JSON-Header setzen

require('config.php');

// Verbindung überprüfen
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Verbindung fehlgeschlagen: " . $conn->connect_error]);
    exit();
}

// Eingabecode aus dem POST-Request holen
if (!isset($_POST['code'])) {
    echo json_encode(["success" => false, "message" => "Kein Code angegeben."]);
    exit();
}

$codeInput = $_POST['code'];

// SQL-Abfrage vorbereiten und ausführen
$sql = "SELECT user FROM users WHERE code = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Fehler bei der Vorbereitung der Abfrage: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $codeInput);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Code existiert, playstory auf 1 setzen
    $row = $result->fetch_assoc();
    $user = $row['user'];

    $updateSql = "UPDATE users SET playstory = 1 WHERE code = ?";
    $updateStmt = $conn->prepare($updateSql);
    if ($updateStmt === false) {
        echo json_encode(["success" => false, "message" => "Fehler bei der Vorbereitung der Aktualisierungsabfrage: " . $conn->error]);
        exit();
    }

    $updateStmt->bind_param("s", $codeInput);
    $updateStmt->execute();

    if ($updateStmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Code erfolgreich verifiziert und playstory aktualisiert.", "user" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "Fehler beim Aktualisieren von playstory."]);
    }
} else {
    // Code existiert nicht
    echo json_encode(["success" => false, "message" => "Ungültiger Code."]);
}

// Verbindung schließen
$conn->close();
?>
