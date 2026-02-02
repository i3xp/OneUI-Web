/**
 * OneUI Web Library v5.0.0
 * Core Logic & Gesture Engine
 */

const CONFIG = {
    cdnIcons: 'https://unpkg.com/@phosphor-icons/web',
    themeAttr: 'data-theme'
};

/**
 * Dynamic Resource Loader
 */
const loadResources = () => {
    if (!document.querySelector(`script[src="${CONFIG.cdnIcons}"]`)) {
        const script = document.createElement('script');
        script.src = CONFIG.cdnIcons;
        document.head.appendChild(script);
    }
};

/**
 * Ripple Effect Engine
 * Attaches to document to handle all interactive elements dynamically.
 */
const initRippleEngine = () => {
    document.addEventListener('mousedown', triggerRipple);
    document.addEventListener('touchstart', triggerRipple, { passive: true });

    function triggerRipple(e) {
        const target = e.target.closest('.oui-btn, .oui-list-item, .oui-nav-link');
        if (!target || target.disabled) return;

        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'oui-ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x - size/2}px`;
        ripple.style.top = `${y - size/2}px`;

        const existing = target.querySelector('.oui-ripple');
        if (existing) existing.remove();

        target.appendChild(ripple);
    }
};

/**
 * Bottom Sheet Manager with Swipe Physics
 */
class SheetManager {
    constructor() {
        this.overlay = this.createOverlay();
        this.activeSheet = null;
        this.startY = 0;
        this.currentY = 0;
        this.isDragging = false;
    }

    createOverlay() {
        const el = document.createElement('div');
        el.className = 'oui-backdrop';
        el.onclick = () => this.closeAll();
        document.body.appendChild(el);
        return el;
    }

    open(id) {
        const sheet = document.getElementById(id);
        if (!sheet) return;

        this.activeSheet = sheet;
        this.overlay.classList.add('is-visible');
        sheet.classList.add('is-visible');
        
        // Attach Gesture Listeners
        this.attachGestures(sheet);
    }

    closeAll() {
        if (this.activeSheet) {
            this.activeSheet.classList.remove('is-visible');
            this.activeSheet.style.transform = ''; // Reset inline styles
            this.activeSheet = null;
        }
        this.overlay.classList.remove('is-visible');
    }

    attachGestures(sheet) {
        sheet.ontouchstart = (e) => {
            this.startY = e.touches[0].clientY;
            this.isDragging = true;
            sheet.style.transition = 'none'; // Disable spring during drag
        };

        sheet.ontouchmove = (e) => {
            if (!this.isDragging) return;
            const deltaY = e.touches[0].clientY - this.startY;
            
            // Only allow dragging down
            if (deltaY > 0) {
                e.preventDefault();
                sheet.style.transform = `translateY(${deltaY}px)`;
            }
        };

        sheet.ontouchend = (e) => {
            this.isDragging = false;
            sheet.style.transition = ''; // Re-enable spring
            const deltaY = e.changedTouches[0].clientY - this.startY;

            // Threshold to close (100px)
            if (deltaY > 100) {
                this.closeAll();
            } else {
                sheet.style.transform = ''; // Bounce back
            }
        };
    }
}

// Singleton Instance
const sheetManager = new SheetManager();

/**
 * Public API
 */
export const OneUI = {
    init: () => {
        loadResources();
        initRippleEngine();
        
        // Auto Dark Mode
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute(CONFIG.themeAttr, 'dark');
        }
        console.info('OneUI v5.0 Ready');
    },
    
    toggleTheme: () => {
        const root = document.documentElement;
        const isDark = root.getAttribute(CONFIG.themeAttr) === 'dark';
        root.setAttribute(CONFIG.themeAttr, isDark ? 'light' : 'dark');
    },

    openSheet: (id) => sheetManager.open(id),
    closeSheet: () => sheetManager.closeAll()
};
