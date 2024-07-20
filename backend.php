<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Music Distribution Service</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <h1>AI Music Distribution Service</h1>
    
    <!-- Metadata Form -->
    <div>
        <h2>Fill in Metadata</h2>
        <form id="metadataForm">
            <input type="text" id="artist" name="artist" placeholder="Artist" required>
            <input type="text" id="song" name="song" placeholder="Song" required>
            <input type="text" id="album" name="album" placeholder="Album" required>
            <select id="ratio" name="ratio" required>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="tiktok">TikTok</option>
                <option value="soundcloud">SoundCloud</option>
                <option value="audiomack">Audiomack</option>
                <option value="bandlab">Bandlab</option>
                <option value="bandcamp">Bandcamp</option>
            </select>
            <button type="button" onclick="generateURIs()">Generate URIs</button>
            <div id="uriOutput"></div>
        </form>
    </div>

    <!-- Video Generation -->
    <div>
        <h2>Generate AI Music Video</h2>
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" id="coverArt" name="coverArt" accept="image/*" required>
            <input type="file" id="audioFile" name="audioFile" accept="audio/*" required>
            <button type="button" onclick="generateAndUploadVideo()">Generate and Upload Video</button>
        </form>
        <video id="videoPlayer" controls>
            <source id="videoSource" src="" type="video/mp4">
        </video>
        <div id="distributionStatus"></div>
    </div>

    <!-- Saved Videos -->
    <div>
        <button onclick="loadSavedVideos()">Load Saved Videos</button>
        <div id="savedVideos"></div>
    </div>

    <script src="scripts/scripts.js"></script>
</body>
</html>
