/**
 * OneUI Web Library v7.0
 * Logic Engine & Smooth Scroll
 */

// 1. Dependency Loader
function loadAssets() {
    // Icons
    if (!document.querySelector('script[src*="phosphor"]')) {
        const s = document.createElement('script');
        s.src = "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/index.min.js";
        document.head.appendChild(s);
    }
    // Lenis (Smooth Scroll)
    if (!document.querySelector('script[src*="lenis"]')) {
        const s = document.createElement('script');
        s.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
        s.onload = startLenis;
        document.head.appendChild(s);
    }
}

function startLenis() {
    if (window.Lenis) {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
}

// 2. Ripple Engine
function initRipples() {
    document.addEventListener('mousedown', (e) => {
        const btn = e.target.closest('.oui-btn, .oui-item, .oui-nav-item');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        ripple.className = 'ripple';
        const old = btn.querySelector('.ripple');
        if (old) old.remove();
        btn.appendChild(ripple);
    });
}

// 3. Library Methods
export function initOneUI() {
    console.log("OneUI v7.0 Initialized 🚀");
    loadAssets();
    initRipples();
    
    // Backdrop setup
    if (!document.getElementById('oui-backdrop')) {
        const bd = document.createElement('div');
        bd.id = 'oui-backdrop';
        bd.className = 'oui-overlay-backdrop';
        bd.onclick = () => OneUI.toggleOverlay('all');
        document.body.appendChild(bd);
    }

    // Default Theme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

export function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

export function toggleOverlay(id) {
    const backdrop = document.getElementById('oui-backdrop');
    if (id === 'all') {
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.toggle('active');
    backdrop.classList.toggle('active');
}

export function showToast(msg) {
    let t = document.getElementById('oui-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'oui-toast';
        document.body.appendChild(t);
    }
    t.innerText = msg;
    t.className = 'show';
    setTimeout(() => t.className = '', 3000);
}

// Global Export
window.OneUI = { init: initOneUI, toggleTheme, toggleOverlay, showToast };
