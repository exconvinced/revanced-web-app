const downloadButton = document.getElementById('download-button');


function hideDownloadButton() {
    downloadButton.classList.add('hidden');
}

function showDownloadButton() {
    downloadButton.classList.remove('hidden');
}

function clickDownloadButton() {
    downloadButton.click();
}


// Listen for click on download button
document.addEventListener('DOMContentLoaded', function () {
    downloadButton.addEventListener('click', () => {
        window.location.href = "/download";
    });
});

export { hideDownloadButton, showDownloadButton, clickDownloadButton };