// =========================================
// ONEUI WEB LIBRARY v3.0 - LOGIC
// =========================================

// 1. Auto-Inject Dependencies
function loadDependencies() {
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@phosphor-icons/web";
        document.head.appendChild(script);
    }
}

// 2. Ripple Effect
function initRipples() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.oui-btn, .oui-list-item');
        if (target && !target.disabled) {
            const circle = document.createElement('span');
            const diameter = Math.max(target.clientWidth, target.clientHeight);
            const radius = diameter / 2;
            const rect = target.getBoundingClientRect();
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');
            
            const existing = target.getElementsByClassName('ripple')[0];
            if (existing) existing.remove();
            
            target.appendChild(circle);
        }
    });
}

// 3. Dialog / Modal Logic
export function toggleDialog(id) {
    const dialog = document.getElementById(id);
    const overlay = document.getElementById('oui-overlay');
    
    if (dialog.classList.contains('active')) {
        dialog.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        dialog.classList.add('active');
        overlay.classList.add('active');
    }
}

// 4. Bottom Nav Logic
export function initNav() {
    const items = document.querySelectorAll('.oui-nav-item');
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            // Optional: Prevent default if you want SPA behavior
            // e.preventDefault(); 
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// 5. Initialization
export function initOneUI() {
    console.log("OneUI v3.0 Initialized 🚀");
    loadDependencies();
    initRipples();
    initNav();
    
    // Create Overlay
    if (!document.getElementById('oui-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'oui-overlay';
        overlay.className = 'oui-overlay';
        overlay.onclick = () => {
            document.querySelectorAll('.oui-dialog.active').forEach(d => d.classList.remove('active'));
            overlay.classList.remove('active');
        };
        document.body.appendChild(overlay);
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
