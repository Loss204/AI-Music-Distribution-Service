function uploadFiles() {
    const formData = new FormData(document.getElementById('uploadForm'));

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Files uploaded successfully.');
        } else {
            alert('Error: ' + data.message);
        }
    });
}

function saveMetadata() {
    const formData = new FormData(document.getElementById('metadataForm'));

    fetch('save_metadata.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Metadata updated successfully.');
        } else {
            alert('Error: ' + data.message);
        }
    });
}

function authenticateUser() {
    const formData = new FormData(document.getElementById('authForm'));

    fetch('auth.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Login successful.');
        } else {
            alert('Error: ' + data.message);
        }
    });
}
