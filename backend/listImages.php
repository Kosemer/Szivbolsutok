<?php
header("Access-Control-Allow-Origin: *");

$folder = isset($_GET['folder']) ? $_GET['folder'] : '';

$images_dir = '../assets/' . $folder;
$images = glob($images_dir . "/*.{jpg,jpeg,png,gif}", GLOB_BRACE);

// Teljes elérési út hozzáadása a válaszhoz
$images = array_map(function ($image) {
    return str_replace('../assets/', '', $image); // Módosítva
}, $images);

header('Content-Type: application/json');
echo json_encode($images);
?>
