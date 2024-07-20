<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['coverArt']) && isset($_FILES['audioFile'])) {
    $coverArt = $_FILES['coverArt'];
    $audioFile = $_FILES['audioFile'];
    
    // Define upload directories
    $uploadDir = 'uploads/';
    $coverArtPath = $uploadDir . basename($coverArt['name']);
    $audioFilePath = $uploadDir . basename($audioFile['name']);
    
    // Move uploaded files
    if (move_uploaded_file($coverArt['tmp_name'], $coverArtPath) && move_uploaded_file($audioFile['tmp_name'], $audioFilePath)) {
        echo json_encode([
            'status' => 'success',
            'coverArtPath' => $coverArtPath,
            'audioFilePath' => $audioFilePath
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to upload files.']);
    }
}
?>
