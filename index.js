// index.js

// 1. Auto-Inject Dependencies (Phosphor Icons)
function loadIcons() {
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@phosphor-icons/web";
        document.head.appendChild(script);
        console.log("OneUI: Icons Loaded");
    }
}

// 2. Initialize Library
export function initOneUI() {
    console.log("OneUI Library Initialized 📱");
    loadIcons();
    
    // Auto-detect dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// 3. Theme Toggle
export function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    return next;
}

// 4. Toast Notification
export function showToast(message) {
    let toast = document.getElementById('oneui-toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'oneui-toast';
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.className = "show";
    
    // Clear previous timer if exists to prevent glitching
    if (toast.timeout) clearTimeout(toast.timeout);
    
    toast.timeout = setTimeout(() => { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}
