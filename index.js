/**
 * OneUI Web Library v8.0 - Apex Core
 * Fixed Module Resolution Error
 */

// Global Initialization function
window.initOneUI = function() {
    console.log("OneUI v8.0 Apex Initialized 🚀");
    
    // 1. Load Phosphor Icons
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const s = document.createElement('script');
        s.src = "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/index.min.js";
        document.head.appendChild(s);
    }

    // 2. Initialize Lenis (Directly from window)
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
    script.onload = () => {
        const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    };
    document.head.appendChild(script);

    // 3. Ripple & Interaction Engine
    document.addEventListener('mousedown', (e) => {
        const btn = e.target.closest('.oui-btn, .oui-item');
        if (btn) {
            const circle = document.createElement('span');
            circle.style.cssText = `position:absolute; background:rgba(0,0,0,0.1); border-radius:50%; pointer-events:none; transform:scale(0); animation: ripple 0.6s linear;`;
            // Ripple CSS
            if (!document.getElementById('ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.innerHTML = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
                document.head.appendChild(style);
            }
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = `${size}px`;
            circle.style.left = `${e.clientX - rect.left - size/2}px`;
            circle.style.top = `${e.clientY - rect.top - size/2}px`;
            btn.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        }
    });

    // Dark Mode Auto
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};

window.toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
};

window.toggleOverlay = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active');
};
