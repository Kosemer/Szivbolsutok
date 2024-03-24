<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');


function getImageDimensions($directory) {
    $imageFiles = glob($directory . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);
    $imageDimensions = [];

    foreach ($imageFiles as $imageFile) {
        $dimensions = getimagesize($imageFile);
        $width = $dimensions[0];
        $height = $dimensions[1];
        $imageName = basename($imageFile);
        //$serverUrl = 'https://www.fruzsiphoto.hu/'; // Szerver
        $serverUrl = 'http://localhost/'; // Localhost
        $relativePath = str_replace('../', '/', $imageFile);

        $imageDimensions[] = [
            'src' => $serverUrl . $relativePath,
            'title' => $imageName,
            'width' => $width,
            'height' => $height
        ];
    }

    return $imageDimensions; // Ne JSON-ként térjünk vissza
}

$directory = '../assets/'; // Itt van tárolva az összes mappa.
$folderParam = isset($_GET['folder']) ? $_GET['folder'] : 'wedding'; // Alapértelmezett mappanév 'wedding'
$folders = explode(',', $folderParam);

$imageDimensions = [];

foreach ($folders as $folder) {
    $fullDirectory = $directory . $folder . '/';
    $folderImageDimensions = getImageDimensions($fullDirectory);
    $imageDimensions = array_merge($imageDimensions, $folderImageDimensions);
}

// Képek rendezése csökkenő sorrendben a timestamp alapján
usort($imageDimensions, function ($a, $b) {
    return $b['src'] <=> $a['src'];
});

$imageDimensionsJson = json_encode($imageDimensions);
echo $imageDimensionsJson;
?>
