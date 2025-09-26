// CONFIGURACIÓN API PRODUCCIÓN - SOLO BACKEND
const API_BASE_URL = 'https://devpath-proyecto.onrender.com';

// VARIABLES PARA DATOS DINÁMICOS DESDE BACKEND
let quizData = { questions: [] };
let tracks = {};
let currentQuestion = 0;
let userAnswers = [];
let scores = {};

// INICIALIZACIÓN COMPLETA DESDE BACKEND H2
document.addEventListener('DOMContentLoaded', async function() {
    const session = sessionStorage.getItem('user_session');
    if (!session) {
        alert('Sesión expirada. Redirigiendo al login...');
        window.location.replace('index.html');
        return;
    }

    // VALIDAR QUE LA SESIÓN TENGA TOKEN
    try {
        const parsedSession = JSON.parse(session);
        if (!parsedSession.token) {
            throw new Error('Token JWT no encontrado en la sesión');
        }
        console.log('✅ Sesión válida encontrada:', parsedSession.email);
    } catch (error) {
        console.error('❌ Sesión inválida:', error);
        alert('Sesión inválida. Redirigiendo al login...');
        sessionStorage.clear();
        window.location.replace('index.html');
        return;
    }

    try {
        showLoading();
        
        // Cargar TODO desde backend H2
        await loadDataFromBackend();
        
        // Inicializar cuestionario
        currentQuestion = 0;
        userAnswers = [];
        initializeScores();
        
        displayCurrentQuestion();
        updateProgress();
        hideLoading();
        
        console.log('✅ Quiz inicializado desde backend H2');
    } catch (error) {
        console.error('❌ Error cargando desde backend:', error);
        hideLoading();
        
        // MANEJO ESPECÍFICO DE ERRORES
        if (error.message.includes('401') || error.message.includes('403')) {
            alert('Token expirado. Redirigiendo al login...');
            sessionStorage.clear();
            window.location.replace('index.html');
        } else {
            alert('Error conectando con el servidor. Verifica que Spring Boot esté ejecutándose en puerto 8080.');
        }
    }
});

// CARGAR TODO DESDE BACKEND H2
async function loadDataFromBackend() {
    const session = JSON.parse(sessionStorage.getItem('user_session'));
    
    console.log('🔗 Conectando con backend...', API_BASE_URL);
    
    // HEADERS ESTÁNDAR CON JWT
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
    };
    
    // 1. CARGAR PREGUNTAS
    console.log('📝 Cargando preguntas...');
    const questionsResponse = await fetch(`${API_BASE_URL}/quiz/questions`, {
        method: 'GET',
        headers: headers
    });
    
    if (!questionsResponse.ok) {
        const errorText = await questionsResponse.text();
        throw new Error(`Error cargando preguntas ${questionsResponse.status}: ${errorText}`);
    }
    
    quizData.questions = await questionsResponse.json();
    console.log('✅ Preguntas cargadas:', quizData.questions.length);
    
    // 2. CARGAR TRACKS
    console.log('🎯 Cargando tracks...');
    const tracksResponse = await fetch(`${API_BASE_URL}/quiz/tracks`, {
        method: 'GET',
        headers: headers
    });
    
    if (!tracksResponse.ok) {
        const errorText = await tracksResponse.text();
        throw new Error(`Error cargando tracks ${tracksResponse.status}: ${errorText}`);
    }
    
    const tracksArray = await tracksResponse.json();
    
    // Convertir tracks array a objeto
    tracks = {};
    tracksArray.forEach(track => {
        tracks[track.trackKey] = {
            icon: track.icon,
            title: track.title,
            description: track.description,
            details: track.details,
            technologies: JSON.parse(track.technologiesJson),
            roles: JSON.parse(track.rolesJson),
            compatibility: track.compatibility,
            demand: track.demand,
            salary: track.salary,
            growth: track.growth,
            companies: JSON.parse(track.companiesJson),
            color: track.color
        };
    });
    
    console.log('✅ Tracks cargados:', Object.keys(tracks));
    
    // VALIDAR QUE TENEMOS DATOS
    if (quizData.questions.length === 0) {
        throw new Error('No se encontraron preguntas en el backend');
    }
    
    if (Object.keys(tracks).length === 0) {
        throw new Error('No se encontraron tracks en el backend');
    }
}

// INICIALIZAR SCORES CON TRACKS CARGADOS DESDE BD
function initializeScores() {
    scores = {};
    Object.keys(tracks).forEach(trackKey => {
        scores[trackKey] = 0;
    });
    console.log('📊 Scores inicializados:', scores);
}

// MOSTRAR/OCULTAR LOADING
function showLoading() {
    document.getElementById('questionTitle').textContent = 'Cargando desde Spring Boot + H2...';
    document.getElementById('optionsContainer').innerHTML = '<p style="text-align: center; padding: 20px;">📡 Conectando con backend...</p>';
}

function hideLoading() {
    // Se oculta automáticamente al mostrar primera pregunta
}

// MOSTRAR PREGUNTA ACTUAL
function displayCurrentQuestion() {
    const question = quizData.questions[currentQuestion];
    
    if (!question) {
        console.error('❌ Pregunta no encontrada:', currentQuestion);
        alert('Error: Pregunta no encontrada');
        return;
    }
    
    // Actualizar UI
    document.getElementById('questionCounter').textContent = `Pregunta ${currentQuestion + 1} de ${quizData.questions.length}`;
    document.getElementById('questionIcon').textContent = question.icon;
    document.getElementById('questionTitle').textContent = question.title;
    
    // Generar opciones
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    if (!question.options || question.options.length === 0) {
        console.error('❌ Pregunta sin opciones:', question);
        optionsContainer.innerHTML = '<p style="color: red;">Error: Esta pregunta no tiene opciones disponibles</p>';
        return;
    }
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(index);
        optionDiv.innerHTML = `
            <input type="radio" id="option${index}" name="answer" value="${index}">
            <label for="option${index}">${option.text}</label>
        `;
        optionsContainer.appendChild(optionDiv);
    });
    
    updateNavigationButtons();
}

// RESTO DE FUNCIONES IGUAL QUE ANTES...
function selectOption(index) {
    document.getElementById(`option${index}`).checked = true;
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('.option')[index].classList.add('selected');
}

function updateNavigationButtons() {
    const navigation = document.getElementById('navigationButtons');
    
    const prevButton = currentQuestion > 0 
        ? `<button onclick="previousQuestion()" class="btn btn-secondary">← Anterior</button>`
        : `<a href="#" onclick="confirmLogout()" class="btn btn-secondary">← Volver al Login</a>`;
    
    const nextButton = currentQuestion < quizData.questions.length - 1
        ? `<button onclick="nextQuestion()" class="btn btn-primary">Siguiente →</button>`
        : `<button onclick="finishQuiz()" class="btn btn-success">🎯 Ver Mi Recomendación</button>`;
    
    navigation.innerHTML = `${prevButton}<span></span>${nextButton}`;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        userAnswers.pop();
        recalculateScores();
        displayCurrentQuestion();
        updateProgress();
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert('Por favor selecciona una opción antes de continuar.');
        return;
    }
    
    saveCurrentAnswer(parseInt(selectedOption.value));
    
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        displayCurrentQuestion();
        updateProgress();
    }
}

function saveCurrentAnswer(answerIndex) {
    const question = quizData.questions[currentQuestion];
    const selectedAnswer = question.options[answerIndex];
    
    userAnswers[currentQuestion] = {
        questionId: question.id,
        answerIndex: answerIndex,
        answerText: selectedAnswer.text,
        points: selectedAnswer.points
    };
    
    // Actualizar puntuaciones
    Object.keys(selectedAnswer.points).forEach(track => {
        if (scores.hasOwnProperty(track)) {
            scores[track] += selectedAnswer.points[track];
        }
    });
    
    console.log(`📝 Respuesta guardada para pregunta ${currentQuestion + 1}:`, selectedAnswer.text);
}

function recalculateScores() {
    // Reinicializar scores
    Object.keys(scores).forEach(track => {
        scores[track] = 0;
    });
    
    // Recalcular desde respuestas
    userAnswers.forEach(answer => {
        if (answer && answer.points) {
            Object.keys(answer.points).forEach(track => {
                if (scores.hasOwnProperty(track)) {
                    scores[track] += answer.points[track];
                }
            });
        }
    });
}

// FINALIZAR Y GUARDAR EN H2 - MEJORADO
async function finishQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert('Por favor selecciona una opción antes de finalizar.');
        return;
    }
    
    saveCurrentAnswer(parseInt(selectedOption.value));
    
    // Determinar ganador
    const recommendedTrack = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );
    
    console.log('🏆 Track recomendado:', recommendedTrack, 'con puntuación:', scores[recommendedTrack]);
    
    const result = {
        track: recommendedTrack,
        trackInfo: tracks[recommendedTrack],
        scores: scores,
        answers: userAnswers,
        completedAt: new Date().toISOString()
    };
    
    // MOSTRAR LOADING MIENTRAS GUARDA
    document.getElementById('questionTitle').textContent = 'Guardando resultado...';
    document.getElementById('optionsContainer').innerHTML = '<p style="text-align: center; padding: 20px;">💾 Guardando en base de datos...</p>';
    
    try {
        // GUARDAR EN H2 VÍA SPRING BOOT
        await saveResultToH2(result);
        
        // Solo usar sessionStorage para pasar a siguiente página
        sessionStorage.setItem('quiz_result', JSON.stringify(result));
        
        console.log('✅ Resultado guardado en H2 Database');
        window.location.href = 'recomendacion.html';
        
    } catch (error) {
        console.error('❌ Error guardando resultado:', error);
        
        // MOSTRAR ERROR ESPECÍFICO
        if (error.message.includes('401') || error.message.includes('403')) {
            alert('Sesión expirada. Redirigiendo al login...');
            sessionStorage.clear();
            window.location.replace('index.html');
        } else {
            alert(`Error guardando resultado: ${error.message}`);
            // RESTAURAR UI
            displayCurrentQuestion();
        }
    }
}

// GUARDAR EN H2 VÍA SPRING BOOT - MEJORADO
// GUARDAR EN H2 VÍA SPRING BOOT - ARREGLADO
async function saveResultToH2(result) {
    const session = JSON.parse(sessionStorage.getItem('user_session'));
    
    // VALIDAR SESIÓN
    if (!session) {
        throw new Error('No hay sesión activa - usuario debe estar logueado');
    }
    
    if (!session.token) {
        throw new Error('Token JWT no encontrado en la sesión');
    }
    
    if (!session.email) {
        throw new Error('Email no encontrado en la sesión');
    }
    
    // VERIFICAR QUE EL TOKEN NO ESTÉ VACÍO
    if (session.token.trim().length < 50) { // JWT válido tiene ~150+ chars
        throw new Error('Token JWT parece inválido (muy corto)');
    }
    
    const payload = {
        userId: session.email,
        recommendedTrack: result.track,
        scores: result.scores,
        answers: result.answers,
        completedAt: result.completedAt
    };
    
    console.log('💾 Enviando resultado a backend:', {
        userId: payload.userId,
        track: payload.recommendedTrack,
        scoresCount: Object.keys(payload.scores).length,
        answersCount: payload.answers.length,
        tokenLength: session.token.length  // Para verificar que sea válido
    });
    
    const response = await fetch(`${API_BASE_URL}/quiz/result`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify(payload)
    });
    
    // LOGGING DETALLADO
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        
        // MANEJO ESPECÍFICO DE ERRORES DE AUTH
        if (response.status === 401) {
            throw new Error('Token expirado o inválido - necesitas hacer login nuevamente');
        } else if (response.status === 403) {
            throw new Error('Acceso prohibido - verifica permisos de usuario');
        } else {
            throw new Error(`Backend error ${response.status}: ${errorText}`);
        }
    }
    
    const responseData = await response.json();
    console.log('✅ Respuesta del backend:', responseData);
    
    return responseData;
}


function confirmLogout() {
    if (confirm('¿Volver al login? Se perderá el progreso actual.')) {
        sessionStorage.clear();
        window.location.replace('index.html');
    }
}
