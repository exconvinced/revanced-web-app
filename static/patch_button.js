document.addEventListener('DOMContentLoaded', function() {
    const origPanel = document.getElementById('dashboard-panel');
    const altPanel = document.getElementById('patches-panel');

    const patchButtonElement = this.getElementById('patch-button');
    const selectedPatchesElement = this.getElementById('selected-patches');
    
    function relocatePatchButton() {
        let screenWidth = window.innerWidth;
        if (screenWidth <= 1280) {
            altPanel.appendChild(patchButtonElement)
        }
        else {
            origPanel.appendChild(selectedPatchesElement)
            origPanel.appendChild(patchButtonElement)
        }
    }
    relocatePatchButton();

    window.onresize = relocatePatchButton;
});