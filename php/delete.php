<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}


if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Méthode non autorisée"
    ]);

    exit;
}


// Récupération URL
$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!isset($data["url"])) {

    echo json_encode([
        "success" => false,
        "message" => "URL manquante"
    ]);

    exit;
}


$url = $data["url"];


// Sécurité : on ne supprime que dans uploads
$baseUrl = "https://www.steverlynck.fr/uploads/";

if (!str_starts_with($url, $baseUrl)) {

    echo json_encode([
        "success" => false,
        "message" => "Fichier non autorisé"
    ]);

    exit;
}


// On récupère le chemin relatif
$file = str_replace(
    $baseUrl,
    "",
    $url
);


// Chemin serveur
$path = __DIR__ . "/../uploads/" . $file;


// Vérification existence
if (file_exists($path)) {

    unlink($path);

    echo json_encode([
        "success" => true,
        "message" => "Image supprimée"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Fichier introuvable"
    ]);
}
