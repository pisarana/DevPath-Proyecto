// ===== ROADMAP.JS ADAPTADO A TU DISEÑO =====

class RoadmapManager {
    constructor() {
        this.currentTrack = null;
        this.learningSteps = [];
        this.selectedPhase = null;
        
        this.init();
    }
    
    async init() {
        console.log('🗺️ Inicializando RoadmapManager...');
        
        // Verificar sesión
        const session = JSON.parse(sessionStorage.getItem('user_session'));
        if (!session) {
            alert('⚠️ Sesión expirada. Redirigiendo al login...');
            window.location.replace('index.html');
            return;
        }
        
        // Mostrar loading
        this.showLoading(true);
        
        // Obtener track recomendado (fallback a frontend)
        this.currentTrack = localStorage.getItem('recommended_track') || 'frontend';
        
        await this.loadLearningPath();
    }
    
    showLoading(show) {
        const loading = document.getElementById('loadingSpinner');
        const content = document.getElementById('mainContent');
        const error = document.getElementById('errorState');
        
        if (show) {
            loading.style.display = 'flex';
            content.style.display = 'none';
            error.style.display = 'none';
        } else {
            loading.style.display = 'none';
            content.style.display = 'block';
            error.style.display = 'none';
        }
    }
    
    showError() {
        const loading = document.getElementById('loadingSpinner');
        const content = document.getElementById('mainContent');
        const error = document.getElementById('errorState');
        
        loading.style.display = 'none';
        content.style.display = 'none';
        error.style.display = 'flex';
    }
    
    async loadLearningPath() {
        try {
            console.log(`🔍 Cargando ruta para: ${this.currentTrack}`);
            const response = await fetch(`https://devpath-proyecto.onrender.com/learning/path/${this.currentTrack}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const pathData = await response.json();
            console.log('✅ Ruta de aprendizaje cargada:', pathData);
            
            this.learningSteps = pathData.steps;
            this.updateTrackHeader(pathData.track, pathData.totalDuration);
            this.renderPhases();
            this.setupFilters();
            
            this.showLoading(false);
            
        } catch (error) {
            console.error('❌ Error cargando ruta:', error);
            
            // FALLBACK: Mostrar datos estáticos si falla el backend
            this.showFallbackData();
            this.showLoading(false);
        }
    }
    
    showFallbackData() {
        console.log('🔧 Mostrando fallback para:', this.currentTrack);
        
        // DATOS POR TRACK
        const trackData = {
            frontend: {
                icon: '🎨',
                title: 'Frontend Developer',
                description: 'Especialista en crear experiencias de usuario excepcionales',
                phases: [
                    { phase: 1, title: "Fundamentos Web", description: "HTML, CSS y JavaScript desde cero", duration: 8, skills: ["HTML5", "CSS3", "JavaScript ES6+"] },
                    { phase: 2, title: "React & Ecosystem", description: "Frameworks modernos y herramientas", duration: 10, skills: ["React", "TypeScript", "React Router"] },
                    { phase: 3, title: "Stack Moderno", description: "Next.js, Tailwind y deployment", duration: 8, skills: ["Next.js", "Tailwind", "Vercel"] },
                    { phase: 4, title: "Performance Expert", description: "Optimización y mejores prácticas", duration: 6, skills: ["Web Vitals", "Accessibility", "SEO"] },
                    { phase: 5, title: "Portfolio & Career", description: "Construye un portfolio profesional", duration: 6, skills: ["Portfolio", "Interviews", "Open Source"] }
                ]
            },
            backend: {
                icon: '⚙️',
                title: 'Backend Developer',
                description: 'Arquitecto de sistemas y APIs que impulsan aplicaciones',
                phases: [
                    { phase: 1, title: "Fundamentos Backend", description: "Bases sólidas de programación", duration: 10, skills: ["Java/Python", "OOP", "Algorithms"] },
                    { phase: 2, title: "APIs y Databases", description: "Construye APIs robustas", duration: 10, skills: ["Spring Boot", "PostgreSQL", "REST APIs"] },
                    { phase: 3, title: "Arquitectura Avanzada", description: "Microservicios y patterns", duration: 8, skills: ["Microservices", "Redis", "Docker"] },
                    { phase: 4, title: "Escalabilidad", description: "Optimización para alto rendimiento", duration: 8, skills: ["Load balancing", "Performance", "Security"] },
                    { phase: 5, title: "DevOps & Deployment", description: "Deploy y mantener sistemas", duration: 6, skills: ["AWS/Azure", "CI/CD", "Monitoring"] }
                ]
            },
            devops: {
                icon: '🚀',
                title: 'DevOps Engineer',
                description: 'Especialista en automatización e infraestructura cloud',
                phases: [
                    { phase: 1, title: "Linux & Scripting", description: "Fundamentos de sistemas", duration: 8, skills: ["Linux", "Bash", "Git"] },
                    { phase: 2, title: "Containerization", description: "Docker y Kubernetes", duration: 10, skills: ["Docker", "Kubernetes", "Container Security"] },
                    { phase: 3, title: "CI/CD & Automation", description: "Pipelines y automatización", duration: 8, skills: ["Jenkins", "Pipeline as Code", "Testing"] },
                    { phase: 4, title: "Cloud & Infrastructure", description: "AWS/Azure e Infrastructure as Code", duration: 10, skills: ["AWS/Azure", "Terraform", "Serverless"] },
                    { phase: 5, title: "Monitoring & SRE", description: "Site Reliability Engineering", duration: 8, skills: ["Prometheus", "ELK Stack", "Incident Management"] }
                ]
            },
            qa: {
                icon: '🔍',
                title: 'QA Engineer',
                description: 'Especialista en calidad y testing automatizado',
                phases: [
                    { phase: 1, title: "Testing Fundamentals", description: "Bases de testing y QA", duration: 8, skills: ["Testing principles", "Test cases", "Bug reporting"] },
                    { phase: 2, title: "Automation Testing", description: "Selenium y frameworks", duration: 10, skills: ["Selenium", "TestNG", "Page Object Model"] },
                    { phase: 3, title: "Advanced Testing", description: "Performance, API y security", duration: 8, skills: ["API testing", "Performance", "Security testing"] },
                    { phase: 4, title: "DevOps Testing", description: "Testing en pipeline DevOps", duration: 6, skills: ["Docker testing", "K8s testing", "Infrastructure tests"] },
                    { phase: 5, title: "QA Leadership", description: "Gestión de calidad y equipos", duration: 6, skills: ["Test strategy", "Team leadership", "Quality metrics"] }
                ]
            },
            cybersecurity: {
                icon: '🛡️',
                title: 'Cybersecurity Specialist',
                description: 'Guardián digital que protege sistemas críticos',
                phases: [
                    { phase: 1, title: "Security Fundamentals", description: "Bases de ciberseguridad", duration: 10, skills: ["Network security", "Cryptography", "Risk assessment"] },
                    { phase: 2, title: "Penetration Testing", description: "Ethical hacking y testing", duration: 10, skills: ["Kali Linux", "Metasploit", "OWASP Top 10"] },
                    { phase: 3, title: "Security Operations", description: "SOC y respuesta a incidentes", duration: 8, skills: ["SIEM tools", "Incident response", "Digital forensics"] },
                    { phase: 4, title: "Advanced Security", description: "Especialización avanzada", duration: 8, skills: ["Cloud security", "Zero trust", "DevSecOps"] },
                    { phase: 5, title: "Security Leadership", description: "Gestión y liderazgo", duration: 6, skills: ["Security governance", "Risk management", "Team leadership"] }
                ]
            },
            ai_ml: {
                icon: '🤖',
                title: 'AI/ML Engineer',
                description: 'Creador de sistemas inteligentes y algoritmos',
                phases: [
                    { phase: 1, title: "Math & Programming", description: "Fundamentos matemáticos y Python", duration: 12, skills: ["Python", "Linear algebra", "Statistics"] },
                    { phase: 2, title: "Machine Learning", description: "Algoritmos y modelos ML", duration: 10, skills: ["Supervised learning", "Scikit-learn", "Feature engineering"] },
                    { phase: 3, title: "Deep Learning", description: "Neural networks y frameworks", duration: 10, skills: ["Neural networks", "TensorFlow", "PyTorch"] },
                    { phase: 4, title: "Specialized AI", description: "NLP, Computer Vision", duration: 8, skills: ["Natural Language Processing", "Computer Vision", "MLOps"] },
                    { phase: 5, title: "AI Engineering", description: "Producción y escalamiento", duration: 8, skills: ["Production ML", "Model monitoring", "Ethical AI"] }
                ]
            },
            fullstack: {
                icon: '🌟',
                title: 'Full Stack Developer',
                description: 'Desarrollador versátil frontend y backend',
                phases: [
                    { phase: 1, title: "Full Stack Foundations", description: "Fundamentos frontend y backend", duration: 12, skills: ["HTML/CSS/JS", "Node.js", "MongoDB"] },
                    { phase: 2, title: "Modern Stack", description: "Tecnologías modernas", duration: 10, skills: ["TypeScript", "Next.js", "PostgreSQL"] },
                    { phase: 3, title: "Advanced Integration", description: "APIs, testing y deployment", duration: 8, skills: ["API integration", "Testing", "GraphQL"] },
                    { phase: 4, title: "Production Ready", description: "Aplicaciones listas para producción", duration: 8, skills: ["Performance", "Security", "Scalability"] },
                    { phase: 5, title: "Leadership & Architecture", description: "Liderazgo técnico", duration: 6, skills: ["Technical leadership", "System design", "Mentoring"] }
                ]
            }
        };
        
        const currentTrackData = trackData[this.currentTrack] || trackData.frontend;
        
        document.getElementById('trackIcon').textContent = currentTrackData.icon;
        document.getElementById('trackTitle').textContent = currentTrackData.title;
        document.getElementById('trackDescription').textContent = currentTrackData.description;
        
        const totalDuration = currentTrackData.phases.reduce((sum, phase) => sum + phase.duration, 0);
        document.getElementById('totalDuration').textContent = totalDuration;
        document.getElementById('totalPhases').textContent = currentTrackData.phases.length;
        document.getElementById('totalProjects').textContent = '15+';
        
        // Crear fases específicas del track
        this.createFallbackPhases(currentTrackData.phases);
    }
    
    createFallbackPhases(phases) {
        const phasesGrid = document.getElementById('phasesGrid');
        phasesGrid.innerHTML = '';
        
        phases.forEach(phase => {
            const phaseElement = this.createPhaseElement(phase);
            phasesGrid.appendChild(phaseElement);
        });
    }
    
    
    createFallbackPhases() {
        const phasesGrid = document.getElementById('phasesGrid');
        phasesGrid.innerHTML = '';
        
        const fallbackPhases = [
            {
                phase: 1,
                title: "Fundamentos Web",
                description: "HTML, CSS y JavaScript desde cero",
                duration: 8,
                skills: ["HTML5", "CSS3", "JavaScript ES6+"]
            },
            {
                phase: 2,
                title: "React & Ecosystem",
                description: "Frameworks modernos y herramientas",
                duration: 10,
                skills: ["React", "TypeScript", "React Router"]
            },
            {
                phase: 3,
                title: "Stack Moderno",
                description: "Next.js, Tailwind y deployment",
                duration: 8,
                skills: ["Next.js", "Tailwind", "Vercel"]
            },
            {
                phase: 4,
                title: "Performance Expert",
                description: "Optimización y mejores prácticas",
                duration: 6,
                skills: ["Web Vitals", "Accessibility", "SEO"]
            },
            {
                phase: 5,
                title: "Portfolio & Career",
                description: "Construye un portfolio profesional",
                duration: 6,
                skills: ["Portfolio", "Interviews", "Open Source"]
            }
        ];
        
        fallbackPhases.forEach(phase => {
            const phaseElement = this.createPhaseElement(phase);
            phasesGrid.appendChild(phaseElement);
        });
    }
    
    updateTrackHeader(track, totalDuration) {
        document.getElementById('trackIcon').textContent = track.icon;
        document.getElementById('trackTitle').textContent = track.title;
        document.getElementById('trackDescription').textContent = track.description;
        document.getElementById('totalDuration').textContent = totalDuration;
        document.getElementById('totalPhases').textContent = this.learningSteps.length;
        
        // Contar proyectos
        const totalProjects = this.learningSteps.reduce((sum, step) => {
            return sum + JSON.parse(step.projectsJson).length;
        }, 0);
        document.getElementById('totalProjects').textContent = totalProjects + '+';
        
        // Actualizar descripción de acción
        document.getElementById('actionDescription').textContent = 
            `Sigue esta ruta paso a paso y conviértete en un ${track.title} exitoso. Cada fase te acerca más a tu objetivo profesional.`;
    }
    
    renderPhases() {
        const phasesGrid = document.getElementById('phasesGrid');
        phasesGrid.innerHTML = '';
        
        this.learningSteps.forEach(step => {
            const phaseElement = this.createPhaseElement(step);
            phasesGrid.appendChild(phaseElement);
        });
    }
    
    createPhaseElement(step) {
        const phase = document.createElement('div');
        phase.className = 'phase-card';
        phase.setAttribute('data-phase', step.phase);
        
        const skills = Array.isArray(step.skills) ? step.skills : 
                      (step.skillsJson ? JSON.parse(step.skillsJson) : []);
        const projects = Array.isArray(step.projects) ? step.projects : 
                        (step.projectsJson ? JSON.parse(step.projectsJson) : []);
        
        phase.innerHTML = `
            <div class="phase-header">
                <div class="phase-number">${step.phase}</div>
                <div class="phase-duration">${step.duration} semanas</div>
            </div>
            
            <div class="phase-title">${step.title}</div>
            <div class="phase-description">${step.description}</div>
            
            <div class="phase-stats">
                <div class="phase-stat">
                    🎯 ${skills.length} habilidades
                </div>
                <div class="phase-stat">
                    🚀 ${projects.length} proyectos
                </div>
            </div>
            
            <div class="phase-progress">
                <div class="progress-fill" style="width: ${(step.phase / 5) * 100}%"></div>
            </div>
        `;
        
        phase.addEventListener('click', () => {
            this.selectPhase(step.phase);
        });
        
        return phase;
    }
    
    selectPhase(phaseNumber) {
        const step = this.learningSteps.find(s => s.phase === phaseNumber) ||
                    { phase: phaseNumber, title: `Fase ${phaseNumber}`, description: 'Descripción no disponible' };
        
        this.selectedPhase = step;
        this.showPhaseDetail(step);
        
        // Highlight selected phase
        document.querySelectorAll('.phase-card').forEach(card => {
            card.classList.remove('selected');
        });
        const selectedCard = document.querySelector(`[data-phase="${phaseNumber}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
    }
    
    showPhaseDetail(step) {
        const detailSection = document.getElementById('phaseDetail');
        const skills = step.skillsJson ? JSON.parse(step.skillsJson) : (step.skills || []);
        const resources = step.resourcesJson ? JSON.parse(step.resourcesJson) : [];
        const projects = step.projectsJson ? JSON.parse(step.projectsJson) : (step.projects || []);
        
        document.getElementById('phaseDetailTitle').textContent = `Fase ${step.phase}: ${step.title}`;
        document.getElementById('phaseDetailDescription').textContent = step.description;
        
        // Renderizar listas
        this.renderList('skillsList', skills);
        this.renderList('resourcesList', resources);
        this.renderList('projectsList', projects);
        
        // Mostrar modal
        detailSection.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    renderList(elementId, items) {
        const list = document.getElementById(elementId);
        list.innerHTML = '';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }
    
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                this.filterPhases(filter);
            });
        });
    }
    
    filterPhases(filter) {
        const phaseCards = document.querySelectorAll('.phase-card');
        
        phaseCards.forEach(card => {
            const phase = card.getAttribute('data-phase');
            
            if (filter === 'all' || filter === phase) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.3';
            }
        });
    }
}

// ===== FUNCIONES GLOBALES =====

function closePhaseDetail() {
    const detailSection = document.getElementById('phaseDetail');
    detailSection.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Remove selection
    document.querySelectorAll('.phase-card').forEach(card => {
        card.classList.remove('selected');
    });
}

function startPhase() {
    if (!roadmapManager.selectedPhase) return;
    
    alert(`🚀 ¡Comenzando Fase ${roadmapManager.selectedPhase.phase}: ${roadmapManager.selectedPhase.title}!

Duración: ${roadmapManager.selectedPhase.duration} semanas
    
¡Tu progreso se guardará automáticamente!`);
    
    closePhaseDetail();
}

function startLearningPath() {
    if (!roadmapManager.currentTrack) return;
    
    const trackData = {
        track: roadmapManager.currentTrack,
        startDate: new Date().toISOString(),
        phase: 1
    };
    
    localStorage.setItem('learning_progress', JSON.stringify(trackData));
    
    alert(`🚀 ¡Perfecto! Has comenzado tu journey como ${roadmapManager.currentTrack} Developer.

✅ Tu progreso se está guardando
🎯 Comienza con la Fase 1
📚 Revisa los recursos recomendados
🚀 Construye los proyectos sugeridos

¡El futuro comienza ahora!`);
}

function downloadRoadmap() {
    if (!roadmapManager.currentTrack) {
        alert('⚠️ No hay ruta para descargar');
        return;
    }
    
    alert('📥 ¡Función de descarga próximamente!');
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function logoutUser() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        sessionStorage.clear();
        localStorage.removeItem('recommended_track');
        localStorage.removeItem('learning_progress');
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

// ===== INICIALIZACIÓN =====
let roadmapManager;

document.addEventListener('DOMContentLoaded', function() {
    roadmapManager = new RoadmapManager();
    
    // Cerrar modal al hacer click fuera
    document.getElementById('phaseDetail')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closePhaseDetail();
        }
    });
});
// ===== AGREGAR ESTAS FUNCIONES AL FINAL DE roadmap.js =====

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            console.log('🔍 Filtro seleccionado:', filter);
            
            // SOLO FILTRAR - NO ABRIR MODAL
            filterPhases(filter);
        });
    });
}

function filterPhases(filter) {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        const phase = card.getAttribute('data-phase');
        
        if (filter === 'all' || filter === phase) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            // RESALTAR LA FASE FILTRADA
            if (filter !== 'all') {
                card.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.4)';
                card.style.borderColor = '#00d4ff';
            } else {
                card.style.boxShadow = '';
                card.style.borderColor = '';
            }
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        }
    });
}


function selectPhase(phaseNumber) {
    console.log('🎯 Seleccionando fase:', phaseNumber);
    
    // Buscar la fase en los datos
    let step = null;
    
    if (roadmapManager && roadmapManager.learningSteps) {
        step = roadmapManager.learningSteps.find(s => s.phase === phaseNumber);
    }
    
    // Si no hay datos del backend, crear datos de ejemplo
    if (!step) {
        const examplePhases = {
            1: {
                phase: 1,
                title: "Security Fundamentals",
                description: "Bases de ciberseguridad y redes",
                duration: 10,
                skillsJson: '["Network security", "Cryptography", "Risk assessment", "Security policies", "Incident response"]',
                resourcesJson: '["CompTIA Security+", "CISSP Study Guide", "Security+ Lab Manual", "Cybrary.it courses", "NIST Framework"]',
                projectsJson: '["Security audit", "Vulnerability assessment", "Security policy document", "Risk analysis report"]'
            },
            2: {
                phase: 2,
                title: "Penetration Testing",
                description: "Ethical hacking y testing de seguridad",
                duration: 10,
                skillsJson: '["Kali Linux", "Metasploit", "OWASP Top 10", "Web app testing", "Network penetration"]',
                resourcesJson: '["CEH Certification", "OSCP Training", "PentesterLab", "HackTheBox", "Burp Suite Guide"]',
                projectsJson: '["Web app pentest", "Network security test", "Vulnerability report", "Security dashboard"]'
            },
            3: {
                phase: 3,
                title: "Security Operations",
                description: "SOC y respuesta a incidentes",
                duration: 8,
                skillsJson: '["SIEM tools", "Incident response", "Digital forensics", "Threat hunting", "SOC operations"]',
                resourcesJson: '["GCIH Certification", "Splunk Training", "SANS courses", "Incident Response Guide"]',
                projectsJson: '["SOC playbook", "Incident response plan", "SIEM dashboard", "Forensics analysis"]'
            },
            4: {
                phase: 4,
                title: "Advanced Security",
                description: "Especialización avanzada en seguridad",
                duration: 8,
                skillsJson: '["Cloud security", "Zero trust", "DevSecOps", "Advanced threats", "Security architecture"]',
                resourcesJson: '["CISSP Certification", "Cloud Security Alliance", "DevSecOps Toolkit", "Zero Trust Guide"]',
                projectsJson: '["Cloud security assessment", "Zero trust implementation", "Security automation", "Threat modeling"]'
            },
            5: {
                phase: 5,
                title: "Security Leadership",
                description: "Gestión y liderazgo en seguridad",
                duration: 6,
                skillsJson: '["Security governance", "Risk management", "Team leadership", "Budget planning", "Strategy development"]',
                resourcesJson: '["CISM Certification", "Leadership Training", "Risk Management Framework", "Security Metrics Guide"]',
                projectsJson: '["Security strategy", "Risk assessment program", "Team training plan", "Security budget proposal"]'
            }
        };
        
        step = examplePhases[phaseNumber] || examplePhases[1];
    }
    
    if (roadmapManager) {
        roadmapManager.selectedPhase = step;
        roadmapManager.showPhaseDetail(step);
    } else {
        // Función standalone si no existe roadmapManager
        showPhaseDetailStandalone(step);
    }
    
    // Highlight selected phase
    document.querySelectorAll('.phase-card').forEach(card => {
        card.classList.remove('selected');
    });
    const selectedCard = document.querySelector(`[data-phase="${phaseNumber}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

function showPhaseDetailStandalone(step) {
    const detailSection = document.getElementById('phaseDetail');
    if (!detailSection) return;
    
    const skills = step.skillsJson ? JSON.parse(step.skillsJson) : (step.skills || []);
    const resources = step.resourcesJson ? JSON.parse(step.resourcesJson) : [];
    const projects = step.projectsJson ? JSON.parse(step.projectsJson) : [];
    
    document.getElementById('phaseDetailTitle').textContent = `Fase ${step.phase}: ${step.title}`;
    document.getElementById('phaseDetailDescription').textContent = step.description;
    
    // Renderizar listas
    renderListStandalone('skillsList', skills);
    renderListStandalone('resourcesList', resources);
    renderListStandalone('projectsList', projects);
    
    // Mostrar modal
    detailSection.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function renderListStandalone(elementId, items) {
    const list = document.getElementById(elementId);
    if (!list) return;
    
    list.innerHTML = '';
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

// ===== LLAMAR A SETUP CUANDO CARGUE LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    // Configurar filtros después de un pequeño delay
    setTimeout(() => {
        setupFilters();
        console.log('✅ Filtros configurados');
    }, 1000);
});
