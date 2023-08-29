document.addEventListener('DOMContentLoaded', function() {
    const patchButton = document.getElementById('patch-button');
    const initialPatchButtonText = patchButton.innerHTML;
    const downloadButton = document.getElementById('download-button');
    const terminal = document.getElementById('terminal');
    const terminalWindow = document.getElementById('terminal-window');
    

    function resetPatchButton() {
        patchButton.innerHTML = initialPatchButtonText
    }
    function enablePatchButton() {
        patchButton.classList.remove('disabled-button');
        patchButton.disabled = false;
    }
    function disablePatchButton() {
        patchButton.classList.add('disabled-button');
        patchButton.disabled = true;
    }
    function hideDownloadButton() {
        downloadButton.classList.add('hidden');
    }
    function showDownloadButton() {
        downloadButton.classList.remove('hidden');
    }


    // On click of patch button
    patchButton.addEventListener('click', function() {
        disablePatchButton();
        patchButton.textContent = 'Patching...';
        hideDownloadButton();

        const eventSource = new EventSource('/progress');
        terminal.innerHTML = '';
        
        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);

            if (data.error) {
                hideDownloadButton();
                resetPatchButton();
                enablePatchButton();
                eventSource.close();
                data.data = data.error
            }

            terminal.innerHTML += data.data + '<br>';
            terminalWindow.scrollTop = terminalWindow.scrollHeight;
        };

        // On error, close connection reveal download button and restore patch button
        eventSource.onerror = () => {
            eventSource.close();
            showDownloadButton();
            resetPatchButton();
            downloadButton.click();
        };
    });
});