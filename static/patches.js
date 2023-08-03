const checkboxButtons = document.querySelectorAll('.patch-checkbox-button');

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


checkboxButtons.forEach(function (checkboxButton) {
    let checkbox = checkboxButton.querySelector('.patch-checkbox');
    if (checkbox.checked) {
        included_patches.push(checkbox.name);
    }
    else {
        excluded_patches.push(checkbox.name);
    }

    checkboxButton.addEventListener('click', function () {
        if (checkbox.checked) {
            console.log('test')
            included_patches.push(checkbox.name);
            removeItemOnce(excluded_patches, checkbox.name)
        }
        else {
            excluded_patches.push(checkbox.name);
            removeItemOnce(included_patches, checkbox.name)
        }
    });
});

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
        // Handle the response if needed
        return response.text();
    })
    .then(data => {
        // Handle the data received from the Flask app if needed
        // console.log(data);
    })
    .catch(error => {
        // Handle any errors during the request
        console.error('Error:', error);
    });
    };

const patchButton = document.getElementById('patch-button');
patchButton.addEventListener('click', function () {
    beginPatch()
});