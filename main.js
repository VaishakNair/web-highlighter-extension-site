// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to feature cards and other sections
    const animateElements = document.querySelectorAll('.feature-card, .privacy-callout, .section-title');
    animateElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Simple sticky nav effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.5rem 2rem';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        } else {
            nav.style.padding = '0.75rem 2rem';
            nav.style.background = 'rgba(255, 255, 255, 0.03)';
        }
    });
});

// Add extra styles for reveal animation via JS to keep CSS clean
const style = document.createElement('style');
style.textContent = `
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .reveal-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
