import { disablePatchButton, enablePatchButton, loadPackageInfo, resetPackageInfo, loadSelectedPatchesList, resetSelectedPatchesList, loadPatchesCheckbox, resetPatchesCheckbox } from './patchlist.js';

document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const uploadText = uploadButton.querySelector('h3');
    const defaultUploadText = uploadText.textContent;
    const fileName = document.getElementById('file-name');
    const fileInput = document.getElementById('file-input');
    
    function resetAll() {
        resetPackageInfo()
        resetSelectedPatchesList()
        resetPatchesCheckbox()
        disablePatchButton()
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
                uploadButton.classList.remove('disabled-button');
            }
            else {
                enablePatchButton()
                uploadText.textContent = 'Uploaded!'
                uploadButton.classList.remove('disabled-button');
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
        uploadText.textContent = 'Uploaded!'
        uploadFile()
    });
    
    fileInput.addEventListener('change', () => {
        uploadText.textContent = 'Uploaded!'
        uploadFile()
    });
});