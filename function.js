// Function to generate URIs for uploading
function generateURIs() {
    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;
    const album = document.getElementById('album').value;
    const ratio = document.getElementById('ratio').value;

    let uriText = `<h3>Generated URIs:</h3><ul>`;
    
    if (ratio === 'youtube') {
        uriText += `<li><a href="https://www.youtube.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to YouTube</a></li>`;
    } else if (ratio === 'vimeo') {
        uriText += `<li><a href="https://vimeo.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to Vimeo</a></li>`;
    } else if (ratio === 'tiktok') {
        uriText += `<li><a href="https://www.tiktok.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to TikTok</a></li>`;
    } else if (ratio === 'soundcloud') {
        uriText += `<li><a href="https://soundcloud.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to SoundCloud</a></li>`;
    } else if (ratio === 'audiomack') {
        uriText += `<li><a href="https://audiomack.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to Audiomack</a></li>`;
    } else if (ratio === 'bandlab') {
        uriText += `<li><a href="https://www.bandlab.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to Bandlab</a></li>`;
    } else if (ratio === 'bandcamp') {
        uriText += `<li><a href="https://bandcamp.com/upload?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&album=${encodeURIComponent(album)}" target="_blank">Upload to Bandcamp</a></li>`;
    }

    uriText += `</ul>`;
    document.getElementById('uriOutput').innerHTML = uriText;
}

// Function to generate and download the AI music video
function generateAndDownloadVideo() {
    const coverArtInput = document.getElementById('coverArt');
    const audioFileInput = document.getElementById('audioFile');

    if (coverArtInput.files.length === 0 || audioFileInput.files.length === 0) {
        alert('Please upload both cover art and audio files.');
        return;
    }

    const coverArtFile = coverArtInput.files[0];
    const audioFile = audioFileInput.files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const coverArtDataUrl = event.target.result;

        // Generate the AI music video (simulated here)
        const videoBlob = new Blob([], { type: 'video/mp4' });

        // Create a URL for the video file
        const videoUrl = URL.createObjectURL(videoBlob);

        // Set the video source to the generated URL
        const videoSource = document.getElementById('videoSource');
        videoSource.src = videoUrl;

        // Load the video in the player
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.load();

        // Allow user to download the video
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = 'ai-generated-music-video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Set distribution status for video
        setDistributionStatus('Video generated and ready for preview and download.');

        // Save videoBlob to IndexedDB
        saveVideoToIndexedDB(videoBlob, 'ai-generated-music-video.mp4');
    };

    reader.readAsDataURL(coverArtFile);
}

// IndexedDB setup and functions
const dbRequest = indexedDB.open('musicVideoDB', 1);

dbRequest.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
};

dbRequest.onerror = function(event) {
    console.error('Database error:', event.target.errorCode);
};

function saveVideoToIndexedDB(videoBlob, fileName) {
    const db = dbRequest.result;
    const transaction = db.transaction(['videos'], 'readwrite');
    const store = transaction.objectStore('videos');
    const videoData = {
        blob: videoBlob,
        fileName: fileName,
        date: new Date()
    };
    store.add(videoData);
}

function loadSavedVideos() {
    const db = dbRequest.result;
    const transaction = db.transaction(['videos'], 'readonly');
    const store = transaction.objectStore('videos');
    const request = store.getAll();

    request.onsuccess = function(event) {
        const savedVideos = event.target.result;
        const savedVideosContainer = document.getElementById('savedVideos');
        savedVideosContainer.innerHTML = '<h2>Saved Videos</h2>';
        savedVideos.forEach(video => {
            const videoUrl = URL.createObjectURL(video.blob);
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.src = videoUrl;
            savedVideosContainer.appendChild(videoElement);
        });
    };

    request.onerror = function(event) {
        console.error('Error loading videos:', event.target.errorCode);
    };
}

// Function to set distribution status
function setDistributionStatus(status) {
    document.getElementById('distributionStatus').innerText = status;
}

// Function to update status based on selected ratio
function updateStatus() {
    const ratio = document.getElementById('ratio').value;
    const statusMessage = ratio === 'soundcloud' || ratio === 'audiomack' || ratio === 'bandlab' || ratio === 'bandcamp' 
        ? 'Audio file selected. Generate and upload to the chosen platform.' 
        : 'Video ratio selected. Generate video and upload to the chosen platform.';
    setDistributionStatus(statusMessage);
}