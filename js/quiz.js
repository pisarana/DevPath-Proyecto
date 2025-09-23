// quiz.js - Lógica del cuestionario
document.addEventListener('DOMContentLoaded', function() {
    // Configurar opciones del cuestionario
    setupQuizOptions();
});

function setupQuizOptions() {
    // Reemplazar los enlaces de las opciones por divs clickeables
    const optionsContainer = document.querySelector('.options');
    if (optionsContainer) {
        optionsContainer.innerHTML = `
            <div class="option" onclick="selectTrack('frontend')">
                <span>HTML, CSS, JavaScript, React</span>
                <span class="option-arrow">→</span>
            </div>
            <div class="option" onclick="selectTrack('backend')">
                <span>Java, Python, bases de datos, APIs</span>
                <span class="option-arrow">→</span>
            </div>
            <div class="option" onclick="selectTrack('fullstack')">
                <span>Un poco de todo</span>
                <span class="option-arrow">→</span>
            </div>
        `;
    }
}

function selectTrack(track) {
    // Guardar la selección del usuario
    sessionStorage.setItem('selected_track', track);
    
    // Mostrar feedback visual
    const selectedOption = event.currentTarget;
    selectedOption.style.background = 'rgba(0, 212, 255, 0.3)';
    selectedOption.style.borderColor = '#00d4ff';
    
    // Redirigir después de un breve delay para mostrar la selección
    setTimeout(() => {
        window.location.href = 'recomendacion.html';
    }, 300);
}
