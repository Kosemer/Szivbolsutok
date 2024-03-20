<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $imagePath = '../assets/' . $_DELETE['image'];

    if (unlink($imagePath)) {
        echo "A kép sikeresen törölve: " . $imagePath;
    } else {
        echo "Hiba történt a kép törlése során.";
    }
}

?>
