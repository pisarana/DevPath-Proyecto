// recommend.js - Generar recomendación dinámica
document.addEventListener('DOMContentLoaded', function() {
    generateRecommendation();
});

function generateRecommendation() {
    const track = sessionStorage.getItem('selected_track') || 'frontend';
    
    const trackData = {
        frontend: {
            title: 'Front-End Developer',
            icon: '🌐',
            description: 'Especialízate en crear interfaces de usuario atractivas y experiencias web interactivas. Tu perfil muestra una clara inclinación hacia el desarrollo visual y la experiencia del usuario, lo que te convierte en un candidato ideal para esta especialización.',
            compatibility: '92%',
            technologies: '8',
            level: 'Óptimo'
        },
        backend: {
            title: 'Back-End Developer',
            icon: '⚙️',
            description: 'Domina la lógica de negocio, bases de datos y APIs. Tu perfil técnico muestra afinidad por los sistemas robustos y la arquitectura de software, ideal para crear la columna vertebral de aplicaciones web.',
            compatibility: '88%',
            technologies: '12',
            level: 'Excelente'
        },
        fullstack: {
            title: 'Full-Stack Developer',
            icon: '🚀',
            description: 'Conviértete en un desarrollador completo dominando tanto frontend como backend. Tu versatilidad te permite trabajar en todos los aspectos del desarrollo web, siendo el perfil más demandado actualmente.',
            compatibility: '85%',
            technologies: '15',
            level: 'Completo'
        }
    };
    
    const data = trackData[track];
    
    // Actualizar contenido dinámicamente
    updateRecommendationContent(data);
}

function updateRecommendationContent(data) {
    // Actualizar icono y título
    const icon = document.querySelector('.specialization-icon');
    const title = document.querySelector('.specialization-title');
    const description = document.querySelector('.specialization-description');
    
    if (icon) icon.textContent = data.icon;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    
    // Actualizar estadísticas
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 3) {
        statValues[0].textContent = data.compatibility;
        statValues[1].textContent = data.technologies;
        statValues[2].textContent = data.level;
    }
}
