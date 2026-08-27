function detectBrowserName() {
    // 1. Check navigator.userAgentData (Modern Chromium Client Hints)
    if (typeof navigator !== 'undefined' && navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)) {
        const brands = navigator.userAgentData.brands;
        if (brands.some(b => /Microsoft Edge|Edge/i.test(b.brand))) {
            return "Edge";
        }
        if (brands.some(b => /Google Chrome|Chrome/i.test(b.brand))) {
            return "Chrome";
        }
        if (brands.some(b => /Brave/i.test(b.brand))) {
            return "Brave";
        }
        if (brands.some(b => /Opera|OPR/i.test(b.brand))) {
            return "Opera";
        }
    }

    // 2. Check User Agent string
    const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
    
    // Edge (Chromium, Legacy, Mobile)
    if (/Edg(e|A|iOS)?\//i.test(ua)) {
        return "Edge";
    }
    // Opera
    if (/OPR\/|Opera/i.test(ua)) {
        return "Opera";
    }
    // Brave
    if (typeof navigator !== 'undefined' && (navigator.brave || false)) {
        return "Brave";
    }
    // Chrome
    if (/Chrome|CriOS/i.test(ua)) {
        return "Chrome";
    }
    // Firefox
    if (/Firefox|FxiOS/i.test(ua)) {
        return "Firefox";
    }
    // Safari
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
        return "Safari";
    }

    return "browser";
}

function getStoreConfig() {
    const browser = detectBrowserName();
    if (browser === "Edge") {
        return {
            link: "https://microsoftedge.microsoft.com/addons/detail/peakbefikblbppankhklkokpfonkaceo",
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

function applyBrowserBranding() {
    const browser = detectBrowserName();
    const displayName = (browser === "browser") ? "your browser" : browser;
    
    document.querySelectorAll('.browser-name').forEach(el => {
        el.textContent = displayName;
    });

    document.querySelectorAll('.browser-sidepanel-name').forEach(el => {
        el.textContent = displayName;
    });
}

function initShared() {
    loadFooter();
    updateStoreLinks();
    applyBrowserBranding();
}

// Run immediately if DOM is already ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShared);
} else {
    initShared();
}


