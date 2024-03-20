<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// mappák elérési útja
$folders = [
    "portrait" => "assets/",
    "wedding" => "assets/",
    "Boudoir" => "assets/",
    "sport" => "assets/",
    "family" => "assets/",
    "event" => "assets/",
];

$data = json_decode(file_get_contents("php://input"));

$folder = $data->folder;
$imageOrder = $data->imageOrder;

if (!isset($folders[$folder])) {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid folder."));
    exit();
}

$folderPath = $folders[$folder];


$newPaths = [];

foreach ($imageOrder as $index => $imageName) {
    $oldPath = $folderPath . "/" . $imageName;
    $newName = sprintf("%03d", $index) . "_" . $imageName;
    $newPath = $folderPath . "/" . $newName;
    $newPaths[] = $newPath;


    if ($oldPath !== $newPath) {
        if (!rename($oldPath, $newPath)) {
            http_response_code(500);
            echo json_encode(array("message" => "Unable to rename file."));
            exit();
        }
    }
}

http_response_code(200);
echo json_encode(array("message" => "Images reordered successfully.", "newPaths" => $newPaths));
