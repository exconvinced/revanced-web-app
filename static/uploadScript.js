import { loadPackageInfo, resetPackageInfo, loadSelectedPatchesList, resetSelectedPatchesList, loadPatchesCheckbox, resetPatchesCheckbox } from './patchList.js';
import { activateTerminal, deactivateTerminal } from './terminal.js';
import { disablePatchButton, enablePatchButton, resetPatchButton } from './patchButton.js';

document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const uploadText = uploadButton.querySelector('h3');
    var defaultUploadText = uploadText.textContent;
    const fileName = document.getElementById('file-name');
    const fileInput = document.getElementById('file-input');

    
    function resetAll() {
        resetPackageInfo()
        resetSelectedPatchesList()
        resetPatchesCheckbox()
        disablePatchButton()
        deactivateTerminal()
    }

    function uploadFile() {
        const form = new FormData();
        form.append('file', fileInput.files[0]);

        uploadText.textContent = 'Uploading...'
        uploadButton.classList.add('disabled-button');

        fetch('/upload', {
            method: 'POST',
            body: form
        }).then(response => {
            // Handle the response after the file is uploaded
            console.log('File uploaded successfully!');
            if (!response.ok) {
                resetAll()
                uploadText.textContent = 'File not supported!'
                defaultUploadText = uploadText.textContent;
                uploadButton.classList.remove('disabled-button');
                deactivateTerminal()
            }
            else {
                enablePatchButton()
                uploadText.textContent = 'Uploaded!'
                defaultUploadText = uploadText.textContent;
                uploadButton.classList.remove('disabled-button');
                activateTerminal()
                return response.json()
            }
        }).then(data => {
            // Handle the data after the file is uploaded
            loadPackageInfo(data['package_info'])
            loadPatchesCheckbox(data['compatible_patches'])
            loadSelectedPatchesList(data['compatible_patches'])
        }).catch(error => {
            disablePatchButton()
        });

        // Display filename on upload button
        const name = fileInput.files[0].name;
        fileName.textContent = name;
    }

    resetAll()

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadButton.classList.add('dragover');
        uploadText.textContent = 'Drop file'
    });

    document.addEventListener('dragleave', (event) => {
        uploadButton.classList.remove('dragover');
        uploadText.textContent = defaultUploadText
    });

    document.addEventListener('drop', (event) => {
        event.preventDefault();
        fileInput.files = event.dataTransfer.files;
        if (fileInput.files.length) {
            uploadText.textContent = 'Uploaded!';
            uploadFile();
        }
        uploadText.textContent = defaultUploadText;
        resetPatchButton();
    });

    fileInput.addEventListener('change', () => {
        uploadText.textContent = 'Uploaded!';
        defaultUploadText = uploadText.textContent;
        uploadFile();
        resetPatchButton();
    });
});