// index.js

// Function to initialize theme handling
export function initOneUI() {
    console.log("OneUI Library Loaded 🚀");
    
    // Auto-detect dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Function to toggle theme manually
export function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    return next;
}

// A simple toast notification function
export function showToast(message) {
    let toast = document.getElementById('oneui-toast');
    
    // Create toast if it doesn't exist
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'oneui-toast';
        Object.assign(toast.style, {
            position: 'fixed', bottom: '20px', left: '50%',
            transform: 'translateX(-50%)', background: '#333',
            color: '#fff', padding: '12px 24px', borderRadius: '50px',
            opacity: '0', transition: 'opacity 0.3s', zIndex: '9999'
        });
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
