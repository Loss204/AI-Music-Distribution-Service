<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Distro Run Music</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <img src="logo.png" alt="Distro Run Music Logo" class="logo">
        <h1>Distro Run Music</h1>
        <p class="disclaimer">
            Disclaimer: I am the music distributor. You can choose the ratio for music video distribution for apps like YouTube Music and Vimeo. For audio uploads, you can convert the audio file into an AI-generated video file.
        </p>
        <form id="musicForm">
            <label for="artist">Artist:</label>
            <input type="text" id="artist" name="artist" required>

            <label for="song">Song:</label>
            <input type="text" id="song" name="song" required>

            <label for="album">Album:</label>
            <input type="text" id="album" name="album" required>

            <label for="coverArt">Cover Art Image:</label>
            <input type="file" id="coverArt" name="coverArt" accept="image/*" required>

            <label for="audioFile">Audio File:</label>
            <input type="file" id="audioFile" name="audioFile" accept="audio/*" required>

            <label for="ratio">Choose Video Ratio / Audio Platform:</label>
            <select id="ratio" name="ratio" onchange="updateStatus()">
                <option value="youtube">YouTube (16:9)</option>
                <option value="vimeo">Vimeo (16:9)</option>
                <option value="tiktok">TikTok (9:16)</option>
                <option value="soundcloud">SoundCloud (Audio)</option>
                <option value="audiomack">Audiomack (Audio)</option>
                <option value="bandlab">Bandlab (Audio)</option>
                <option value="bandcamp">Bandcamp (Audio)</option>
            </select>

            <button type="button" onclick="generateURIs()">Generate URIs</button>
            <button type="button" onclick="generateAndDownloadVideo()">Generate and Download Video</button>
        </form>
        <div id="uriOutput"></div>
        <div id="statusOutput">
            <h2>Distribution Status</h2>
            <p id="distributionStatus">Select a ratio/platform to see the status</p>
        </div>
        <div id="videoPreview">
            <h2>Video Preview</h2>
            <video id="videoPlayer" width="100%" controls>
                <source id="videoSource" src="" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div id="localStorageControls">
            <button type="button" onclick="saveVideoLocally()">Save Video Locally</button>
            <button type="button" onclick="loadSavedVideos()">Load Saved Videos</button>
        </div>
        <div id="savedVideos"></div>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
