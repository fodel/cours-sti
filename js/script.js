document.addEventListener('DOMContentLoaded', function() {
    // --- Gestion du menu hamburger pour mobile ---
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('nav-open');
            // Change l'icône du hamburger en "X" quand ouvert
            navToggle.innerHTML = navList.classList.contains('nav-open') ? '&#10005;' : '&#9776;';
        });
    }

    // --- Affichage de l'année courante dans le footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Fonction pour charger dynamiquement les TPs et TDs ---
    /**
     * Charge des éléments depuis un fichier JSON et les affiche dans une liste.
     * @param {string} jsonUrl - L'URL du fichier JSON à charger.
     * @param {string} listElementId - L'ID de l'élément <ul> à peupler.
     */
 /**
 * Charge des éléments depuis un fichier JSON et les affiche dans une liste.
 * @param {string} jsonUrl - L'URL du fichier JSON à charger.
 * @param {string} listElementId - L'ID de l'élément <ul> à peupler.
 */
async function loadItems(jsonUrl, listElementId) {
    const listElement = document.getElementById(listElementId);
    const loadingMessage = document.querySelector('.loading-message');

    if (!listElement) {
        console.error(`L'élément avec l'ID #${listElementId} n'a pas été trouvé.`);
        return;
    }

    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const items = await response.json();

        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        listElement.innerHTML = '';

        // EXTRAIT LE CHEMIN DE BASE À PARTIR DE L'URL DU JSON
        const basePath = jsonUrl.substring(0, jsonUrl.lastIndexOf('/') + 1);

        items.forEach(item => {
            const li = document.createElement('li');
            
            const titleContainer = document.createElement('div');
            titleContainer.className = 'item-title-container';

            const a = document.createElement('a');
            // CONSTRUIT LE CHEMIN COMPLET ICI
            a.href = basePath + item.file; 
            a.textContent = item.title;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            const description = document.createElement('p');
            description.className = 'item-description';
            description.textContent = item.description;

            titleContainer.appendChild(a);
            li.appendChild(titleContainer);
            li.appendChild(description);
            
            listElement.appendChild(li);
        });

    } catch (error) {
        console.error('Impossible de charger les items:', error);
        if (loadingMessage) {
            loadingMessage.textContent = 'Erreur lors du chargement des ressources.';
        }
    }
}

    // --- Appel de la fonction pour les pages TPs et TDs ---
    // On vérifie si l'élément de liste existe sur la page avant d'appeler la fonction
    if (document.getElementById('tp-list')) {
        loadItems('assets/tps/tps.json', 'tp-list');
    }

    if (document.getElementById('td-list')) {
        loadItems('assets/tds/tds.json', 'td-list');
    }
});