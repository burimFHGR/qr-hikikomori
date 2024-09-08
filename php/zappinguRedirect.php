<?php

require('config.php');

// Den Code aus POST-Anfrage erhalten
$code = $_POST["code"];

try {
    // Beginne eine Transaktion
    $pdo->beginTransaction();

    // Erstes Update
    $sql1 = "UPDATE journal SET jzappingu = 1 WHERE code = ?";
    $stmt1 = $pdo->prepare($sql1);
    $erfolg1 = $stmt1->execute([$code]);

    // Zweites Update
    $sql2 = "UPDATE game SET gzappingu = 1 WHERE code = ?";
    $stmt2 = $pdo->prepare($sql2);
    $erfolg2 = $stmt2->execute([$code]);

    // Überprüfe, ob beide Updates erfolgreich waren
    if ($erfolg1 && $erfolg2) {
        // Bestätige die Transaktion
        $pdo->commit();
        echo "Zappingu wurde erfolgreich aktualisiert.";
    } else {
        // Falls eines der Updates fehlschlägt, rolle die Transaktion zurück
        $pdo->rollBack();
        echo "Fehler: Zappingu konnte nicht aktualisiert werden.";
    }
} catch (Exception $e) {
    // Bei Fehlern die Transaktion zurückrollen
    $pdo->rollBack();
    echo "Fehler: " . $e->getMessage();
}

?>
