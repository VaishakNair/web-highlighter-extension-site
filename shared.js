function getStoreConfig() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Edg/")) {
        return { // TODO: Add the actual link to the Edge store
            link: "https://microsoftedge.microsoft.com/addons/detail/placeholder-id",
            name: "Edge",
            footerText: "MS Edge Add-ons"
        };
    }
    return { 
        link: "https://chromewebstore.google.com/detail/epnoggbdldjklccdhojpfdeabblaceph",
        name: "Chrome",
        footerText: "Chrome Web Store"
    };
}

function updateStoreLinks() {
    const config = getStoreConfig();
    
    // Update hero button
    const heroBtn = document.getElementById('hero-install-btn');
    if (heroBtn) {
        heroBtn.href = config.link;
    }

    // Update CTA button
    const ctaBtn = document.getElementById('cta-install-btn');
    if (ctaBtn) {
        ctaBtn.href = config.link;
        ctaBtn.innerText = `Add to ${config.name} — It's Free`;
    }

    // Update footer link
    const footerLink = document.getElementById('footer-store-link');
    if (footerLink) {
        footerLink.href = config.link;
        footerLink.innerText = config.footerText;
    }
}

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
            // Update store link in footer after it's loaded
            updateStoreLinks();
        })
        .catch(err => console.error('Error loading footer:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
    updateStoreLinks();
});
