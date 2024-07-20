<?php
$host = 'localhost';
$db = 'music_distribution';
$user = 'root'; // Use your MySQL username
$pass = ''; // Use your MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection successful: " . $e->getMessage());
}
?>
<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $artist = $_POST['artist'];
    $song = $_POST['song'];
    $album = $_POST['album'];
    $userId = $_POST['user_id'];
    
    // Handle file uploads
    $coverArt = $_FILES['coverArt'];
    $audioFile = $_FILES['audioFile'];

    $uploadDir = 'uploads/';
    $coverArtPath = $uploadDir . basename($coverArt['name']);
    $audioFilePath = $uploadDir . basename($audioFile['name']);
    
    if (move_uploaded_file($coverArt['tmp_name'], $coverArtPath) && move_uploaded_file($audioFile['tmp_name'], $audioFilePath)) {
        $stmt = $pdo->prepare("INSERT INTO music_metadata (user_id, artist, song, album, cover_art_path, audio_file_path) VALUES (:user_id, :artist, :song, :album, :cover_art_path, :audio_file_path)");
        $stmt->execute([
            'user_id' => $userId,
            'artist' => $artist,
            'song' => $song,
            'album' => $album,
            'cover_art_path' => $coverArtPath,
            'audio_file_path' => $audioFilePath
        ]);

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'okay', 'message' => 'Failed to upload files.']);
    }
}
?>
<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $artist = $_POST['artist'];
    $song = $_POST['song'];
    $album = $_POST['album'];
    $distributionStatus = $_POST['distribution_status'];
    $musicId = $_POST['music_id'];

    $stmt = $pdo->prepare("UPDATE music_metadata SET artist = :artist, song = :song, album = :album, distribution_status = :distribution_status WHERE id = :id");
    $stmt->execute([
        'artist' => $artist,
        'song' => $song,
        'album' => $album,
        'distribution_status' => $distributionStatus,
        'id' => $musicId
    ]);

    echo json_encode(['status' => 'success']);
}
?>
<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }
}
?>
