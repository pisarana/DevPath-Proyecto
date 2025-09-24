// CONFIGURACIÓN API
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'  // Desarrollo
    : 'https://devpath-proyecto.onrender.com';  // Producción
    
document.addEventListener('DOMContentLoaded', function () {
    // LIMPIAR COMPLETAMENTE al cargar login
    sessionStorage.clear();

    // Inicializar usuarios demo como fallback
    initializeDemoUsers();

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Register form  
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
});

function initializeDemoUsers() {
    if (!localStorage.getItem('devpath_users')) {
        const demoUsers = [
            {
                email: 'demo@devpath.com',
                password: '123456',
                nombre: 'Misael Challco'
            }
        ];
        localStorage.setItem('devpath_users', JSON.stringify(demoUsers));
        console.log('Usuarios demo inicializados como fallback');
    }
}

// LOGIN CON BACKEND
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

    // Validar formato de email
    if (!isValidEmail(email)) {
        showError('error-message', 'Por favor ingresa un email válido');
        return;
    }

    try {
        // LLAMAR AL BACKEND
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
            // Login exitoso con backend
            const userData = {
                email: data.email,
                nombre: data.nombre,
                token: data.token,
                loginTime: data.loginTime || new Date().toISOString(),
                source: 'backend'
            };

            sessionStorage.setItem('user_session', JSON.stringify(userData));

            showSuccess('error-message', 'Login exitoso! Redirigiendo...');
            setTimeout(() => {
                window.location.href = 'cuestionario.html';
            }, 1000);
        } else {
            // Error del backend, intentar con localStorage como fallback
            handleLoginFallback(email, password);
        }

    } catch (error) {
        console.error('Error conectando al backend:', error);
        // Fallback a localStorage si no hay conexión
        handleLoginFallback(email, password);
    }
}

// FALLBACK A LOCALSTORAGE
function handleLoginFallback(email, password) {
    console.log('Usando fallback localStorage');

    const users = JSON.parse(localStorage.getItem('devpath_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const userData = {
            email: user.email,
            nombre: user.nombre,
            loginTime: new Date().toISOString(),
            token: 'demo_token_' + Date.now(),
            source: 'localStorage'
        };

        sessionStorage.setItem('user_session', JSON.stringify(userData));

        showSuccess('error-message', 'Login exitoso (modo local)! Redirigiendo...');
        setTimeout(() => {
            window.location.href = 'cuestionario.html';
        }, 1000);
    } else {
        showError('error-message', 'Credenciales incorrectas. Intenta con demo@devpath.com / 123456');
    }
}

// REGISTRO CON BACKEND
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

    try {
        // LLAMAR AL BACKEND
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
            // Registro exitoso
            showSuccess('register-error-message', 'Cuenta creada exitosamente! Redirigiendo...');
            setTimeout(() => {
                showLoginForm();
                // Pre-llenar el email en el login
                document.querySelector('#loginForm input[type="email"]').value = email;
            }, 1500);
        } else {
            showError('register-error-message', data.message || 'Error al registrar usuario');
        }

    } catch (error) {
        console.error('Error conectando al backend:', error);
        // Fallback a localStorage
        handleRegisterFallback(nombre, email, password);
    }
}

// FALLBACK REGISTRO A LOCALSTORAGE
function handleRegisterFallback(nombre, email, password) {
    console.log('Usando fallback localStorage para registro');

    const users = JSON.parse(localStorage.getItem('devpath_users') || '[]');
    if (users.find(u => u.email === email)) {
        showError('register-error-message', 'Ya existe una cuenta con este email');
        return;
    }

    users.push({
        email: email,
        password: password,
        nombre: nombre
    });

    localStorage.setItem('devpath_users', JSON.stringify(users));

    showSuccess('register-error-message', 'Cuenta creada exitosamente (modo local)! Ahora puedes iniciar sesión');
    setTimeout(() => {
        showLoginForm();
        document.querySelector('#loginForm input[type="email"]').value = email;
    }, 1500);
}

// RESTO DE FUNCIONES (sin cambios)
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

    setTimeout(() => {
        hideError(elementId);
    }, 5000);
}

function showSuccess(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#2ecc71';
}

function hideError(elementId) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}
