<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Engedélyezett eredet
header("Content-Type: application/json"); // Válasz tartalom típusa

// Kapcsolódás az adatbázishoz
$host = 'localhost';
$db   = 'fruzsiphoto';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$conn = new PDO($dsn, $user, $pass, $opt);

// Feltételezzük, hogy a képek sorrendjét a frontend JSON formátumban küldi el
// pl.: {"portrait": ["image1.jpg", "image2.jpg", "image3.jpg"]}

$folder = $_POST["folder"];
$imageOrder = json_decode($_POST['imageOrder'], true);



$checkFolder = $conn->prepare("SELECT * FROM image_gallery WHERE folder = :folder");
$checkFolder->execute([':folder' => $folder]);

if ($checkFolder->rowCount() == 0) {
    // Ha a mappa még nem létezik az adatbázisban, hozza létre
    $createFolder = $conn->prepare("INSERT INTO image_gallery (folder) VALUES (:folder)");
    $createFolder->execute([':folder' => $folder]);
}
    
try {
    foreach ($imageOrder as $index => $filename) {
        // Ellenőrzi, hogy a kép már szerepel-e az adatbázisban
        $checkImage = $conn->prepare("SELECT * FROM image_gallery WHERE folder = :folder AND filename = :filename");
        $checkImage->execute(['folder' => $folder, 'filename' => $filename]);
    
        if ($checkImage->rowCount() == 0) {
            // Ha a kép még nem szerepel az adatbázisban, hozza létre
            $sql = "INSERT INTO image_gallery (folder, filename, imageOrder) VALUES (:folder, :filename, :imageOrder)";
        } else {
            // Ha már szerepel, akkor frissíti a sorrendjét
            $sql = "UPDATE image_gallery SET `imageOrder` = :imageOrder WHERE `folder` = :folder AND `filename` = :filename";
        }
    
        $stmt = $conn->prepare($sql);
        $stmt->execute(['imageOrder' => $index, 'folder' => $folder, 'filename' => $filename]);
    }
    
} catch (PDOException $e) { 
    error_log('SQL error: ' . $e->getMessage());
    // Visszajelzés a frontendnek
    echo json_encode(['status' => 'error', 'message' => 'Database error.']);
    exit;
}

// Visszajelzés a frontendnek
echo json_encode(['status' => 'success', 'message' => 'Image imageOrder saved.']);
echo "POST data: " . print_r($_POST, true) . "\n";
echo "Raw input: " . file_get_contents('php://input') . "\n";
$stmt = $conn->prepare($sql);
//$stmt->execute(['imageOrder' => $index, 'folder' => $folder, 'filename' => $filename]);
$stmt->debugDumpParams();

?>
