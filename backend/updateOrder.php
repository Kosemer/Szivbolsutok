<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
// A fájlt úgy állítsd be, hogy csak POST kéréssel érhető el
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "Not Allowed";
    exit;
}

// Kapd meg a JSON adatot a POST kérésből
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

// Ellenőrizd, hogy a szükséges adatok rendelkezésre állnak-e
if (!isset($data['folder']) || !isset($data['order'])) {
    echo "Invalid data";
    exit;
}

// Ellenőrizd, hogy létezik-e a mappa
$folder = $data['folder'];
if (!file_exists($folder)) {
    echo "Folder does not exist";
    exit;
}

// Mentsd el az új sorrendet az order.json fájlba
$order = $data['order'];
file_put_contents($folder . '/order.json', json_encode($order));

echo "Order updated";
?>
