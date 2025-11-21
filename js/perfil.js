const API_BASE_URL = 'http://localhost:8080/api';

let currentProfile = null;

// Cargar perfil al iniciar
document.addEventListener('DOMContentLoaded', async function () {
    console.log('🔄 Iniciando carga de perfil...');

    // Verificar sesión
    const session = JSON.parse(sessionStorage.getItem('user_session') || '{}');

    if (!session.token) {
        console.error('❌ No hay token en sessionStorage');
        alert('❌ Debes iniciar sesión');
        window.location.href = 'index.html';
        return;
    }

    console.log('✅ Token encontrado:', session.token.substring(0, 20) + '...');

    await loadProfile();
    await loadCiudades();
});

// Cargar datos del perfil
async function loadProfile() {
    const session = JSON.parse(sessionStorage.getItem('user_session'));

    console.log('📡 Llamando a:', `${API_BASE_URL}/usuarios/perfil`);
    console.log('🔑 Con token:', session.token.substring(0, 20) + '...');

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('📥 Respuesta del servidor:', response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error del servidor:', errorText);
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        currentProfile = await response.json();
        console.log('✅ Perfil cargado:', currentProfile);

        displayProfile(currentProfile);
        loadUserStats(currentProfile); // ✨ AGREGAR ESTA LÍNEA


    } catch (error) {
        console.error('❌ Error completo:', error);
        alert(`❌ Error al cargar perfil: ${error.message}\n\nIntenta iniciar sesión nuevamente.`);

        // Esperar 3 segundos antes de redirigir
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
}

// Mostrar perfil en modo vista
function displayProfile(profile) {
    console.log('🎨 Mostrando perfil:', profile);

    // Avatar con iniciales
    const initials = profile.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('avatar-initials').textContent = initials;

    // Información básica
    document.getElementById('view-nombre').textContent = profile.nombre;
    document.getElementById('view-email').textContent = profile.email;
    document.getElementById('view-email-detail').textContent = profile.email;
    document.getElementById('view-dni').textContent = profile.dni;
    document.getElementById('view-ciudad').textContent = `${profile.ciudadNombre}, ${profile.ciudadDepartamento}`;

    // Fecha de registro
    const fecha = new Date(profile.fechaRegistro);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('view-fecha-registro').textContent = fechaFormateada;
}
// Agregar esta función después de displayProfile()
async function loadUserStats(profile) {
    console.log('📊 Cargando estadísticas...');

    // 1. CALCULAR DÍAS ACTIVO (desde la fecha de registro)
    const fechaRegistro = new Date(profile.fechaRegistro);
    const hoy = new Date();
    const diasActivo = Math.floor((hoy - fechaRegistro) / (1000 * 60 * 60 * 24));

    console.log('📅 Fecha registro:', fechaRegistro);
    console.log('⏱️ Días activo:', diasActivo);

    document.getElementById('stat-days').textContent = diasActivo || '1'; // Mínimo 1 día

    // 2. OBTENER RESULTADOS DEL QUIZ DESDE BACKEND
    const session = JSON.parse(sessionStorage.getItem('user_session'));

    try {
        const response = await fetch(`${API_BASE_URL}/quiz/results/latest`, {
            headers: {
                'Authorization': `Bearer ${session.token}`
            }
        });

        if (response.ok) {
            const quizResult = await response.json();
            console.log('✅ Resultado del quiz:', quizResult);

            // Actualizar estadísticas
            document.getElementById('stat-quiz-count').textContent = '1';
            document.getElementById('stat-track').textContent = formatTrackName(quizResult.recommendedTrack);
            document.getElementById('stat-progress').textContent = '100%';

        } else {
            console.warn('⚠️ No hay resultados del quiz en backend');
            loadStatsFromSessionStorage();
        }

    } catch (error) {
        console.error('❌ Error al cargar estadísticas del quiz:', error);
        loadStatsFromSessionStorage();
    }
}

// FALLBACK: CARGAR DESDE SESSIONSTORAGE
function loadStatsFromSessionStorage() {
    console.log('📦 Cargando desde sessionStorage...');

    // Buscar resultados del quiz en sessionStorage
    const quizResults = sessionStorage.getItem('quiz_results');

    if (quizResults) {
        try {
            const results = JSON.parse(quizResults);
            console.log('✅ Datos del quiz encontrados:', results);

            document.getElementById('stat-quiz-count').textContent = '1';
            document.getElementById('stat-track').textContent = formatTrackName(results.recommendedTrack || results.track);
            document.getElementById('stat-progress').textContent = '100%';

        } catch (e) {
            console.error('❌ Error parseando quiz_results:', e);
            setDefaultStats();
        }
    } else {
        console.warn('⚠️ No hay datos de quiz en sessionStorage');
        setDefaultStats();
    }
}
function setDefaultStats() {
    document.getElementById('stat-quiz-count').textContent = '0';
    document.getElementById('stat-track').textContent = 'Pendiente';
    document.getElementById('stat-progress').textContent = '0%';
}

// FORMATEAR NOMBRES DE TRACKS
function formatTrackName(trackKey) {
    const trackNames = {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'mobile': 'Mobile',
        'ai-ml': 'IA/ML',
        'cybersecurity': 'Cybersecurity',
        'devops': 'DevOps',
        'qa': 'QA'
    };

    return trackNames[trackKey] || trackKey || 'Pendiente';
}
// Cargar ciudades para el combo
async function loadCiudades() {
    try {
        console.log('📡 Cargando ciudades desde:', `${API_BASE_URL}/usuarios/ciudades`);

        const response = await fetch(`${API_BASE_URL}/usuarios/ciudades`);

        if (!response.ok) {
            throw new Error('Error al cargar ciudades');
        }

        const ciudades = await response.json();
        console.log('✅ Ciudades cargadas:', ciudades.length);

        const selectCiudad = document.getElementById('edit-ciudad');
        selectCiudad.innerHTML = '<option value="">Seleccione una ciudad</option>';

        ciudades.forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad.id;
            option.textContent = `${ciudad.nombre} - ${ciudad.departamento}`;
            selectCiudad.appendChild(option);
        });

    } catch (error) {
        console.error('❌ Error cargando ciudades:', error);
    }
}

// Mostrar modo edición
function showEditMode() {
    console.log('✏️ Modo edición activado');

    document.getElementById('profile-view').style.display = 'none';
    document.getElementById('profile-edit').style.display = 'block';

    // Pre-llenar formulario
    document.getElementById('edit-nombre').value = currentProfile.nombre;
    document.getElementById('edit-email').value = currentProfile.email;
    document.getElementById('edit-dni').value = currentProfile.dni;
    document.getElementById('edit-ciudad').value = currentProfile.ciudadId;
    document.getElementById('edit-password').value = '';

    hideMessages();
}

// Cancelar edición
function cancelEdit() {
    console.log('❌ Edición cancelada');
    document.getElementById('profile-view').style.display = 'block';
    document.getElementById('profile-edit').style.display = 'none';
    hideMessages();
}

// Guardar cambios del perfil
document.getElementById('editProfileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('edit-nombre').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const dni = document.getElementById('edit-dni').value.trim();
    const ciudadId = parseInt(document.getElementById('edit-ciudad').value);
    const nuevaPassword = document.getElementById('edit-password').value.trim();

    hideMessages();

    // Validaciones
    if (!nombre || !email || !dni || !ciudadId) {
        showError('Todos los campos son obligatorios (excepto la contraseña)');
        return;
    }

    if (!/^[0-9]{8}$/.test(dni)) {
        showError('El DNI debe tener exactamente 8 dígitos');
        return;
    }

    const session = JSON.parse(sessionStorage.getItem('user_session'));

    try {
        const body = {
            nombre,
            email,
            dni,
            ciudadId
        };

        if (nuevaPassword) {
            if (nuevaPassword.length < 6) {
                showError('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            body.nuevaPassword = nuevaPassword;
        }

        console.log('📤 Enviando actualización:', body);

        const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log('📥 Respuesta:', data);

        if (response.ok) {
            currentProfile = data;

            // Actualizar sessionStorage
            if (session.email !== data.email) {
                session.email = data.email;
                session.nombre = data.nombre;
                sessionStorage.setItem('user_session', JSON.stringify(session));
            }

            showSuccess('✅ Perfil actualizado exitosamente!');

            setTimeout(() => {
                displayProfile(currentProfile);
                cancelEdit();
            }, 2000);

        } else {
            showError(data.message || 'Error al actualizar perfil');
        }

    } catch (error) {
        console.error('❌ Error:', error);
        showError('Error al conectar con el servidor');
    }
});

// Funciones de UI
function showError(message) {
    const errorDiv = document.getElementById('edit-error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => hideMessages(), 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('edit-success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
}

function hideMessages() {
    document.getElementById('edit-error-message').style.display = 'none';
    document.getElementById('edit-success-message').style.display = 'none';
}
