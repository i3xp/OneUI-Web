// =========================================
// ONEUI WEB LIBRARY v2.0 - LOGIC
// =========================================

// 1. Auto-Inject Dependencies
function loadDependencies() {
    // Phosphor Icons
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@phosphor-icons/web";
        document.head.appendChild(script);
    }
}

// 2. Ripple Effect Logic
function initRipples() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.oui-btn');
        if (target) {
            const circle = document.createElement('span');
            const diameter = Math.max(target.clientWidth, target.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - target.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - target.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');

            const ripple = target.getElementsByClassName('ripple')[0];
            if (ripple) { ripple.remove(); }

            target.appendChild(circle);
        }
    });
}

// 3. Bottom Sheet Logic
export function toggleSheet(id) {
    const sheet = document.getElementById(id);
    const overlay = document.getElementById('oui-overlay');
    
    if (sheet.classList.contains('active')) {
        sheet.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        sheet.classList.add('active');
        overlay.classList.add('active');
    }
}

// 4. Tab Switching Logic
export function initTabs() {
    const tabs = document.querySelectorAll('.oui-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const parent = tab.parentElement;
            parent.querySelectorAll('.oui-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// 5. Initialization
export function initOneUI() {
    console.log("OneUI v2.0 Initialized 📱");
    loadDependencies();
    initRipples();
    initTabs();
    
    // Create Overlay for sheets if not exists
    if (!document.getElementById('oui-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'oui-overlay';
        overlay.className = 'oui-sheet-overlay';
        overlay.onclick = () => {
            document.querySelectorAll('.oui-sheet.active').forEach(s => s.classList.remove('active'));
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
