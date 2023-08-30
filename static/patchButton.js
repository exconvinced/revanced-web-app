const patchButton = document.getElementById('patch-button');
const initialPatchButtonText = patchButton.innerHTML;


function resetPatchButton() {
    patchButton.innerHTML = initialPatchButtonText;
}

function enablePatchButton(text) {
    patchButton.classList.remove('disabled-button');
    patchButton.disabled = false;
    // if text not empty, set text
    if (text) {
        patchButton.textContent = text;
    };
}

function disablePatchButton(text) {
    patchButton.classList.add('disabled-button');
    patchButton.disabled = true;
    // if text not empty, set text
    if (text) {
        patchButton.textContent = text;
    };
}

export { patchButton, resetPatchButton, enablePatchButton, disablePatchButton };


// Let patch button respond to window resize
document.addEventListener('DOMContentLoaded', function() {
    function relocatePatchButton() {
        const origPanel = document.getElementById('dashboard-panel');
        const altPanel = document.getElementById('patches-panel');
        const selectedPatches = document.getElementById('selected-patches');

        const screenWidth = window.innerWidth;

        if (screenWidth <= 1280) {
            altPanel.appendChild(patchButton)
        }

        else {
            origPanel.appendChild(selectedPatches)
            origPanel.appendChild(patchButton)
        }
    }

    relocatePatchButton();
    window.onresize = relocatePatchButton;    
});
