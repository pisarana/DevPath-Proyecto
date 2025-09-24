// CONFIGURACIÓN API PRODUCCIÓN - SOLO BACKEND
const API_BASE_URL = 'https://devpath-proyecto.onrender.com';

document.addEventListener('DOMContentLoaded', function () {
    // LIMPIAR COMPLETAMENTE al cargar login
    sessionStorage.clear();

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Register form  
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
});

// LOGIN SOLO CON BACKEND
async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    hideError('error-message');

    // Validación básica
    if (!email || !password) {
        showError('error-message', 'Por favor completa todos los campos');
        return;
    }

    if (!isValidEmail(email)) {
        showError('error-message', 'Por favor ingresa un email válido');
        return;
    }

    // Mostrar loading
    showLoading('error-message', 'Iniciando sesión...');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Login exitoso
            const userData = {
                email: data.email,
                nombre: data.nombre,
                token: data.token,
                loginTime: data.loginTime || new Date().toISOString(),
                source: 'backend'
            };

            sessionStorage.setItem('user_session', JSON.stringify(userData));
            showSuccess('error-message', '✅ Login exitoso! Redirigiendo...');
            
            setTimeout(() => {
                window.location.href = 'cuestionario.html';
            }, 1000);
        } else {
            // Error específico del backend
            showError('error-message', data.message || 'Credenciales incorrectas');
        }

    } catch (error) {
        console.error('Error de conexión:', error);
        showError('error-message', 'Error de conexión. Verifica tu internet e intenta nuevamente.');
    }
}

// REGISTRO SOLO CON BACKEND
async function handleRegister(e) {
    e.preventDefault();

    const form = e.target;
    const nombre = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelectorAll('input[type="password"]')[0].value.trim();
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value.trim();

    hideError('register-error-message');

    // Validaciones
    if (!nombre || !email || !password || !confirmPassword) {
        showError('register-error-message', 'Por favor completa todos los campos');
        return;
    }

    if (!isValidEmail(email)) {
        showError('register-error-message', 'Por favor ingresa un email válido');
        return;
    }

    if (password !== confirmPassword) {
        showError('register-error-message', 'Las contraseñas no coinciden');
        return;
    }

    if (password.length < 6) {
        showError('register-error-message', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Mostrar loading
    showLoading('register-error-message', 'Creando cuenta...');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            showSuccess('register-error-message', '✅ Cuenta creada exitosamente!');
            setTimeout(() => {
                showLoginForm();
                // Pre-llenar el email en el login
                document.querySelector('#loginForm input[type="email"]').value = email;
                showSuccess('error-message', 'Ahora puedes iniciar sesión');
            }, 1500);
        } else {
            showError('register-error-message', data.message || 'Error al crear la cuenta');
        }

    } catch (error) {
        console.error('Error de conexión:', error);
        showError('register-error-message', 'Error de conexión. Verifica tu internet e intenta nuevamente.');
    }
}

// FUNCIONES DE UI
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    hideError('error-message');
    hideError('register-error-message');
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    hideError('error-message');
    hideError('register-error-message');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';

    setTimeout(() => {
        hideError(elementId);
    }, 8000);
}

function showSuccess(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#2ecc71';
    errorDiv.style.backgroundColor = '#e8f5e8';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
}

function showLoading(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#3498db';
    errorDiv.style.backgroundColor = '#e3f2fd';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
}

function hideError(elementId) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}
