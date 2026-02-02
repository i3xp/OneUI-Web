// =========================================
// ONEUI WEB LIBRARY v6.0 - LOGIC CORE
// =========================================

// 1. Dynamic Resource Loader (Icons + Lenis)
function loadDependencies() {
    // Phosphor Icons
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@phosphor-icons/web";
        document.head.appendChild(script);
    }

    // Lenis Smooth Scroll
    if (!document.querySelector('script[src*="lenis"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@studio-freight/lenis@1.0.29/dist/lenis.min.js";
        script.onload = initLenis;
        document.head.appendChild(script);
    }
}

// 2. Initialize Lenis
function initLenis() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        console.log("OneUI: Smooth Scroll Enabled 🌊");
    }
}

// 3. Ripple Engine
function initRipples() {
    document.addEventListener('mousedown', createRipple);
    document.addEventListener('touchstart', createRipple, { passive: true });

    function createRipple(e) {
        const target = e.target.closest('.oui-btn, .oui-item, .oui-chip, .oui-nav-item');
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

// 4. Overlay Manager
export function toggleOverlay(id) {
    const el = document.getElementById(id);
    const backdrop = document.getElementById('oui-backdrop');
    
    if (el.classList.contains('active')) {
        el.classList.remove('active');
        backdrop.classList.remove('active');
    } else {
        document.querySelectorAll('.oui-sheet.active, .oui-dialog.active').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        backdrop.classList.add('active');
    }
}

// 5. Tab Logic
export function initTabs() {
    const segments = document.querySelectorAll('.oui-segment-btn');
    segments.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.oui-segments');
            const glider = parent.querySelector('.oui-segment-glider');
            parent.querySelectorAll('.oui-segment-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            glider.style.transform = `translateX(${index * 100}%)`;
        });
    });
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
    console.log("OneUI v6.0 (Silk) Initialized 🚀");
    loadDependencies();
    initRipples();
    initTabs();
    
    if (!document.getElementById('oui-backdrop')) {
        const bd = document.createElement('div');
        bd.id = 'oui-backdrop';
        bd.className = 'oui-overlay-backdrop';
        bd.onclick = () => {
            document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        };
        document.body.appendChild(bd);
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// 9. Global Export (Fixes SyntaxError)
window.OneUI = {
    init: initOneUI,
    toggleTheme: toggleTheme,
    showToast: showToast,
    toggleOverlay: toggleOverlay
};
