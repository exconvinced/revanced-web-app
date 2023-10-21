import { enablePatchButton, disablePatchButton } from "./patchButton.js";

const selectedPatches = document.getElementById('selected-patches')
const selectedPatchesCount = document.getElementById('selected-patches-count')
const selectedPatchesList = document.getElementById('selected-patches-list')
const selectedApp = document.getElementById('selected-application');
const patches = document.getElementById('patches');
const uploadButton = document.getElementById('upload-button');
let checkCount = 0;





let included_patches = [];
let excluded_patches = [];
let dataToSend = {
    included_patches: included_patches,
    excluded_patches: excluded_patches
};

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function beginPatch() {
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {})
        .catch(error => {
            console.error('Error:', error);
        });
};


function loadPackageInfo(data) {
    selectedApp.classList.remove('disabled-button')
    selectedApp.innerHTML = ''
    selectedApp.innerHTML += `
        <h3>Selected application</h3>
        <ul class="text-sm">
            <li><b id="package-name">${data['app_label']} (${data['package_name']})</b></li>
            <li>Current: <span>${data['package_version']}</span></li>
            <li>Suggested: <span>${data['recommended_version']}</span></li>
        </ul>
        `
}

function resetPackageInfo() {
    selectedApp.innerHTML = `
        <h3>No application selected</h3>
        <ul class="text-sm">
            <li class="invisible"><b id="package-name">Select an application first</b></li>
            <li class="invisible">Current: <span>0.0.0</span></li>
            <li class="invisible">Suggested: <span>0.0.0</span></li>
        </ul>
        `
    selectedApp.classList.add('disabled-button')
}

function updatePatchesCount() {
    selectedPatchesCount.innerHTML = `Selected patches (${checkCount})`
}

function loadSelectedPatchesList(data) {
    selectedPatchesList.innerHTML = ''
    selectedPatches.classList.remove('disabled-button')
    checkCount = 0
    for (let i = 0; i < data.length; i++) {
        let d = data[i]
        let exclusion = ''
        if (d.excluded) {
            exclusion = 'hidden'
        } else {
            checkCount += 1
        }
        selectedPatchesList.innerHTML += `<li class="${d.token} ${exclusion}">${d.name}</li>`
    }
    updatePatchesCount()
}

function resetSelectedPatchesList() {
    selectedPatchesList.innerHTML = ''
    selectedPatchesCount.innerHTML = 'No patches found'
    selectedPatches.classList.add('disabled-button')
    checkCount = 0
    updatePatchesCount()
}

function updateSelectedPatchesList(element) {
    const label = element.querySelector('.pointer-events-none-label');
    const classList = label.classList;
    const lastClass = classList.item(classList.length - 1);
    const selectedPatch = selectedPatchesList.querySelector(`.${lastClass}`);

    if (selectedPatch.classList.contains('hidden')) {
        selectedPatch.classList.remove('hidden');
    } else {
        selectedPatch.classList.add('hidden');
    }
}

function toggleCheckbox(box) {
    box.checked = !box.checked;

    if (box.checked) {
        checkCount++;
    }
    else {
        checkCount--;
    }
    updatePatchesCount()
};

function loadPatchesCheckbox(data) {
    patches.classList.remove('disabled-button')
    patches.innerHTML = ''

    for (let i = 0; i < data.length; i++) {
        let d = data[i]
        let exclusion = ''
        let excludedMessage = 'Excluded by default'
        if (!d.excluded) {
            exclusion = 'checked'
            excludedMessage = ''
        }

        let description = ''
        if (d.description) {
            description = `<li class='opacity-75'>${d.description}</li>`
        }


        patches.innerHTML += 
            `  
            <button
                class="pointer-events-none-button revanced-button-secondary revanced-rounded p-6 text-left flex justify-between">
                <ul class="text-sm space-y-1 pr-6">
                    <li><b class="pointer-events-none-label ${d.token}">${d.name}</b>
                        <!-- <br><span class='opacity-50'>${d.version}</span> -->
                        <br><span class='opacity-25 text-xs'>${excludedMessage}</span>
                    </li>
                    ${description}
                </ul>
                <input type="checkbox" class="pointer-events-none self-center min-w-10" name="${d.name}" value="${d.name}" ${exclusion}>
            </button>
            `
        }
        
    const checkBoxButtons = patches.querySelectorAll('.pointer-events-none-button')
    checkBoxButtons.forEach(checkBoxButton => {
        let checkbox = checkBoxButton.querySelector('.pointer-events-none');
        if (checkbox.checked) {
            included_patches.push(checkbox.name);
            checkCount++;
            updatePatchesCount();
        } else {
            excluded_patches.push(checkbox.name);
        }

        checkBoxButton.addEventListener('click', function () {
            toggleCheckbox(checkbox);
            updateSelectedPatchesList(this);
            enablePatchButton();

            if (checkbox.checked) {
                included_patches.push(checkbox.name);
                removeItemOnce(excluded_patches, checkbox.name)
            }
            else {
                excluded_patches.push(checkbox.name);
                removeItemOnce(included_patches, checkbox.name)
            }
        });
    })
}

function resetPatchesCheckbox() {
    patches.innerHTML = `  
            <button
                class="pointer-events-none-button revanced-panel revanced-rounded p-6 text-left flex justify-between">
                <ul class="text-sm space-y-1">
                    <li><b>No patches found</b></li>
                    <li class='opacity-75'>Load an application first</li>
                </ul>
            </button>
            `
    patches.classList.add('disabled-button')
}

function enablePanels() {
    patches.classList.remove('disabled-button')
    selectedPatches.classList.remove('disabled-button')
    uploadButton.classList.remove('disabled-button')
    selectedApp.classList.remove('disabled-button')
}
function disablePanels() {
    patches.classList.add('disabled-button')
    selectedPatches.classList.add('disabled-button')
    uploadButton.classList.add('disabled-button')
    selectedApp.classList.add('disabled-button')
}



export { loadPackageInfo, resetPackageInfo, loadSelectedPatchesList, resetSelectedPatchesList, loadPatchesCheckbox, resetPatchesCheckbox, beginPatch, enablePanels, disablePanels }