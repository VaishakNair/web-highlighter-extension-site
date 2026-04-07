/**
 * Shared logic for all pages
 */

function loadFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
            // Initialize icons in the footer
            if (window.lucide) {
                lucide.createIcons();
            }
        })
        .catch(err => console.error('Error loading footer:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});
