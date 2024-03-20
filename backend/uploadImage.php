<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $target_dir = $_POST['folder'] ? $_POST['folder'] . '/' : '';
    $full_target_dir = '../assets/' . $target_dir;
    
    if (!file_exists($full_target_dir)) {
        mkdir($full_target_dir, 0755, true);
    }
    
    $filename = pathinfo($_FILES['image']['name'], PATHINFO_FILENAME);
    $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $timestamp = time();

    $new_filename = $timestamp . '.' . $extension; // Timestamp a kép nevében
    $target_file = $full_target_dir . $new_filename;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        echo 'A kép sikeresen feltöltve: ' . $target_file;
    } else {
        echo 'Hiba történt a kép feltöltése során.';
    }
}

?>
