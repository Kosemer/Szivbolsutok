<?php

header("Access-Control-Allow-Origin: *");

// Meghatározod a könyvtárat, amelynek a méretét ellenőrizni szeretnéd
$directory = __DIR__ . '/../';
  // a jelenlegi könyvtár méretét nézi

function getDirectorySize($dir)
{
    $size = 0;

    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS)) as $file) {
        $size += $file->getSize();
    }

    // Átváltás byte-ból megabyte-ba
    $size = $size / 1024 / 1024;

    return $size;
}

$totalSpace = 1024; // A teljes tárhely mérete megabyteban
$directorySize = getDirectorySize($directory);
$freeSpace = $totalSpace - $directorySize;

header("Content-Type: application/json");
echo json_encode([
    "directorySize" => round($directorySize, 2),
    "freeSpace" => round($freeSpace, 2),
]);

?>
