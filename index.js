// =========================================
// ONEUI WEB LIBRARY v4.0 - LOGIC
// =========================================

// 1. Auto-Inject Dependencies
function loadDependencies() {
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@phosphor-icons/web";
        document.head.appendChild(script);
    }
}

// 2. Ripple Engine (Optimized)
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
        
        // Handle touch vs mouse coordinates
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

// 3. Overlay Manager (Dialogs & Sheets)
export function toggleOverlay(id) {
    const el = document.getElementById(id);
    const backdrop = document.getElementById('oui-backdrop');
    
    if (el.classList.contains('active')) {
        el.classList.remove('active');
        backdrop.classList.remove('active');
    } else {
        // Close others first
        document.querySelectorAll('.oui-sheet.active, .oui-dialog.active').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        backdrop.classList.add('active');
    }
}

// 4. Tab/Segment Logic
export function initTabs() {
    const segments = document.querySelectorAll('.oui-segment-btn');
    segments.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.oui-segments');
            const glider = parent.querySelector('.oui-segment-glider');
            
            parent.querySelectorAll('.oui-segment-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Move Glider
            glider.style.transform = `translateX(${index * 100}%)`;
        });
    });
}

// 5. Initialization
export function initOneUI() {
    console.log("OneUI v4.0 (Ultra) Initialized 🚀");
    loadDependencies();
    initRipples();
    initTabs();
    
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
