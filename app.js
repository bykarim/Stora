// ---- Utility Functions ----
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function isLightColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.75;
}

// ---- DOM Elements ----
const grid = document.getElementById('colorGrid');
const searchInput = document.getElementById('searchInput');
const categoryNav = document.getElementById('categoryNav').querySelector('.category-nav-inner');
const toast = document.getElementById('toast');
const viewBtns = document.querySelectorAll('.view-btn');

let currentCategory = 'all';
let currentView = 'grid';

// ---- Build Category Buttons ----
const categories = [...new Set(COLOR_DATA.map(c => c.category))];
categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.dataset.category = cat;
    btn.textContent = cat;
    categoryNav.appendChild(btn);
});

// ---- Render Colors ----
function renderColors() {
    const query = searchInput.value.toLowerCase().trim();
    grid.innerHTML = '';
    grid.className = currentView === 'list' ? 'color-grid list-view' : 'color-grid';

    let filtered = COLOR_DATA;

    if (currentCategory !== 'all') {
        filtered = filtered.filter(c => c.category === currentCategory);
    }

    if (query) {
        filtered = filtered.filter(c => {
            const { r, g, b } = hexToRgb(c.hex);
            const hsl = rgbToHsl(r, g, b);
            const rgbStr = `rgb(${r}, ${g}, ${b})`;
            const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            return (
                c.name.toLowerCase().includes(query) ||
                c.hex.toLowerCase().includes(query) ||
                rgbStr.toLowerCase().includes(query) ||
                hslStr.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query)
            );
        });
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span class="emoji">🔍</span>
                <p>Aucune couleur trouvée pour "<strong>${escapeHtml(searchInput.value)}</strong>"</p>
            </div>`;
        return;
    }

    // Group by category
    const grouped = {};
    filtered.forEach(c => {
        if (!grouped[c.category]) grouped[c.category] = [];
        grouped[c.category].push(c);
    });

    Object.entries(grouped).forEach(([cat, colors]) => {
        // Category header
        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `${cat} <span class="cat-count">${colors.length}</span>`;
        grid.appendChild(header);

        colors.forEach(color => {
            const { r, g, b } = hexToRgb(color.hex);
            const hsl = rgbToHsl(r, g, b);

            const card = document.createElement('div');
            card.className = 'color-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');

            const light = isLightColor(color.hex);

            card.innerHTML = `
                <div class="color-swatch${light ? ' light-color' : ''}" style="background-color: ${color.hex}"></div>
                <div class="color-info">
                    <div class="color-name">${color.name}</div>
                    <div class="color-codes">
                        <div class="color-code"><span class="label">HEX</span> ${color.hex}</div>
                        <div class="color-code"><span class="label">RGB</span> ${r}, ${g}, ${b}</div>
                        <div class="color-code"><span class="label">HSL</span> ${hsl.h}° ${hsl.s}% ${hsl.l}%</div>
                    </div>
                </div>`;

            card.addEventListener('click', () => copyColor(color.hex, color.name));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyColor(color.hex, color.name);
                }
            });

            grid.appendChild(card);
        });
    });
}

// ---- Copy to Clipboard ----
function copyColor(hex, name) {
    navigator.clipboard.writeText(hex).then(() => {
        showToast(`${name} — ${hex} copié !`);
    }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = hex;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(`${name} — ${hex} copié !`);
    });
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 2000);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---- Event Listeners ----
searchInput.addEventListener('input', renderColors);

document.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (btn) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderColors();
    }
});

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        renderColors();
    });
});

// Keyboard shortcut: "/" to focus search
document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        renderColors();
    }
});

// ---- Init ----
renderColors();
