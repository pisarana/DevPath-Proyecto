// COMPONENTE DE NAVEGACIÓN GLOBAL
// COMPONENTE DE NAVEGACIÓN GLOBAL
function createNavbar() {
    const session = JSON.parse(sessionStorage.getItem('user_session') || '{}');

    if (!session.token) {
        return ''; // No mostrar navbar si no hay sesión
    }

    // Obtener iniciales del nombre
    const nombre = session.nombre || 'Usuario';
    const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const navbarHTML = `
        <nav class="app-navbar">
            <div class="navbar-content">
                <!-- ✨ LOGO CLICABLE -->
                <a href="main.html" class="navbar-brand">
                    <span class="brand-icon">💻</span>
                    <span class="brand-name">DevPath</span>
                </a>
                
                <div class="navbar-user">
                    <span class="user-greeting">Hola, ${nombre.split(' ')[0]}</span>
                    <div class="user-menu">
                        <button class="user-avatar" onclick="toggleUserDropdown()">
                            ${iniciales}
                        </button>
                        <div id="userDropdown" class="user-dropdown">
                            <div class="dropdown-header">
                                <div class="dropdown-avatar">${iniciales}</div>
                                <div class="dropdown-info">
                                    <strong>${nombre}</strong>
                                    <small>${session.email}</small>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a href="perfil.html" class="dropdown-item">
                                <span class="dropdown-icon">👤</span>
                                Mi Perfil
                            </a>
                            <a href="cuestionario.html" class="dropdown-item">
                                <span class="dropdown-icon">📝</span>
                                Cuestionario
                            </a>
                            <div class="dropdown-divider"></div>
                            <button onclick="logoutFromNavbar()" class="dropdown-item dropdown-logout">
                                <span class="dropdown-icon">🚪</span>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;

    return navbarHTML;
}

// Insertar navbar al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar();
    }
});

// Toggle del dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', function (event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');

    if (dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Logout desde navbar
function logoutFromNavbar() {
    confirmLogout(() => {
        sessionStorage.clear();
        showSuccess('Sesión cerrada correctamente');
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 1000);
    });
}
// Agregar al final de navbar.js
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href === currentPage) {
            item.style.background = 'rgba(0, 212, 255, 0.2)';
            item.style.borderLeft = '3px solid #00d4ff';
        }
    });
}

// Llamar después de crear el navbar
document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar();
        highlightCurrentPage();
    }
});
