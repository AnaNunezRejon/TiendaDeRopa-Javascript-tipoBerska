
document.addEventListener("DOMContentLoaded", function () {

    fetch('https://jsonblob.com/api/jsonBlob/1200770148952039424')
            .then(response => response.json())
            .then(provincias => {
                const selectProvincia = document.getElementById('provincia');

                // Agregar la opción de selección inicial
                const optionPlaceholder = document.createElement('option');
                optionPlaceholder.value = '';
                optionPlaceholder.text = 'Selecciona una provincia';
                optionPlaceholder.disabled = true;
                optionPlaceholder.selected = true;
                selectProvincia.add(optionPlaceholder);

                // Agregar cada provincia al menú desplegable
                provincias.forEach(provincia => {
                    const option = document.createElement('option');
                    option.value = provincia.code;
                    option.text = provincia.label;
                    selectProvincia.add(option);
                });
            })
});