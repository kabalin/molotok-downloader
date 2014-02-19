window.addEventListener('load', function() {
    if (!localStorage.pathtosave) {
        localStorage.pathtosave = '';
    }

    // Initialise with the current.
    settings.pathtosave.value = localStorage.pathtosave;

    // Update on save.
    settings.save.onclick = function() {
        localStorage.pathtosave = settings.pathtosave.value;
    };
});
