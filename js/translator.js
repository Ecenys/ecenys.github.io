// js/translator.js
document.addEventListener('DOMContentLoaded', function () {
    // Cargar el archivo CSV con las traducciones
    fetch('translations/translations.csv')
        .then(response => response.text())
        .then(data => {
            const translations = parseCSV(data);
            updatePageContent(translations);
            updatePagePlaceHoldersContent(translations);
            updatePageValueContent(translations);
            // Escuchar cambios en el selector de idioma
            const languageSelector = document.getElementById('languageSelector');
            // Vuelve a poner el selector languageSelector del hmtl al primer idioma de la lista cada vez que se recarga la pagina
            languageSelector.value = languageSelector.options[0].value;
            languageSelector.addEventListener('change', function () {
                const selectedLanguage = languageSelector.value;
                updatePageContent(translations, selectedLanguage);
                updatePagePlaceHoldersContent(translations, selectedLanguage);
                updatePageValueContent(translations, selectedLanguage);
            });
        });

    // Función para analizar el contenido del archivo CSV
    function parseCSV(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(';');

        const translations = {};
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(';');
            const key = currentLine[0];
            translations[key] = {};

            for (let j = 1; j < headers.length; j++) {
                const lang = headers[j];
                console.log(headers);
                translations[key][lang] = currentLine[j];
            }
        }

        return translations;
    }

    // Función para actualizar el contenido de la página
    function updatePageContent(translations, language = document.documentElement.lang) {
        document.documentElement.lang = language; // Actualizar el atributo lang en html
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] && translations[key][language]) {
                element.textContent = translations[key][language];
            }
        });
    }

    // Función para actualizar los placeholders de la pagina
    function updatePagePlaceHoldersContent(translations, language = document.documentElement.lang) {
        document.documentElement.lang = language; // Actualizar el atributo lang en html
        const elements = document.querySelectorAll('[data-translate-placeholder]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key] && translations[key][language]) {
                // print placeholder of element
                console.log(element.placeholder);
                element.placeholder = translations[key][language];
            }
        });
    }

    // Función para actualizar los placeholders de la pagina
    function updatePageValueContent(translations, language = document.documentElement.lang) {
        document.documentElement.lang = language; // Actualizar el atributo lang en html
        const elements = document.querySelectorAll('[data-translate-value]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate-value');
            if (translations[key] && translations[key][language]) {
                // print placeholder of element
                console.log(element.placeholder);
                element.value = translations[key][language];
            }
        });
    }

});

