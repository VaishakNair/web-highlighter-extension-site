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

    // Feature Modal Logic
    const modal = document.getElementById('featureModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.querySelector('.modal-close');
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').innerText;
            const desc = card.querySelector('p').innerText;

            modalImg.src = img;
            modalTitle.innerText = title;
            modalDesc.innerText = desc;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Sticky nav effect removed because navigation bar was replaced with a static logo.
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
