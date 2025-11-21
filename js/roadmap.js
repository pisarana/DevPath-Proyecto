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

            const response = await fetch(`http://localhost:8080/api/learning/path/${this.currentTrack}`, {
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
                duration: 38,
                compatibility: 95,
                phases: [
                    { phase: 1, title: "Fundamentos Web", description: "HTML, CSS y JavaScript desde cero", duration: 8, skills: ["HTML5", "CSS3", "JavaScript ES6+"], projects: ["Landing page", "Portfolio básico"], resources: ["MDN Web Docs", "freeCodeCamp"] },
                    { phase: 2, title: "React & Ecosystem", description: "Frameworks modernos y herramientas", duration: 10, skills: ["React", "TypeScript", "React Router"], projects: ["Todo App", "Dashboard"], resources: ["React docs", "TypeScript Handbook"] },
                    { phase: 3, title: "Stack Moderno", description: "Next.js, Tailwind y deployment", duration: 8, skills: ["Next.js", "Tailwind", "Vercel"], projects: ["Blog", "E-commerce"], resources: ["Next.js docs", "Tailwind CSS"] },
                    { phase: 4, title: "Performance Expert", description: "Optimización y mejores prácticas", duration: 6, skills: ["Web Vitals", "Accessibility", "SEO"], projects: ["PWA", "Optimized site"], resources: ["Web.dev", "Lighthouse"] },
                    { phase: 5, title: "Portfolio & Career", description: "Construye un portfolio profesional", duration: 6, skills: ["Portfolio", "Interviews", "Open Source"], projects: ["Portfolio site", "GitHub profile"], resources: ["GitHub", "LinkedIn"] }
                ]
            },
            backend: {
                icon: '⚙️',
                title: 'Backend Developer',
                description: 'Arquitecto de sistemas y APIs que impulsan aplicaciones',
                duration: 42,
                compatibility: 90,
                phases: [
                    { phase: 1, title: "Fundamentos Backend", description: "Bases sólidas de programación", duration: 10, skills: ["Java/Python", "OOP", "Algorithms"], projects: ["CLI app", "REST API básica"], resources: ["Java docs", "Python.org"] },
                    { phase: 2, title: "APIs y Databases", description: "Construye APIs robustas", duration: 10, skills: ["Spring Boot", "PostgreSQL", "REST APIs"], projects: ["CRUD API", "Auth system"], resources: ["Spring docs", "PostgreSQL docs"] },
                    { phase: 3, title: "Arquitectura Avanzada", description: "Microservicios y patterns", duration: 8, skills: ["Microservices", "Redis", "Docker"], projects: ["Microservices app", "Caching system"], resources: ["Docker docs", "Redis docs"] },
                    { phase: 4, title: "Escalabilidad", description: "Optimización para alto rendimiento", duration: 8, skills: ["Load balancing", "Performance", "Security"], projects: ["Scalable API", "Security audit"], resources: ["OWASP", "Performance guides"] },
                    { phase: 5, title: "DevOps & Deployment", description: "Deploy y mantener sistemas", duration: 6, skills: ["AWS/Azure", "CI/CD", "Monitoring"], projects: ["Cloud deployment", "CI/CD pipeline"], resources: ["AWS docs", "Jenkins"] }
                ]
            },
            ai_ml: {
                icon: '🤖',
                title: 'AI/ML Engineer',
                description: 'Creador de sistemas inteligentes y algoritmos',
                duration: 48,
                compatibility: 92,
                phases: [
                    { phase: 1, title: "Math & Programming", description: "Fundamentos matemáticos y Python", duration: 12, skills: ["Python", "Linear algebra", "Statistics"], projects: ["Data analysis", "Math solver"], resources: ["Khan Academy", "3Blue1Brown"] },
                    { phase: 2, title: "Machine Learning", description: "Algoritmos y modelos ML", duration: 10, skills: ["Supervised learning", "Scikit-learn", "Feature engineering"], projects: ["Price predictor", "Classification model"], resources: ["Scikit-learn docs", "Kaggle"] },
                    { phase: 3, title: "Deep Learning", description: "Neural networks y frameworks", duration: 10, skills: ["Neural networks", "TensorFlow", "PyTorch"], projects: ["Image classifier", "NLP model"], resources: ["TensorFlow docs", "PyTorch tutorials"] },
                    { phase: 4, title: "Specialized AI", description: "NLP, Computer Vision", duration: 8, skills: ["Natural Language Processing", "Computer Vision", "MLOps"], projects: ["Chatbot", "Object detection"], resources: ["Hugging Face", "OpenCV"] },
                    { phase: 5, title: "AI Engineering", description: "Producción y escalamiento", duration: 8, skills: ["Production ML", "Model monitoring", "Ethical AI"], projects: ["ML pipeline", "Model deployment"], resources: ["MLflow", "AWS SageMaker"] }
                ]
            },
            devops: {
                icon: '🚀',
                title: 'DevOps Engineer',
                description: 'Especialista en automatización e infraestructura cloud',
                duration: 44,
                compatibility: 88,
                phases: [
                    { phase: 1, title: "Linux & Scripting", description: "Fundamentos de sistemas", duration: 8, skills: ["Linux", "Bash", "Git"], projects: ["Automation scripts", "Git workflow"], resources: ["Linux Journey", "Pro Git"] },
                    { phase: 2, title: "Containerization", description: "Docker y Kubernetes", duration: 10, skills: ["Docker", "Kubernetes", "Container Security"], projects: ["Dockerized app", "K8s cluster"], resources: ["Docker docs", "Kubernetes docs"] },
                    { phase: 3, title: "CI/CD & Automation", description: "Pipelines y automatización", duration: 8, skills: ["Jenkins", "Pipeline as Code", "Testing"], projects: ["CI/CD pipeline", "Automated tests"], resources: ["Jenkins docs", "GitLab CI"] },
                    { phase: 4, title: "Cloud & Infrastructure", description: "AWS/Azure e Infrastructure as Code", duration: 10, skills: ["AWS/Azure", "Terraform", "Serverless"], projects: ["Cloud infrastructure", "Serverless app"], resources: ["Terraform docs", "AWS docs"] },
                    { phase: 5, title: "Monitoring & SRE", description: "Site Reliability Engineering", duration: 8, skills: ["Prometheus", "ELK Stack", "Incident Management"], projects: ["Monitoring system", "SRE playbook"], resources: ["Prometheus docs", "Google SRE book"] }
                ]
            },
            cybersecurity: {
                icon: '🛡️',
                title: 'Cybersecurity Specialist',
                description: 'Guardián digital que protege sistemas críticos',
                duration: 42,
                compatibility: 87,
                phases: [
                    { phase: 1, title: "Security Fundamentals", description: "Bases de ciberseguridad", duration: 10, skills: ["Network security", "Cryptography", "Risk assessment"], projects: ["Security audit", "Vulnerability scan"], resources: ["CompTIA Security+", "CISSP"] },
                    { phase: 2, title: "Penetration Testing", description: "Ethical hacking y testing", duration: 10, skills: ["Kali Linux", "Metasploit", "OWASP Top 10"], projects: ["Web app pentest", "Network test"], resources: ["CEH", "OSCP"] },
                    { phase: 3, title: "Security Operations", description: "SOC y respuesta a incidentes", duration: 8, skills: ["SIEM tools", "Incident response", "Digital forensics"], projects: ["SOC playbook", "Incident response plan"], resources: ["GCIH", "Splunk"] },
                    { phase: 4, title: "Advanced Security", description: "Especialización avanzada", duration: 8, skills: ["Cloud security", "Zero trust", "DevSecOps"], projects: ["Cloud security assessment", "Zero trust implementation"], resources: ["CISSP", "Cloud Security Alliance"] },
                    { phase: 5, title: "Security Leadership", description: "Gestión y liderazgo", duration: 6, skills: ["Security governance", "Risk management", "Team leadership"], projects: ["Security strategy", "Risk assessment program"], resources: ["CISM", "Leadership Training"] }
                ]
            },
            qa: {
                icon: '🔍',
                title: 'QA Engineer',
                description: 'Especialista en calidad y testing automatizado',
                duration: 38,
                compatibility: 85,
                phases: [
                    { phase: 1, title: "Testing Fundamentals", description: "Bases de testing y QA", duration: 8, skills: ["Testing principles", "Test cases", "Bug reporting"], projects: ["Test plan", "Bug tracker"], resources: ["ISTQB", "QA courses"] },
                    { phase: 2, title: "Automation Testing", description: "Selenium y frameworks", duration: 10, skills: ["Selenium", "TestNG", "Page Object Model"], projects: ["Automated test suite", "CI integration"], resources: ["Selenium docs", "TestNG"] },
                    { phase: 3, title: "Advanced Testing", description: "Performance, API y security", duration: 8, skills: ["API testing", "Performance", "Security testing"], projects: ["API test framework", "Load testing"], resources: ["Postman", "JMeter"] },
                    { phase: 4, title: "DevOps Testing", description: "Testing en pipeline DevOps", duration: 6, skills: ["Docker testing", "K8s testing", "Infrastructure tests"], projects: ["Container tests", "Pipeline integration"], resources: ["Docker", "Jenkins"] },
                    { phase: 5, title: "QA Leadership", description: "Gestión de calidad y equipos", duration: 6, skills: ["Test strategy", "Team leadership", "Quality metrics"], projects: ["QA strategy", "Team processes"], resources: ["QA management", "Leadership"] }
                ]
            },
            fullstack: {
                icon: '🌟',
                title: 'Full Stack Developer',
                description: 'Desarrollador versátil frontend y backend',
                duration: 44,
                compatibility: 91,
                phases: [
                    { phase: 1, title: "Full Stack Foundations", description: "Fundamentos frontend y backend", duration: 12, skills: ["HTML/CSS/JS", "Node.js", "MongoDB"], projects: ["Full stack app", "CRUD application"], resources: ["freeCodeCamp", "Node.js docs"] },
                    { phase: 2, title: "Modern Stack", description: "Tecnologías modernas", duration: 10, skills: ["TypeScript", "Next.js", "PostgreSQL"], projects: ["TypeScript app", "Next.js project"], resources: ["TypeScript docs", "Next.js docs"] },
                    { phase: 3, title: "Advanced Integration", description: "APIs, testing y deployment", duration: 8, skills: ["API integration", "Testing", "GraphQL"], projects: ["API gateway", "GraphQL server"], resources: ["GraphQL docs", "Testing guides"] },
                    { phase: 4, title: "Production Ready", description: "Aplicaciones listas para producción", duration: 8, skills: ["Performance", "Security", "Scalability"], projects: ["Production app", "Security implementation"], resources: ["Performance guides", "Security best practices"] },
                    { phase: 5, title: "Leadership & Architecture", description: "Liderazgo técnico", duration: 6, skills: ["Technical leadership", "System design", "Mentoring"], projects: ["System architecture", "Team mentoring"], resources: ["System design", "Leadership books"] }
                ]
            }
        };

        const currentTrackData = trackData[this.currentTrack] || trackData.frontend;

        // ✨ GUARDAR EN SESSIONSTORAGE
        const roadmapData = {
            track: {
                key: this.currentTrack,
                title: currentTrackData.title,
                icon: currentTrackData.icon,
                description: currentTrackData.description,
                duration: currentTrackData.duration,
                compatibility: currentTrackData.compatibility
            },
            phases: currentTrackData.phases
        };

        sessionStorage.setItem('roadmap_data', JSON.stringify(roadmapData));
        console.log('💾 Roadmap guardado en sessionStorage:', roadmapData);

        // Actualizar UI
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

document.addEventListener('DOMContentLoaded', function () {
    roadmapManager = new RoadmapManager();

    // Cerrar modal al hacer click fuera
    document.getElementById('phaseDetail')?.addEventListener('click', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
    // Configurar filtros después de un pequeño delay
    setTimeout(() => {
        setupFilters();
        console.log('✅ Filtros configurados');
    }, 1000);
});
// ===================================
// DESCARGAR RUTA EN PDF - VERSIÓN PROFESIONAL
// ===================================

async function downloadRoadmap() {
    console.log('📥 Iniciando descarga del roadmap...');

    // Verificar que html2pdf esté cargado
    if (typeof html2pdf === 'undefined') {
        alert('❌ Error: No se pudo cargar la librería de PDF. Intenta recargar la página.');
        return;
    }

    // Obtener datos de la sesión
    const session = JSON.parse(sessionStorage.getItem('user_session') || '{}');
    const quizResults = JSON.parse(sessionStorage.getItem('quiz_results') || '{}');
    const roadmapData = JSON.parse(sessionStorage.getItem('roadmap_data') || '{}');

    if (!roadmapData.track) {
        alert('❌ No hay datos de ruta para descargar. Completa el cuestionario primero.');
        return;
    }

    // Mostrar loading
    showLoadingPDF();

    try {
        // Crear contenido HTML para el PDF
        const pdfContent = createPDFContent(session, roadmapData);

        // Configuración del PDF
        const opt = {
            margin: [15, 15, 15, 15],
            filename: `DevPath_Ruta_${roadmapData.track.key}_${session.nombre || 'Usuario'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // Generar y descargar PDF
        await html2pdf().set(opt).from(pdfContent).save();

        console.log('✅ PDF descargado exitosamente');

        // Mostrar notificación de éxito
        if (typeof showSuccess === 'function') {
            showSuccess('¡Ruta descargada exitosamente en PDF!');
        } else {
            alert('✅ ¡Ruta descargada exitosamente!');
        }

    } catch (error) {
        console.error('❌ Error al generar PDF:', error);

        if (typeof showError === 'function') {
            showError('Error al generar el PDF. Intenta nuevamente.');
        } else {
            alert('❌ Error al generar el PDF. Intenta nuevamente.');
        }
    } finally {
        hideLoadingPDF();
    }
}

// ===================================
// CREAR CONTENIDO HTML DEL PDF
// ===================================

function createPDFContent(session, roadmapData) {
    const track = roadmapData.track;
    const phases = roadmapData.phases || [];
    const userName = session.nombre || 'Usuario';
    const userEmail = session.email || '';
    const today = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Crear elemento temporal para el PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.style.cssText = `
        width: 210mm;
        padding: 20px;
        background: white;
        font-family: Arial, sans-serif;
        color: #333;
    `;

    pdfContainer.innerHTML = `
        <!-- PORTADA -->
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #667eea;">
            <div style="font-size: 48px; margin-bottom: 10px;">${track.icon}</div>
            <h1 style="color: #667eea; font-size: 32px; margin: 10px 0;">${track.title}</h1>
            <p style="font-size: 18px; color: #666; margin: 10px 0;">Ruta de Aprendizaje Personalizada</p>
            <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 10px;">
                <p style="margin: 5px 0;"><strong>👤 Nombre:</strong> ${userName}</p>
                <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${userEmail}</p>
                <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${today}</p>
                <p style="margin: 5px 0;"><strong>⏱️ Duración:</strong> ${track.duration} semanas</p>
                <p style="margin: 5px 0;"><strong>🎯 Compatibilidad:</strong> ${track.compatibility}%</p>
            </div>
        </div>

        <!-- DESCRIPCIÓN -->
        <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 24px; margin-bottom: 15px;">📖 Descripción</h2>
            <p style="line-height: 1.6; color: #555;">${track.description}</p>
        </div>

        <!-- ESTADÍSTICAS -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;">
            <div style="text-align: center; padding: 15px; background: #e8f4f8; border-radius: 8px;">
                <div style="font-size: 28px; font-weight: bold; color: #667eea;">${phases.length}</div>
                <div style="font-size: 14px; color: #666;">Fases</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #e8f4f8; border-radius: 8px;">
                <div style="font-size: 28px; font-weight: bold; color: #667eea;">${track.duration}</div>
                <div style="font-size: 14px; color: #666;">Semanas</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #e8f4f8; border-radius: 8px;">
                <div style="font-size: 28px; font-weight: bold; color: #667eea;">15+</div>
                <div style="font-size: 14px; color: #666;">Proyectos</div>
            </div>
        </div>

        <!-- FASES DETALLADAS -->
        <div style="margin-top: 40px;">
            <h2 style="color: #667eea; font-size: 24px; margin-bottom: 20px;">🗺️ Roadmap Detallado</h2>
            ${phases.map((phase, index) => `
                <div style="margin-bottom: 30px; page-break-inside: avoid;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px 10px 0 0;">
                        <h3 style="margin: 0; font-size: 20px;">${phase.icon} Fase ${index + 1}: ${phase.title}</h3>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">${phase.duration} | ${phase.difficulty}</p>
                    </div>
                    <div style="border: 2px solid #667eea; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
                        <p style="margin-bottom: 15px; line-height: 1.5;">${phase.description}</p>
                        
                        <div style="margin-bottom: 15px;">
                            <h4 style="color: #667eea; font-size: 16px; margin-bottom: 10px;">🎯 Habilidades:</h4>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${phase.skills.map(skill => `<li style="margin-bottom: 5px;">${skill}</li>`).join('')}
                            </ul>
                        </div>

                        <div style="margin-bottom: 15px;">
                            <h4 style="color: #667eea; font-size: 16px; margin-bottom: 10px;">🚀 Proyectos:</h4>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${phase.projects.map(project => `<li style="margin-bottom: 5px;">${project}</li>`).join('')}
                            </ul>
                        </div>

                        <div>
                            <h4 style="color: #667eea; font-size: 16px; margin-bottom: 10px;">📚 Recursos:</h4>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${phase.resources.map(resource => `<li style="margin-bottom: 5px;">${resource}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- PIE DE PÁGINA -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #667eea; text-align: center;">
            <p style="color: #666; font-size: 14px;">
                🚀 <strong>DevPath</strong> - Tu camino hacia el éxito profesional<br>
                Generado el ${today} | www.devpath.com
            </p>
        </div>
    `;

    return pdfContainer;
}

// ===================================
// LOADING PARA PDF
// ===================================

function showLoadingPDF() {
    let loadingPDF = document.getElementById('loading-pdf-overlay');

    if (!loadingPDF) {
        loadingPDF = document.createElement('div');
        loadingPDF.id = 'loading-pdf-overlay';
        loadingPDF.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        loadingPDF.innerHTML = `
            <div style="
                width: 60px;
                height: 60px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-top-color: #00d4ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <p style="color: white; margin-top: 20px; font-size: 18px; font-weight: 600;">
                📥 Generando PDF...
            </p>
            <p style="color: rgba(255, 255, 255, 0.7); margin-top: 10px; font-size: 14px;">
                Esto puede tardar unos segundos
            </p>
        `;

        document.body.appendChild(loadingPDF);
    } else {
        loadingPDF.style.display = 'flex';
    }
}

function hideLoadingPDF() {
    const loadingPDF = document.getElementById('loading-pdf-overlay');
    if (loadingPDF) {
        loadingPDF.style.display = 'none';
    }
}
// ===================================
// DESCARGAR RUTA - VERSIÓN SIMPLE
// ============// ===================================
// DESCARGAR RUTA - VERSIÓN DINÁMICA PERSONALIZADA
// ===================================

function downloadRoadmap() {
    console.log('📥 Descargando ruta personalizada...');

    // Obtener datos del usuario y resultados del quiz
    const session = JSON.parse(sessionStorage.getItem('user_session') || '{}');
    const quizResults = JSON.parse(sessionStorage.getItem('quiz_results') || '{}');

    const userName = session.nombre || 'Usuario';
    const userEmail = session.email || '';

    // ✨ BUSCAR EL TRACK EN MÚLTIPLES LUGARES
    let track = null;

    // 1. Primero buscar en quiz_results
    if (quizResults.recommendedTrack) {
        track = quizResults.recommendedTrack;
        console.log('✅ Track desde quiz_results:', track);
    }
    // 2. Buscar en quizResults.track
    else if (quizResults.track) {
        track = quizResults.track;
        console.log('✅ Track desde quiz_results.track:', track);
    }
    // 3. Buscar en localStorage
    else if (localStorage.getItem('recommended_track')) {
        track = localStorage.getItem('recommended_track');
        console.log('✅ Track desde localStorage:', track);
    }
    // 4. Buscar en la UI actual
    else {
        const trackTitle = document.getElementById('trackTitle')?.textContent;
        if (trackTitle) {
            // Mapear título a key
            const titleToKey = {
                'Frontend Developer': 'frontend',
                'Backend Developer': 'backend',
                'AI/ML Engineer': 'ai_ml',
                'DevOps Engineer': 'devops',
                'Cybersecurity Specialist': 'cybersecurity',
                'QA Engineer': 'qa',
                'Full Stack Developer': 'fullstack'
            };
            track = titleToKey[trackTitle] || null;
            console.log('✅ Track desde UI:', track);
        }
    }

    // 5. Si aún no hay track, usar frontend por defecto
    if (!track) {
        console.warn('⚠️ No se encontró track, usando frontend por defecto');
        track = 'frontend';
    }

    console.log('🎯 Track final seleccionado:', track);

    const compatibility = quizResults.compatibility || 95;
    const today = new Date().toLocaleDateString('es-ES');

    // ✨ INFORMACIÓN DINÁMICA POR ESPECIALIZACIÓN
    const trackData = {
        frontend: {
            title: 'Frontend Developer',
            icon: '🎨',
            duration: '38 semanas',
            salary: 'S/3,500 - S/7,000',
            demand: 'MUY ALTA',
            description: 'Especialista en crear experiencias de usuario excepcionales con React, TypeScript y frameworks modernos',
            phases: [
                {
                    name: 'Fundamentos Web',
                    weeks: '1-10',
                    skills: ['HTML5 semántico', 'CSS3 y Flexbox/Grid', 'JavaScript ES6+', 'Git y GitHub'],
                    projects: ['Landing page responsive', 'Portfolio personal', 'Blog estático']
                },
                {
                    name: 'React & Ecosystem',
                    weeks: '11-22',
                    skills: ['React Hooks', 'TypeScript', 'React Router', 'Context API', 'Styled Components'],
                    projects: ['Todo App avanzada', 'Dashboard interactivo', 'E-commerce básico']
                },
                {
                    name: 'Stack Moderno',
                    weeks: '23-32',
                    skills: ['Next.js 14', 'Tailwind CSS', 'API REST', 'Autenticación JWT'],
                    projects: ['Blog con Next.js', 'Plataforma SaaS', 'App full-stack']
                },
                {
                    name: 'Profesionalización',
                    weeks: '33-38',
                    skills: ['Testing (Jest/Vitest)', 'Performance optimization', 'SEO técnico', 'Deployment (Vercel/Netlify)'],
                    projects: ['Portfolio profesional', 'PWA completa', 'Proyecto open source']
                }
            ],
            resources: ['freeCodeCamp', 'React docs oficial', 'Frontend Masters', 'MDN Web Docs'],
            jobs: ['Frontend Developer', 'React Developer', 'UI Developer', 'Web Developer']
        },
        backend: {
            title: 'Backend Developer',
            icon: '⚙️',
            duration: '42 semanas',
            salary: 'S/4,000 - S/8,500',
            demand: 'EXTREMADAMENTE ALTA',
            description: 'Arquitecto de sistemas y APIs robustas con Java/Python, Spring Boot y microservicios',
            phases: [
                {
                    name: 'Fundamentos Backend',
                    weeks: '1-12',
                    skills: ['Java/Python', 'POO avanzada', 'Estructuras de datos', 'Algoritmos', 'SQL'],
                    projects: ['CLI app', 'CRUD básico', 'Sistema de login']
                },
                {
                    name: 'APIs & Frameworks',
                    weeks: '13-24',
                    skills: ['Spring Boot', 'REST APIs', 'PostgreSQL', 'JWT Auth', 'Validaciones'],
                    projects: ['API RESTful completa', 'Sistema de autenticación', 'API de pagos']
                },
                {
                    name: 'Arquitectura Avanzada',
                    weeks: '25-34',
                    skills: ['Microservicios', 'Docker', 'Redis cache', 'Message queues', 'Design patterns'],
                    projects: ['Microservices app', 'Sistema de cache', 'Event-driven architecture']
                },
                {
                    name: 'DevOps & Deploy',
                    weeks: '35-42',
                    skills: ['AWS/Azure', 'CI/CD', 'Kubernetes', 'Monitoring', 'Security'],
                    projects: ['Deploy en AWS', 'Pipeline CI/CD', 'Sistema escalable']
                }
            ],
            resources: ['Spring Boot docs', 'Baeldung', 'Java Brains', 'PostgreSQL tutorial'],
            jobs: ['Backend Developer', 'Java Developer', 'API Developer', 'Microservices Engineer']
        },
        ai_ml: {
            title: 'AI/ML Engineer',
            icon: '🤖',
            duration: '48 semanas',
            salary: 'S/5,000 - S/12,000',
            demand: 'EXTREMADAMENTE ALTA',
            description: 'Creador de sistemas inteligentes con Python, TensorFlow, PyTorch y modelos ML avanzados',
            phases: [
                {
                    name: 'Matemáticas & Python',
                    weeks: '1-14',
                    skills: ['Python avanzado', 'NumPy/Pandas', 'Álgebra lineal', 'Estadística', 'Cálculo'],
                    projects: ['Análisis de datos', 'Visualización con Matplotlib', 'Limpieza de datasets']
                },
                {
                    name: 'Machine Learning',
                    weeks: '15-26',
                    skills: ['Scikit-learn', 'Regresión', 'Clasificación', 'Feature engineering', 'Model evaluation'],
                    projects: ['Predictor de precios', 'Clasificador de spam', 'Sistema de recomendación']
                },
                {
                    name: 'Deep Learning',
                    weeks: '27-38',
                    skills: ['TensorFlow', 'PyTorch', 'CNN', 'RNN', 'Transfer learning'],
                    projects: ['Clasificador de imágenes', 'Detector de objetos', 'Modelo NLP']
                },
                {
                    name: 'AI en Producción',
                    weeks: '39-48',
                    skills: ['MLOps', 'Model deployment', 'API ML', 'Model monitoring', 'Ethical AI'],
                    projects: ['API ML en producción', 'Pipeline MLOps', 'Chatbot con LLM']
                }
            ],
            resources: ['Coursera ML', 'Fast.ai', 'Kaggle', 'Papers with Code'],
            jobs: ['ML Engineer', 'Data Scientist', 'AI Engineer', 'Research Engineer']
        },
        devops: {
            title: 'DevOps Engineer',
            icon: '🚀',
            duration: '44 semanas',
            salary: 'S/4,500 - S/10,000',
            demand: 'MUY ALTA',
            description: 'Especialista en automatización, CI/CD, Docker, Kubernetes e infraestructura cloud',
            phases: [
                {
                    name: 'Linux & Scripting',
                    weeks: '1-10',
                    skills: ['Linux admin', 'Bash scripting', 'Git avanzado', 'Networking'],
                    projects: ['Scripts de automatización', 'Server setup', 'Git workflow']
                },
                {
                    name: 'Containers & Orchestration',
                    weeks: '11-22',
                    skills: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm', 'Container security'],
                    projects: ['App Dockerizada', 'K8s cluster', 'Multi-container app']
                },
                {
                    name: 'CI/CD & Automation',
                    weeks: '23-34',
                    skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Terraform', 'Ansible'],
                    projects: ['Pipeline CI/CD', 'Infrastructure as Code', 'Automated testing']
                },
                {
                    name: 'Cloud & Monitoring',
                    weeks: '35-44',
                    skills: ['AWS/Azure', 'Prometheus', 'Grafana', 'ELK Stack', 'SRE practices'],
                    projects: ['Cloud infrastructure', 'Monitoring system', 'Disaster recovery']
                }
            ],
            resources: ['KodeKloud', 'Linux Academy', 'AWS docs', 'Kubernetes docs'],
            jobs: ['DevOps Engineer', 'SRE', 'Cloud Engineer', 'Platform Engineer']
        },
        cybersecurity: {
            title: 'Cybersecurity Specialist',
            icon: '🛡️',
            duration: '42 semanas',
            salary: 'S/5,000 - S/11,000',
            demand: 'MUY ALTA',
            description: 'Guardián digital experto en seguridad de redes, pentesting, SOC y respuesta a incidentes',
            phases: [
                {
                    name: 'Security Fundamentals',
                    weeks: '1-12',
                    skills: ['Network security', 'Cryptography', 'Linux security', 'Risk assessment', 'Security policies'],
                    projects: ['Security audit', 'Network diagram', 'Risk analysis report']
                },
                {
                    name: 'Penetration Testing',
                    weeks: '13-24',
                    skills: ['Kali Linux', 'Metasploit', 'OWASP Top 10', 'Burp Suite', 'Web app testing'],
                    projects: ['Web app pentest', 'Vulnerability assessment', 'Security report']
                },
                {
                    name: 'Security Operations',
                    weeks: '25-34',
                    skills: ['SIEM tools', 'Incident response', 'Digital forensics', 'Threat hunting', 'SOC operations'],
                    projects: ['SOC playbook', 'Incident response plan', 'SIEM dashboard']
                },
                {
                    name: 'Advanced Security',
                    weeks: '35-42',
                    skills: ['Cloud security', 'Zero trust', 'DevSecOps', 'Compliance (ISO 27001)', 'Security architecture'],
                    projects: ['Cloud security assessment', 'Zero trust implementation', 'Security program']
                }
            ],
            resources: ['CompTIA Security+', 'CEH', 'HackTheBox', 'TryHackMe'],
            jobs: ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Security Engineer']
        },
        qa: {
            title: 'QA Engineer',
            icon: '🔍',
            duration: '38 semanas',
            salary: 'S/3,000 - S/6,500',
            demand: 'ALTA',
            description: 'Especialista en calidad, testing automatizado y aseguramiento de calidad',
            phases: [
                {
                    name: 'Testing Fundamentals',
                    weeks: '1-10',
                    skills: ['Testing principles', 'Test cases', 'Bug tracking', 'SDLC', 'Agile testing'],
                    projects: ['Test plan', 'Test cases suite', 'Bug reports']
                },
                {
                    name: 'Automation Testing',
                    weeks: '11-22',
                    skills: ['Selenium', 'TestNG', 'Page Object Model', 'Java/Python', 'CI integration'],
                    projects: ['Automated test suite', 'Framework design', 'CI pipeline']
                },
                {
                    name: 'Advanced Testing',
                    weeks: '23-32',
                    skills: ['API testing (Postman)', 'Performance (JMeter)', 'Security testing', 'Mobile testing'],
                    projects: ['API test framework', 'Load testing', 'Mobile automation']
                },
                {
                    name: 'QA Leadership',
                    weeks: '33-38',
                    skills: ['Test strategy', 'Team management', 'Metrics', 'Process improvement'],
                    projects: ['QA strategy document', 'Team processes', 'Quality dashboard']
                }
            ],
            resources: ['ISTQB', 'Selenium docs', 'Test automation university', 'QA courses'],
            jobs: ['QA Engineer', 'Test Automation Engineer', 'QA Lead', 'SDET']
        },
        fullstack: {
            title: 'Full Stack Developer',
            icon: '🌟',
            duration: '44 semanas',
            salary: 'S/4,000 - S/9,000',
            demand: 'EXTREMADAMENTE ALTA',
            description: 'Desarrollador versátil dominando frontend (React/Next.js) y backend (Node.js/Spring)',
            phases: [
                {
                    name: 'Full Stack Foundations',
                    weeks: '1-14',
                    skills: ['HTML/CSS/JS', 'Node.js', 'Express', 'MongoDB', 'React básico'],
                    projects: ['CRUD full stack', 'Auth system', 'Blog completo']
                },
                {
                    name: 'Modern Stack',
                    weeks: '15-26',
                    skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs'],
                    projects: ['E-commerce', 'Social network', 'Dashboard analytics']
                },
                {
                    name: 'Advanced Integration',
                    weeks: '27-36',
                    skills: ['GraphQL', 'WebSockets', 'Redis', 'Docker', 'Testing E2E'],
                    projects: ['Real-time chat', 'Marketplace', 'SaaS platform']
                },
                {
                    name: 'Production Ready',
                    weeks: '37-44',
                    skills: ['AWS deployment', 'CI/CD', 'Performance', 'Security', 'Scalability'],
                    projects: ['Production app', 'Microservices', 'Enterprise solution']
                }
            ],
            resources: ['Full Stack Open', 'The Odin Project', 'freeCodeCamp', 'Next.js docs'],
            jobs: ['Full Stack Developer', 'Software Engineer', 'Web Developer', 'Technical Lead']
        }
    };

    const data = trackData[track] || trackData.frontend;

    // Crear contenido del archivo
    const content = `
═══════════════════════════════════════════════════════════════
                   DEVPATH - RUTA DE APRENDIZAJE
                    ${data.icon} ${data.title}
═══════════════════════════════════════════════════════════════

📋 INFORMACIÓN DEL ESTUDIANTE
───────────────────────────────────────────────────────────────
👤 Nombre:          ${userName}
📧 Email:           ${userEmail}
📅 Fecha:           ${today}
🎯 Especialidad:    ${data.title}
💯 Compatibilidad:  ${compatibility}%
⏱️  Duración:        ${data.duration}
💰 Salario:         ${data.salary} (Perú)
📈 Demanda:         ${data.demand}

═══════════════════════════════════════════════════════════════
📖 DESCRIPCIÓN DE TU ESPECIALIDAD
═══════════════════════════════════════════════════════════════

${data.description}

═══════════════════════════════════════════════════════════════
🗺️  TU RUTA DE APRENDIZAJE PERSONALIZADA
═══════════════════════════════════════════════════════════════

${data.phases.map((phase, index) => `
📌 FASE ${index + 1}: ${phase.name.toUpperCase()} (Semanas ${phase.weeks})
───────────────────────────────────────────────────────────────
🎯 Habilidades a dominar:
${phase.skills.map(skill => `   • ${skill}`).join('\n')}

🚀 Proyectos a construir:
${phase.projects.map(project => `   • ${project}`).join('\n')}
`).join('\n')}

═══════════════════════════════════════════════════════════════
📚 RECURSOS RECOMENDADOS
═══════════════════════════════════════════════════════════════

${data.resources.map(resource => `✅ ${resource}`).join('\n')}

═══════════════════════════════════════════════════════════════
💼 OPORTUNIDADES LABORALES
═══════════════════════════════════════════════════════════════

🎯 Posiciones disponibles:
${data.jobs.map(job => `   • ${job}`).join('\n')}

📈 Demanda:      ${data.demand}
💰 Salario:      ${data.salary}
🌎 Modalidad:    Remoto / Híbrido / Presencial
📍 Ubicación:    Perú y Latinoamérica

═══════════════════════════════════════════════════════════════
🚀 PRÓXIMOS PASOS
═══════════════════════════════════════════════════════════════

1. ✅ Comienza con la Fase 1: ${data.phases[0].name}
2. 📚 Revisa los recursos recomendados
3. 💻 Construye tu primer proyecto: ${data.phases[0].projects[0]}
4. 👥 Únete a comunidades de ${data.title}
5. 📊 Establece metas semanales
6. 🏆 Completa todos los proyectos de cada fase
7. 📱 Mantén tu portfolio actualizado
8. 🤝 Networking y búsqueda de empleo

═══════════════════════════════════════════════════════════════
📞 CONTACTO Y SOPORTE
═══════════════════════════════════════════════════════════════

🌐 Web:      devpath.com
📧 Email:    soporte@devpath.com
💬 Discord:  discord.gg/devpath
📱 WhatsApp: +51 999 999 999

═══════════════════════════════════════════════════════════════
        🚀 Generado por DevPath - ${today}
        Tu camino hacia el éxito como ${data.title}
═══════════════════════════════════════════════════════════════
    `.trim();

    // Crear y descargar archivo
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DevPath_Ruta_${data.title.replace(/\s+/g, '_')}_${userName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅ Ruta de ${data.title} descargada exitosamente`);
    alert(`✅ Ruta de ${data.title} descargada!\n\nRevisa tu carpeta de Descargas.`);
}

console.log('✅ Función de descarga de PDF cargada');
