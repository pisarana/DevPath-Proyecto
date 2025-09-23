// session.js - Solo verificar sesión, SIN logout
document.addEventListener('DOMContentLoaded', function() {
    console.log('Verificando sesión...'); 
    
    const session = sessionStorage.getItem('user_session');
    
    if (!session) {
        alert('🔒 Acceso denegado\n\nDebes iniciar sesión para acceder a esta página');
        window.location.replace('index.html');
        return;
    }
    
    try {
        const user = JSON.parse(session);
        console.log('Usuario logueado:', user.nombre); 
        
        // Mostrar bienvenida
        showUserWelcome(user.nombre);
        
    } catch (error) {
        console.error('Error en sesión:', error);
        sessionStorage.clear();
        window.location.replace('index.html');
    }
});

function showUserWelcome(nombre) {
    const headers = ['.header h1', '.roadmap-title h1', '.recommendation-header h1'];
    
    for (const selector of headers) {
        const header = document.querySelector(selector);
        if (header && !header.nextElementSibling?.classList.contains('welcome-message')) {
            header.insertAdjacentHTML('afterend', 
                `<p class="welcome-message" style="color: rgba(255,255,255,0.8); margin-top: 8px; font-size: 16px; text-align: center;">
                    👋 Bienvenido, ${nombre}
                </p>`
            );
            break;
        }
    }
}
