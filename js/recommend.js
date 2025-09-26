// FUNCIONES PARA PÁGINA DE RECOMENDACIÓN
document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    const session = sessionStorage.getItem('user_session');
    if (!session) {
        alert('Sesión expirada. Redirigiendo al login...');
        window.location.replace('index.html');
        return;
    }
    
    // Cargar resultado
    const result = sessionStorage.getItem('quiz_result');
    if (!result) {
        alert('No se encontraron resultados. Redirigiendo al cuestionario...');
        window.location.replace('cuestionario.html');
        return;
    }
    
    displayResult(JSON.parse(result));
});

function displayResult(result) {
    const track = result.trackInfo;
    
    // 🎯 AGREGAR ESTA LÍNEA CRÍTICA:
    localStorage.setItem('recommended_track', result.track);
    console.log('✅ Track guardado en localStorage:', result.track);
    
    // Actualizar elementos principales
    document.getElementById('trackIcon').textContent = track.icon;
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('trackDescription').textContent = track.description;
    
    // Actualizar stats
    document.getElementById('compatibilityValue').textContent = track.compatibility + '%';
    document.getElementById('technologiesCount').textContent = track.technologies.length;
    document.getElementById('demandValue').textContent = track.demand;
    
    // Mostrar detalles adicionales
    const detailsHTML = `
        <h3 style="color: ${track.color}; margin-bottom: 15px;">💡 Sobre Tu Perfil</h3>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">${track.details}</p>
        
        <h3 style="color: ${track.color}; margin: 25px 0 15px 0;">💰 Oportunidades Laborales</h3>
        <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 10px;">
            <strong>Rango Salarial:</strong> ${track.salary}<br>
            <strong>crecimiento del sector:</strong> ${track.growth}<br>
            <strong>Empresas que contratan:</strong> ${track.companies.join(', ')}
        </p>
        
        <h3 style="color: ${track.color}; margin: 25px 0 15px 0;">🛠️ Stack Tecnológico</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
            ${track.technologies.map(tech => `
                <span style="background: ${track.color}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px;">
                    ${tech}
                </span>
            `).join('')}
        </div>
        
        <h3 style="color: ${track.color}; margin: 25px 0 15px 0;">🎯 Roles Típicos</h3>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            ${track.roles.map(role => `
                <div style="margin-bottom: 8px;">• ${role}</div>
            `).join('')}
        </div>
        
        <h3 style="color: ${track.color}; margin: 25px 0 15px 0;">📊 Análisis de Respuestas</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px;">
            ${Object.entries(result.scores).map(([key, value]) => `
                <div style="background: ${key === result.track ? track.color : '#f8f9fa'}; color: ${key === result.track ? 'white' : '#333'}; padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 20px; font-weight: bold;">${value}</div>
                    <div style="text-transform: capitalize; font-size: 12px;">${key.replace('_', ' ')}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('detailedResults').innerHTML = detailsHTML;
}

// 🎯 AGREGAR ESTA FUNCIÓN PARA EL BOTÓN
function goToLearningPath() {
    const recommendedTrack = localStorage.getItem('recommended_track');
    console.log('🗺️ Navegando a ruta con track:', recommendedTrack);
    
    if (recommendedTrack) {
        window.location.href = 'ruta.html';
    } else {
        alert('⚠️ No hay recomendación disponible. Recarga la página.');
        location.reload();
    }
}

// FUNCIONES GLOBALES
function logoutUser() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        sessionStorage.clear();
        localStorage.removeItem('selected_track');
        localStorage.removeItem('recommended_track'); // 🎯 LIMPIAR TRACK RECOMENDADO
        alert('✅ Sesión cerrada correctamente');
        window.location.replace('index.html');
    }
}

function confirmLogout() {
    logoutUser();
}

function navigateProtected(page) {
    const session = sessionStorage.getItem('user_session');
    if (session) {
        window.location.href = page;
    } else {
        alert('Sesión expirada. Redirigiendo al login...');
        window.location.replace('index.html');
    }
}
