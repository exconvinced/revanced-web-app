document.addEventListener('DOMContentLoaded', function() {
    const patchButton = document.getElementById('patch-button');
    const downloadButton = document.getElementById('download-button');
    const terminal = document.getElementById('terminal');
    const terminalWindow = document.getElementById('terminal-window');
    

    // On click of patch button
    patchButton.addEventListener('click', function() {
        // Disable patch button during patching
        patchButton.disabled = true;
        patchButton.classList.add('disabled-button');
        const patchText = this.innerHTML;
        patchButton.textContent = 'Patching...';

        // Execute Revanced patch via progress route
        const eventSource = new EventSource('/progress');
        terminal.innerHTML = '';
        
        // On message from server, print console output
        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if (data.error) {
                downloadButton.classList.add('hidden');
                eventSource.close();
            }
            terminal.innerHTML += data.data + '<br>';
            terminalWindow.scrollTop = terminalWindow.scrollHeight;
        };

        // On error, close connection reveal download button and restore patch button
        eventSource.onerror = function (event) {
            eventSource.close();
            downloadButton.classList.remove('hidden');
            downloadButton.click();
            patchButton.innerHTML = patchText;
        };
    });
});