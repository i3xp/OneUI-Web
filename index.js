/**
 * Modernize UI JS Engine
 * Handles Smooth Scrolling, Icons, and Ripples.
 */

(function() {
    console.log("Modernize UI Initialized ✨");

    // 1. Injected Styles for Ripples
    const style = document.createElement('style');
    style.innerHTML = `
        .m-ripple {
            position: absolute; border-radius: 50%;
            background: rgba(128, 128, 128, 0.3);
            transform: scale(0); animation: m-ripple-anim 0.6s linear;
            pointer-events: none;
        }
        @keyframes m-ripple-anim { to { transform: scale(4); opacity: 0; } }
        [data-theme="dark"] .m-ripple { background: rgba(255, 255, 255, 0.2); }
    `;
    document.head.appendChild(style);

    // 2. Load Smooth Scroll (Lenis)
    const lenisScript = document.createElement('script');
    lenisScript.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
    lenisScript.onload = () => {
        const lenis = new Lenis();
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
    };
    document.head.appendChild(lenisScript);

    // 3. Load Icons (Phosphor)
    const iconScript = document.createElement('script');
    iconScript.src = "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/index.min.js";
    document.head.appendChild(iconScript);

    // 4. Global Click Interactions
    document.addEventListener('mousedown', (e) => {
        const target = e.target.closest('button, .card, a');
        if (!target) return;

        // Create Ripple
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'm-ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        target.style.position = 'relative';
        target.style.overflow = 'hidden';
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // 5. Expose Theme Switcher
    window.toggleTheme = () => {
        const root = document.documentElement;
        const current = root.getAttribute('data-theme');
        root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    };
})();
