document.addEventListener('DOMContentLoaded', function () {
    const selectedPatchesCount = document.getElementById('selected-patches-count');
    const selectedPatchesList = document.getElementById('selected-patches-list');
    var checkCount = 0;

    function updatePatchesCount() {
        selectedPatchesCount.innerHTML = checkCount;
    };

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

    function updateSelectedPatchesList(element) {
        label = element.querySelector('.patch-checkbox-label');
        classList = label.classList;
        const lastClass = classList.item(classList.length - 1);
        selectedPatch = selectedPatchesList.querySelector(`.${lastClass}`);

        if (selectedPatch.classList.contains('hidden')) {
            selectedPatch.classList.remove('hidden');
        } else {
            selectedPatch.classList.add('hidden');
        }
    }


    
    const checkboxButtons = document.querySelectorAll('.patch-checkbox-button');
    checkboxButtons.forEach(function (checkboxButton) {
        let checkbox = checkboxButton.querySelector('.patch-checkbox');
        if (checkbox.checked) {
            checkCount++;
            updatePatchesCount();
        }
        
        checkboxButton.addEventListener('click', function () {
            toggleCheckbox(checkbox);
            updateSelectedPatchesList(this);
        });
    });
});