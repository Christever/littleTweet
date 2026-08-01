<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");


// Gestion de la requête OPTIONS (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}


// Vérification méthode
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Méthode non autorisée"
    ]);

    exit;
}


// Vérification fichier
if (!isset($_FILES["image"])) {

    echo json_encode([
        "success" => false,
        "message" => "Aucun fichier reçu"
    ]);

    exit;
}


// Récupération paramètres
$project = $_POST["project"] ?? "common";
$folder  = $_POST["folder"] ?? "images";


// Nettoyage des noms de dossiers
function cleanPath($value)
{
    return preg_replace(
        "/[^a-zA-Z0-9_-]/",
        "",
        $value
    );
}


$project = cleanPath($project);
$folder  = cleanPath($folder);


// Valeurs par défaut si vide
if ($project === "") {
    $project = "common";
}

if ($folder === "") {
    $folder = "images";
}


// Récupération image
$image = $_FILES["image"];


// Erreur upload PHP
if ($image["error"] !== UPLOAD_ERR_OK) {

    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'upload"
    ]);

    exit;
}


// Taille max : 6 Mo
$maxSize = 6000000;

if ($image["size"] > $maxSize) {

    echo json_encode([
        "success" => false,
        "message" => "Image trop volumineuse"
    ]);

    exit;
}


// Vérification type MIME réel
$finfo = finfo_open(FILEINFO_MIME_TYPE);

$mime = finfo_file(
    $finfo,
    $image["tmp_name"]
);

finfo_close($finfo);



$allowedMime = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];


if (!in_array($mime, $allowedMime)) {

    echo json_encode([
        "success" => false,
        "message" => "Type de fichier interdit"
    ]);

    exit;
}


// Extension
$extension = strtolower(
    pathinfo(
        $image["name"],
        PATHINFO_EXTENSION
    )
);


$allowedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif"
];


if (!in_array($extension, $allowedExtensions)) {

    echo json_encode([
        "success" => false,
        "message" => "Extension interdite"
    ]);

    exit;
}


// Nom fichier unique
$filename = uniqid("file_", true) . "." . $extension;


// Chemin serveur
$uploadDir =
    __DIR__
    . "/../uploads/"
    . $project
    . "/"
    . $folder
    . "/";


// Création dossier
if (!is_dir($uploadDir)) {

    mkdir(
        $uploadDir,
        0755,
        true
    );
}


// Déplacement fichier
$target = $uploadDir . $filename;


if (!move_uploaded_file(
    $image["tmp_name"],
    $target
)) {

    echo json_encode([
        "success" => false,
        "message" => "Impossible de déplacer le fichier"
    ]);

    exit;
}


// URL publique
$url =
    "https://www.steverlynck.fr/uploads/"
    . $project
    . "/"
    . $folder
    . "/"
    . $filename;



echo json_encode([
    "success" => true,
    "url" => $url
]);
