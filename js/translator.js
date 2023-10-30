// js/translator.js
document.addEventListener('DOMContentLoaded', function () {
    // Cargar el archivo CSV con las traducciones
    fetch('translations/translations.csv')
        .then(response => response.text())
        .then(data => {
            const translations = parseCSV(data);
            updatePageContent(translations);
            // Escuchar cambios en el selector de idioma
            const languageSelector = document.getElementById('languageSelector');
            languageSelector.addEventListener('change', function () {
                const selectedLanguage = languageSelector.value;
                updatePageContent(translations, selectedLanguage);
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
});

