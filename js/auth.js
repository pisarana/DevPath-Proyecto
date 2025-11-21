// CONFIGURACIÓN API
const API_BASE_URL = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', function () {
    // LIMPIAR COMPLETAMENTE al cargar login
    sessionStorage.clear();

    // Inicializar usuarios demo como fallback
    initializeDemoUsers();

    // ✨ CARGAR CIUDADES
    cargarCiudades();

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Register form  
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
});

// ✨ FUNCIÓN PARA CARGAR CIUDADES
async function cargarCiudades() {
    try {
        const response = await fetch(`${API_BASE_URL}/ciudades`);
        
        if (response.ok) {
            const ciudades = await response.json();
            const selectCiudad = document.getElementById('register-ciudad');
            
            if (selectCiudad) {
                selectCiudad.innerHTML = '<option value="">Seleccione una ciudad</option>';
                
                ciudades.forEach(ciudad => {
                    const option = document.createElement('option');
                    option.value = ciudad.id;
                    option.textContent = `${ciudad.nombre} - ${ciudad.departamento}`;
                    selectCiudad.appendChild(option);
                });
                
                console.log(`✅ ${ciudades.length} ciudades cargadas desde backend`);
            }
        } else {
            console.warn('No se pudieron cargar ciudades desde backend, usando lista local');
            cargarCiudadesLocal();
        }
    } catch (error) {
        console.error('Error conectando con API de ciudades:', error);
        cargarCiudadesLocal();
    }
}

// ✨ FALLBACK - CARGAR CIUDADES LOCALES
function cargarCiudadesLocal() {
    const ciudadesLocales = [
        { id: 1, nombre: 'Lima', departamento: 'Lima' },
        { id: 2, nombre: 'Arequipa', departamento: 'Arequipa' },
        { id: 3, nombre: 'Cusco', departamento: 'Cusco' },
        { id: 4, nombre: 'Trujillo', departamento: 'La Libertad' },
        { id: 5, nombre: 'Chiclayo', departamento: 'Lambayeque' },
        { id: 6, nombre: 'Piura', departamento: 'Piura' },
        { id: 7, nombre: 'Iquitos', departamento: 'Loreto' },
        { id: 8, nombre: 'Huancayo', departamento: 'Junín' }
    ];
    
    const selectCiudad = document.getElementById('register-ciudad');
    if (selectCiudad) {
        selectCiudad.innerHTML = '<option value="">Seleccione una ciudad</option>';
        
        ciudadesLocales.forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad.id;
            option.textContent = `${ciudad.nombre} - ${ciudad.departamento}`;
            selectCiudad.appendChild(option);
        });
        
        console.log('✅ Ciudades locales cargadas como fallback');
    }
}

function initializeDemoUsers() {
    if (!localStorage.getItem('devpath_users')) {
        const demoUsers = [
            {
                email: 'demo@devpath.com',
                password: '123456',
                nombre: 'Misael Challco',
                dni: '12345678',
                ciudadId: 1
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

// ✨ REGISTRO CON BACKEND (ACTUALIZADO CON DNI Y CIUDAD)
async function handleRegister(e) {
    e.preventDefault();

    const form = e.target;
    const nombre = document.getElementById('register-nombre').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const dni = document.getElementById('register-dni').value.trim();
    const ciudadId = document.getElementById('register-ciudad').value;

    hideError('register-error-message');

    // Validaciones básicas
    if (!nombre || !email || !password || !dni || !ciudadId) {
        showError('register-error-message', 'Por favor completa todos los campos');
        return;
    }

    if (!isValidEmail(email)) {
        showError('register-error-message', 'Por favor ingresa un email válido');
        return;
    }

    if (password.length < 6) {
        showError('register-error-message', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // ✨ Validar DNI
    if (!/^[0-9]{8}$/.test(dni)) {
        showError('register-error-message', 'El DNI debe tener exactamente 8 dígitos numéricos');
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
                password: password,
                dni: dni,
                ciudadId: parseInt(ciudadId)
            })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Registro exitoso
            showSuccess('register-error-message', '✅ Cuenta creada exitosamente! Redirigiendo...');
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
        handleRegisterFallback(nombre, email, password, dni, ciudadId);
    }
}

// ✨ FALLBACK REGISTRO A LOCALSTORAGE (ACTUALIZADO CON DNI Y CIUDAD)
function handleRegisterFallback(nombre, email, password, dni, ciudadId) {
    console.log('Usando fallback localStorage para registro');

    const users = JSON.parse(localStorage.getItem('devpath_users') || '[]');
    
    // Validar email duplicado
    if (users.find(u => u.email === email)) {
        showError('register-error-message', 'Ya existe una cuenta con este email');
        return;
    }

    // ✨ Validar DNI duplicado
    if (users.find(u => u.dni === dni)) {
        showError('register-error-message', 'Ya existe una cuenta con este DNI');
        return;
    }

    users.push({
        email: email,
        password: password,
        nombre: nombre,
        dni: dni,
        ciudadId: parseInt(ciudadId)
    });

    localStorage.setItem('devpath_users', JSON.stringify(users));

    showSuccess('register-error-message', '✅ Cuenta creada exitosamente (modo local)! Ahora puedes iniciar sesión');
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
