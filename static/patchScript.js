import { patchButton, resetPatchButton, enablePatchButton, disablePatchButton } from "./patchButton.js";
import { hideDownloadButton, showDownloadButton, clickDownloadButton } from "./downloadButton.js";
import { terminal, terminalWindow } from "./terminal.js";
import { beginPatch } from "./patchList.js";
import { enablePanels, disablePanels } from "./patchList.js";

document.addEventListener('DOMContentLoaded', function() {
    patchButton.addEventListener('click', function() {
        beginPatch();
        disablePanels();
        disablePatchButton('Patching...');
        hideDownloadButton();

        const eventSource = new EventSource('/progress');
        terminal.innerHTML = '';
        
        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);

            if (data.error) {
                hideDownloadButton();
                resetPatchButton();
                disablePatchButton('Patch failed!');
                enablePanels();
                eventSource.close();
                data.data = data.error
            }

            terminal.innerHTML += data.data + '<br>';
            terminalWindow.scrollTop = terminalWindow.scrollHeight;
        };

        // On error, close connection reveal download button and restore patch button
        eventSource.onerror = () => {
            eventSource.close();
            resetPatchButton();
            showDownloadButton();
            clickDownloadButton();
            enablePanels();
            console.log("Downloading patched APK...")
        };
    });
});