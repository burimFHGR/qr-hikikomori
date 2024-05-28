<?php

require('config.php');

try {
    // Beginne eine Transaktion
    $pdo->beginTransaction();

    // Wähle alle Einträge aus, deren timestamp älter als eine Minute ist
    $stmt = $pdo->prepare("SELECT ID FROM user WHERE timestamp < NOW() - INTERVAL 3 HOUR AND playstory = 0");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Überprüfe ob es Ergebnisse gibt
    if ($results) {
        // Lösche die Einträge aus der Datenbank
        $deleteStmt = $pdo->prepare("DELETE FROM user WHERE ID = :id");

        foreach ($results as $row) {
            $deleteStmt->execute([':id' => $row['ID']]);
        }
    }

    // Commit der Transaktion
    $pdo->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Entries older than one minute have been deleted'
    ]);
} catch (Exception $e) {
    // Rollback der Transaktion im Fehlerfall
    $pdo->rollBack();
    
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>