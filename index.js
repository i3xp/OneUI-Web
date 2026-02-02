// =========================================
// ONEUI WEB LIBRARY v6.1 - CORE
// =========================================

// 1. Reliable Resource Loader
function loadDependencies() {
    // Phosphor Icons (via JSDelivr - More reliable)
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.0.3/src/index.min.js";
        script.onerror = () => console.warn("OneUI: Icons failed to load. Check connection.");
        document.head.appendChild(script);
    }

    // Lenis Smooth Scroll (via JSDelivr)
    if (!document.querySelector('script[src*="lenis"]')) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.29/dist/lenis.min.js";
        script.onload = initLenis;
        script.onerror = () => console.warn("OneUI: Lenis failed to load.");
        document.head.appendChild(script);
    }
}

// 2. Initialize Lenis
function initLenis() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
}

// 3. Navigation Handler (Fixes Refresh Bug)
function initNav() {
    const navItems = document.querySelectorAll('.oui-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent default anchor behavior (refresh/jump)
            e.preventDefault();
            
            // Visual Active State
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Optional: Scroll to section if href is an ID
            const targetId = item.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 4. Ripple Engine
function initRipples() {
    document.addEventListener('mousedown', createRipple);
    document.addEventListener('touchstart', createRipple, { passive: true });

    function createRipple(e) {
        const target = e.target.closest('.oui-btn, .oui-item, .oui-nav-item');
        if (!target || target.disabled) return;

        const circle = document.createElement('span');
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;
        const rect = target.getBoundingClientRect();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${clientX - rect.left - radius}px`;
        circle.style.top = `${clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        
        const existing = target.getElementsByClassName('ripple')[0];
        if (existing) existing.remove();
        
        target.appendChild(circle);
    }
}

// 5. Overlay Manager
export function toggleOverlay(id) {
    const el = document.getElementById(id);
    const backdrop = document.getElementById('oui-backdrop');
    
    if (el.classList.contains('active')) {
        el.classList.remove('active');
        backdrop.classList.remove('active');
    } else {
        document.querySelectorAll('.oui-sheet.active').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        backdrop.classList.add('active');
    }
}

// 6. Theme Toggle
export function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    return next;
}

// 7. Toast
export function showToast(message) {
    let toast = document.getElementById('oui-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'oui-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.className = "show";
    if (toast.timeout) clearTimeout(toast.timeout);
    toast.timeout = setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// 8. Initialization
export function initOneUI() {
    console.log("OneUI v6.1 Initialized 🚀");
    loadDependencies();
    initRipples();
    initNav();
    
    // Create Backdrop
    if (!document.getElementById('oui-backdrop')) {
        const bd = document.createElement('div');
        bd.id = 'oui-backdrop';
        bd.className = 'oui-overlay-backdrop';
        bd.onclick = () => {
            document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        };
        document.body.appendChild(bd);
    }

    // Auto Dark Mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Global Export
window.OneUI = {
    init: initOneUI,
    toggleTheme: toggleTheme,
    showToast: showToast,
    toggleOverlay: toggleOverlay
};
