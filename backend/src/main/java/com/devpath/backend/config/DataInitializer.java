package com.devpath.backend.config;

import com.devpath.backend.entity.Question;
import com.devpath.backend.entity.Track;
import com.devpath.backend.entity.Usuario;
import com.devpath.backend.entity.LearningStep;
import com.devpath.backend.repository.LearningStepRepository;
import com.devpath.backend.repository.QuestionRepository;
import com.devpath.backend.repository.TrackRepository;
import com.devpath.backend.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private TrackRepository trackRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private LearningStepRepository learningStepRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Inicializar en orden correcto
        initializeTracks();
        initializeQuestions();
        initializeLearningSteps();
        initializeUsuarios();
        
        System.out.println("✅ Datos iniciales cargados en H2 Database");
    }
    
    private void initializeTracks() throws Exception {
        if (trackRepository.count() > 0) {
            return; // Ya hay datos
        }
        
        // TRACK 1: FRONTEND
        Track frontend = new Track();
        frontend.setTrackKey("frontend");
        frontend.setIcon("🎨");
        frontend.setTitle("Frontend Developer");
        frontend.setDescription("Especialista en crear experiencias de usuario excepcionales");
        frontend.setDetails("Tu perfil indica una fuerte afinidad por el diseño visual, la experiencia de usuario y las tecnologías frontend modernas. Disfrutas viendo cómo tus creaciones cobran vida en pantalla.");
        frontend.setTechnologiesJson(objectMapper.writeValueAsString(List.of("React/Vue/Angular", "TypeScript", "CSS Grid/Flexbox", "Webpack/Vite", "Testing (Jest)")));
        frontend.setRolesJson(objectMapper.writeValueAsString(List.of("Frontend Developer", "UI Developer", "React/Vue Specialist", "Frontend Architect", "UX Engineer")));
        frontend.setCompatibility(95);
        frontend.setDemand("Muy Alta");
        frontend.setSalary("$45,000 - $120,000 USD");
        frontend.setGrowth("+15% anual");
        frontend.setCompaniesJson(objectMapper.writeValueAsString(List.of("Meta", "Netflix", "Spotify", "Airbnb", "Shopify")));
        frontend.setColor("#e74c3c");
        trackRepository.save(frontend);
        
        // TRACK 2: BACKEND
        Track backend = new Track();
        backend.setTrackKey("backend");
        backend.setIcon("⚙️");
        backend.setTitle("Backend Developer");
        backend.setDescription("Arquitecto de sistemas y APIs que impulsan aplicaciones");
        backend.setDetails("Tienes mentalidad lógica y sistemática. Disfrutas resolviendo problemas complejos de arquitectura, optimización y escalabilidad.");
        backend.setTechnologiesJson(objectMapper.writeValueAsString(List.of("Java/Python/Node.js", "Spring Boot/Django", "PostgreSQL/MongoDB", "Redis", "Microservicios")));
        backend.setRolesJson(objectMapper.writeValueAsString(List.of("Backend Developer", "API Developer", "System Architect", "Database Engineer", "Backend Lead")));
        backend.setCompatibility(92);
        backend.setDemand("Muy Alta");
        backend.setSalary("$50,000 - $130,000 USD");
        backend.setGrowth("+18% anual");
        backend.setCompaniesJson(objectMapper.writeValueAsString(List.of("Google", "Amazon", "Microsoft", "Uber", "PayPal")));
        backend.setColor("#2ecc71");
        trackRepository.save(backend);
        
        // TRACK 3: DEVOPS
        Track devops = new Track();
        devops.setTrackKey("devops");
        devops.setIcon("🚀");
        devops.setTitle("DevOps Engineer");
        devops.setDescription("Especialista en automatización e infraestructura cloud");
        devops.setDetails("Te apasiona la automatización, la infraestructura como código y la optimización de procesos. Tienes mente sistemática y te gusta resolver problemas de escalabilidad y reliability.");
        devops.setTechnologiesJson(objectMapper.writeValueAsString(List.of("Docker/Kubernetes", "AWS/Azure/GCP", "Terraform", "Jenkins/GitHub Actions", "Monitoring")));
        devops.setRolesJson(objectMapper.writeValueAsString(List.of("DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer", "Infrastructure Engineer", "DevOps Architect")));
        devops.setCompatibility(90);
        devops.setDemand("Extrema");
        devops.setSalary("$60,000 - $150,000 USD");
        devops.setGrowth("+25% anual");
        devops.setCompaniesJson(objectMapper.writeValueAsString(List.of("AWS", "Google Cloud", "Netflix", "Spotify", "Cloudflare")));
        devops.setColor("#3498db");
        trackRepository.save(devops);
        
        // TRACK 4: CYBERSECURITY
        Track cybersecurity = new Track();
        cybersecurity.setTrackKey("cybersecurity");
        cybersecurity.setIcon("🛡️");
        cybersecurity.setTitle("Cybersecurity Specialist");
        cybersecurity.setDescription("Guardián digital que protege sistemas y datos críticos");
        cybersecurity.setDetails("Tienes mente analítica y detectivesca. Te motiva proteger sistemas críticos y mantenerte un paso adelante de las amenazas. Disfrutas del pensamiento estratégico en seguridad.");
        cybersecurity.setTechnologiesJson(objectMapper.writeValueAsString(List.of("Penetration Testing", "SIEM Tools", "Cloud Security", "Network Security", "Compliance")));
        cybersecurity.setRolesJson(objectMapper.writeValueAsString(List.of("Security Analyst", "Penetration Tester", "Security Architect", "CISO", "Security Consultant")));
        cybersecurity.setCompatibility(88);
        cybersecurity.setDemand("Crítica");
        cybersecurity.setSalary("$55,000 - $140,000 USD");
        cybersecurity.setGrowth("+31% anual");
        cybersecurity.setCompaniesJson(objectMapper.writeValueAsString(List.of("CrowdStrike", "Palo Alto Networks", "IBM Security", "Cisco", "Government")));
        cybersecurity.setColor("#9b59b6");
        trackRepository.save(cybersecurity);
        
        // TRACK 5: AI/ML
        Track aiMl = new Track();
        aiMl.setTrackKey("ai_ml");
        aiMl.setIcon("🤖");
        aiMl.setTitle("AI/ML Engineer");
        aiMl.setDescription("Creador de sistemas inteligentes y algoritmos de aprendizaje");
        aiMl.setDetails("Tienes curiosidad científica y te fascina enseñar a las máquinas a aprender. Disfrutas experimentando con datos, modelos y algoritmos para resolver problemas complejos.");
        aiMl.setTechnologiesJson(objectMapper.writeValueAsString(List.of("Python/R", "TensorFlow/PyTorch", "Scikit-learn", "AWS SageMaker", "MLOps")));
        aiMl.setRolesJson(objectMapper.writeValueAsString(List.of("ML Engineer", "Data Scientist", "AI Researcher", "MLOps Engineer", "AI Product Manager")));
        aiMl.setCompatibility(87);
        aiMl.setDemand("Extrema");
        aiMl.setSalary("$70,000 - $180,000 USD");
        aiMl.setGrowth("+35% anual");
        aiMl.setCompaniesJson(objectMapper.writeValueAsString(List.of("OpenAI", "Google AI", "Meta AI", "NVIDIA", "Tesla")));
        aiMl.setColor("#e67e22");
        trackRepository.save(aiMl);
        
        // TRACK 6: QA
        Track qa = new Track();
        qa.setTrackKey("qa");
        qa.setIcon("🔍");
        qa.setTitle("QA Engineer");
        qa.setDescription("Especialista en calidad y testing automatizado");
        qa.setDetails("Tienes ojo para los detalles y mentalidad preventiva. Te satisface asegurar que los productos funcionen perfectamente antes de llegar a los usuarios finales.");
        qa.setTechnologiesJson(objectMapper.writeValueAsString(List.of("Selenium/Cypress", "Jest/JUnit", "Postman/REST Assured", "Performance Testing", "CI/CD Testing")));
        qa.setRolesJson(objectMapper.writeValueAsString(List.of("QA Engineer", "Test Automation Engineer", "Performance Tester", "QA Lead", "SDET")));
        qa.setCompatibility(85);
        qa.setDemand("Alta");
        qa.setSalary("$40,000 - $110,000 USD");
        qa.setGrowth("+12% anual");
        qa.setCompaniesJson(objectMapper.writeValueAsString(List.of("Atlassian", "Selenium", "BrowserStack", "Sauce Labs", "Testing consultancies")));
        qa.setColor("#f39c12");
        trackRepository.save(qa);
        
        // TRACK 7: FULLSTACK
        Track fullstack = new Track();
        fullstack.setTrackKey("fullstack");
        fullstack.setIcon("🌟");
        fullstack.setTitle("Full Stack Developer");
        fullstack.setDescription("Desarrollador versátil que domina frontend y backend");
        fullstack.setDetails("Tienes visión holística del desarrollo y te gusta entender cómo se conectan todas las piezas. Disfrutas de la versatilidad y los desafíos variados.");
        fullstack.setTechnologiesJson(objectMapper.writeValueAsString(List.of("React + Node.js", "TypeScript", "PostgreSQL", "Docker", "Cloud Platforms")));
        fullstack.setRolesJson(objectMapper.writeValueAsString(List.of("Full Stack Developer", "Technical Lead", "Startup CTO", "Product Engineer", "Freelance Developer")));
        fullstack.setCompatibility(88);
        fullstack.setDemand("Muy Alta");
        fullstack.setSalary("$55,000 - $135,000 USD");
        fullstack.setGrowth("+20% anual");
        fullstack.setCompaniesJson(objectMapper.writeValueAsString(List.of("Startups", "Scale-ups", "Product Companies", "Consulting", "Freelance")));
        fullstack.setColor("#8e44ad");
        trackRepository.save(fullstack);
        
        System.out.println("✅ " + trackRepository.count() + " tracks inicializados");
    }
    
    private void initializeQuestions() throws Exception {
       if (questionRepository.count() > 0) {
              return; // Ya hay datos
       }
       
       // PREGUNTA 1
       Question q1 = new Question();
       q1.setIcon("💻");
       q1.setTitle("¿Qué tecnologías te generan más curiosidad?");
       q1.setQuestionOrder(1);
       q1.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "React, Vue, TypeScript, CSS Grid - Interfaces modernas", 
                     "points", Map.of("frontend", 3, "fullstack", 1)),
              Map.of("text", "Java, Python, APIs, Microservicios - Arquitectura backend", 
                     "points", Map.of("backend", 3, "fullstack", 1)),
              Map.of("text", "Docker, Kubernetes, AWS, CI/CD - Infraestructura y deployment", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Firewalls, Penetration Testing, Ethical Hacking - Seguridad", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "TensorFlow, PyTorch, Machine Learning, Data Science", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Selenium, Jest, Cypress, Performance Testing - Calidad", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q1);
       
       // PREGUNTA 2
       Question q2 = new Question();
       q2.setIcon("🧠");
       q2.setTitle("¿Qué tipo de problemas disfrutas resolviendo más?");
       q2.setQuestionOrder(2);
       q2.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Hacer que una interfaz sea perfecta en móviles y desktop", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "Optimizar bases de datos que manejan millones de registros", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "Automatizar procesos de deployment y monitoreo", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Detectar vulnerabilidades y proteger sistemas críticos", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Entrenar modelos que predicen comportamientos o patrones", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Diseñar test cases que cubran todos los escenarios posibles", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q2);
       
       // PREGUNTA 3
       Question q3 = new Question();
       q3.setIcon("🔧");
       q3.setTitle("¿Con qué herramientas te sientes más cómodo experimentando?");
       q3.setQuestionOrder(3);
       q3.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Figma, Chrome DevTools, VS Code, Postman", 
                     "points", Map.of("frontend", 2, "fullstack", 1)),
              Map.of("text", "IntelliJ, Database clients, Postman, Terminal", 
                     "points", Map.of("backend", 2, "fullstack", 1)),
              Map.of("text", "Terminal, Bash scripts, Cloud consoles, Monitoring dashboards", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Kali Linux, Wireshark, Burp Suite, Metasploit", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Jupyter Notebooks, Google Colab, Python, R Studio", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Testing frameworks, Bug tracking, Browser automation", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q3);
       
       // PREGUNTA 4
       Question q4 = new Question();
       q4.setIcon("🎯");
       q4.setTitle("¿Cuál de estos escenarios te motiva más?");
       q4.setQuestionOrder(4);
       q4.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Ver cómo millones de usuarios interactúan con tu interfaz", 
                     "points", Map.of("frontend", 3, "fullstack", 1)),
              Map.of("text", "Construir APIs que soporten 100,000+ requests por segundo", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "Lograr que una aplicación se despliegue automáticamente en segundos", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Prevenir un ciberataque que podría costar millones", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Crear un algoritmo que supere a los humanos en una tarea específica", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Encontrar bugs críticos antes de que lleguen a producción", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q4);
       
       // PREGUNTA 5
       Question q5 = new Question();
       q5.setIcon("📊");
       q5.setTitle("¿Qué métrica de éxito te resulta más satisfactoria?");
       q5.setQuestionOrder(5);
       q5.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Tiempo de carga <2seg, 100% responsive, UX score perfecto", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "API con 99.9% uptime, respuesta <100ms, escalabilidad horizontal", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "0 downtime deployments, infraestructura que se auto-escala", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Cero vulnerabilidades detectadas, compliance 100% alcanzado", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Modelo con 95%+ accuracy, predicciones que generan valor real", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Bug detection rate >90%, cobertura de testing completa", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q5);
       
       // PREGUNTA 6 - PERSONALIDAD LABORAL
       Question q6 = new Question();
       q6.setIcon("👥");
       q6.setTitle("¿Cómo prefieres trabajar en tu día a día?");
       q6.setQuestionOrder(6);
       q6.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Solo, enfocándome en crear interfaces perfectas", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "En equipo, diseñando arquitecturas complejas", 
                     "points", Map.of("backend", 3, "fullstack", 1)),
              Map.of("text", "Automatizando procesos para que otros trabajen mejor", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Investigando amenazas y vulnerabilidades", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Experimentando con datos y algoritmos", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Documentando y probando cada detalle", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q6);
       
       // PREGUNTA 7 - ESCENARIO DE CRISIS
       Question q7 = new Question();
       q7.setIcon("🚨");
       q7.setTitle("Es viernes 6 PM y surge un problema crítico. ¿Cuál prefieres resolver?");
       q7.setQuestionOrder(7);
       q7.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "La página web no carga en móviles - usuarios frustrados", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "La base de datos está sobrecargada - sistema lento", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "El deployment falló - necesitas restaurar el servicio YA", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Detectaste un posible breach de seguridad", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "El modelo de ML está dando predicciones erróneas", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Se encontró un bug crítico justo antes del release", 
                     "points", Map.of("qa", 3)),
              Map.of("text", "Todo el stack está fallando - frontend y backend", 
                     "points", Map.of("fullstack", 3))
       )));
       questionRepository.save(q7);
       
       // PREGUNTA 8 - APRENDIZAJE CONTINUO
       Question q8 = new Question();
       q8.setIcon("📚");
       q8.setTitle("¿Qué tipo de contenido sigues para mantenerte actualizado?");
       q8.setQuestionOrder(8);
       q8.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "CSS-Tricks, Smashing Magazine, Frontend Masters", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "High Scalability, Martin Fowler, Spring Boot docs", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "AWS blogs, DevOps newsletters, Kubernetes docs", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "OWASP, Krebs on Security, CVE databases", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Papers With Code, Andrew Ng courses, Kaggle", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Testing blogs, ISTQB guides, automation tutorials", 
                     "points", Map.of("qa", 3)),
              Map.of("text", "Un poco de todo - me adapto según el proyecto", 
                     "points", Map.of("fullstack", 3))
       )));
       questionRepository.save(q8);
       
       // PREGUNTA 9 - PROYECTOS FAVORITOS
       Question q9 = new Question();
       q9.setIcon("🚀");
       q9.setTitle("¿Qué tipo de proyecto te emociona más construir?");
       q9.setQuestionOrder(9);
       q9.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Una SPA increíblemente rápida y hermosa", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "Un sistema que procese millones de transacciones", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "Infraestructura que escale automáticamente", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Un sistema de autenticación ultra-seguro", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Un chatbot que entienda lenguaje natural", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Una suite de testing completamente automatizada", 
                     "points", Map.of("qa", 3)),
              Map.of("text", "Una aplicación completa desde cero", 
                     "points", Map.of("fullstack", 3))
       )));
       questionRepository.save(q9);
       
       // PREGUNTA 10 - ESTILO DE CÓDIGO
       Question q10 = new Question();
       q10.setIcon("💡");
       q10.setTitle("¿Qué te importa más al escribir código?");
       q10.setQuestionOrder(10);
       q10.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Que sea elegante, limpio y fácil de mantener", 
                     "points", Map.of("frontend", 2, "fullstack", 1)),
              Map.of("text", "Que sea eficiente, escalable y bien documentado", 
                     "points", Map.of("backend", 2, "fullstack", 1)),
              Map.of("text", "Que sea reproducible, versionado y automatizable", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Que sea seguro, validado y libre de vulnerabilidades", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Que sea experimentable, modular y bien comentado", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Que sea testeable, confiable y libre de bugs", 
                     "points", Map.of("qa", 3))
       )));
       questionRepository.save(q10);
       
       // PREGUNTA 11 - AMBIENTE DE TRABAJO
       Question q11 = new Question();
       q11.setIcon("🏢");
       q11.setTitle("¿En qué tipo de empresa te ves trabajando?");
       q11.setQuestionOrder(11);
       q11.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Agencias digitales o empresas de diseño", 
                     "points", Map.of("frontend", 2)),
              Map.of("text", "Grandes tech companies o empresas de software", 
                     "points", Map.of("backend", 2)),
              Map.of("text", "Empresas cloud-native o consultoras de infraestructura", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Empresas de ciberseguridad o sectores críticos", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Empresas de datos, investigación o tech innovadora", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Empresas que valoren la calidad y la excelencia", 
                     "points", Map.of("qa", 2)),
              Map.of("text", "Startups donde pueda hacer de todo", 
                     "points", Map.of("fullstack", 3))
       )));
       questionRepository.save(q11);
       
       // PREGUNTA 12 - MOTIVACIÓN A LARGO PLAZO
       Question q12 = new Question();
       q12.setIcon("🎖️");
       q12.setTitle("¿Qué logro profesional te daría más orgullo?");
       q12.setQuestionOrder(12);
       q12.setOptionsJson(objectMapper.writeValueAsString(List.of(
              Map.of("text", "Crear una interfaz que millones de personas usen diariamente", 
                     "points", Map.of("frontend", 3)),
              Map.of("text", "Diseñar un sistema que nunca falle y soporte el crecimiento", 
                     "points", Map.of("backend", 3)),
              Map.of("text", "Construir infraestructura que permita deploys en segundos", 
                     "points", Map.of("devops", 3)),
              Map.of("text", "Prevenir un ataque masivo y proteger datos críticos", 
                     "points", Map.of("cybersecurity", 3)),
              Map.of("text", "Crear AI que resuelva un problema real de la humanidad", 
                     "points", Map.of("ai_ml", 3)),
              Map.of("text", "Establecer estándares de calidad que otros equipos sigan", 
                     "points", Map.of("qa", 3)),
              Map.of("text", "Liderar el desarrollo completo de un producto exitoso", 
                     "points", Map.of("fullstack", 3))
       )));
       questionRepository.save(q12);
       
       System.out.println("✅ " + questionRepository.count() + " preguntas inicializadas");
       }

    
    private void initializeUsuarios() {
        if (usuarioRepository.count() > 0) {
            return;
        }
        
        Usuario testUser = new Usuario();
        testUser.setEmail("test@devpath.com");
        testUser.setNombre("Usuario Test");
        testUser.setPassword(passwordEncoder.encode("password"));
        usuarioRepository.save(testUser);
        
        System.out.println("✅ Usuario de prueba creado: test@devpath.com / password");
    }
       private void initializeLearningSteps() throws Exception {
              if (learningStepRepository.count() > 0) {
                     return;
              }
              
              createFrontendPath();
              createBackendPath();
              createFullStackPath();
              createDevOpsPath();
              createCybersecurityPath();
              createAIMLPath();
              createQAPath();
              
              System.out.println("✅ " + learningStepRepository.count() + " learning steps inicializados");
              }

              // 1. FRONTEND PATH
              private void createFrontendPath() throws Exception {
              // FASE 1: FUNDAMENTOS
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("frontend");
              step1.setPhase(1);
              step1.setTitle("Fundamentos Web");
              step1.setDescription("Domina HTML, CSS y JavaScript desde cero");
              step1.setDuration(8);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "HTML5 semántico", "CSS3 y Flexbox/Grid", "JavaScript ES6+", "DOM manipulation", "Responsive design"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "MDN Web Docs", "FreeCodeCamp", "CSS-Tricks", "JavaScript.info", "Codepen para práctica"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Portfolio personal responsive", "Landing page interactiva", "Calculadora JS", "Todo List app"
              )));
              learningStepRepository.save(step1);
              
              // FASE 2: FRAMEWORKS MODERNOS
              LearningStep step2 = new LearningStep();
              step2.setTrackKey("frontend");
              step2.setPhase(2);
              step2.setTitle("React & Ecosystem");
              step2.setDescription("Aprende React, hooks y herramientas modernas");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "React components", "Hooks (useState, useEffect)", "Context API", "React Router", "TypeScript basics"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "React Documentation", "Kent C. Dodds courses", "Egghead.io", "React TypeScript Cheatsheet"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "E-commerce SPA", "Weather app con API", "Task manager con estado", "Movie search app"
              )));
              learningStepRepository.save(step2);
              
              // FASE 3: HERRAMIENTAS AVANZADAS
              LearningStep step3 = new LearningStep();
              step3.setTrackKey("frontend");
              step3.setPhase(3);
              step3.setTitle("Stack Moderno");
              step3.setDescription("Next.js, Tailwind, testing y deployment");
              step3.setDuration(8);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Next.js SSR/SSG", "Tailwind CSS", "Jest & React Testing Library", "Git & GitHub Actions", "Vercel deployment"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Next.js Learn", "Tailwind Documentation", "Testing Library docs", "GitHub Actions guide"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Blog con Next.js", "Dashboard con charts", "Progressive Web App", "Componente library"
              )));
              learningStepRepository.save(step3);
              
              // FASE 4: PERFORMANCE & OPTIMIZACIÓN
              LearningStep step4 = new LearningStep();
              step4.setTrackKey("frontend");
              step4.setPhase(4);
              step4.setTitle("Performance Expert");
              step4.setDescription("Optimización, accessibility y mejores prácticas");
              step4.setDuration(6);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Web Vitals", "Code splitting", "Accessibility (a11y)", "SEO optimization", "Bundle analysis"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Web.dev", "Lighthouse audits", "A11y project", "Webpack Bundle Analyzer"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Optimized e-commerce", "Accessibility-first app", "Performance dashboard", "SEO-optimized blog"
              )));
              learningStepRepository.save(step4);
              
              // FASE 5: PORTFOLIO PROFESIONAL
              LearningStep step5 = new LearningStep();
              step5.setTrackKey("frontend");
              step5.setPhase(5);
              step5.setTitle("Portfolio & Career");
              step5.setDescription("Construye un portfolio que te consiga trabajo");
              step5.setDuration(6);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Portfolio design", "Case study writing", "Technical interviews", "Open source contributions"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Dribbble inspiration", "Dev.to articles", "Frontend Mentor challenges", "CodePen showcases"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Portfolio website", "3 complex web apps", "Open source contribution", "Technical blog"
              )));
              learningStepRepository.save(step5);
              }

              // 2. BACKEND PATH
              private void createBackendPath() throws Exception {
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("backend");
              step1.setPhase(1);
              step1.setTitle("Fundamentos Backend");
              step1.setDescription("Bases sólidas de programación y lógica");
              step1.setDuration(10);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Java/Python fundamentals", "OOP principles", "Data structures", "Algorithms", "Git basics"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Oracle Java Tutorials", "Python.org docs", "LeetCode problems", "Git Pro book"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Console CRUD app", "File processing system", "Basic REST API", "Unit tests suite"
              )));
              learningStepRepository.save(step1);

              LearningStep step2 = new LearningStep();
              step2.setTrackKey("backend");
              step2.setPhase(2);
              step2.setTitle("APIs y Databases");
              step2.setDescription("Construye APIs robustas y maneja datos");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Spring Boot/Django", "RESTful APIs", "SQL & PostgreSQL", "JPA/Hibernate", "API documentation"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Spring Boot guides", "PostgreSQL tutorial", "Swagger docs", "Postman collections"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "E-commerce API", "User management system", "Blog backend", "Authentication service"
              )));
              learningStepRepository.save(step2);

              LearningStep step3 = new LearningStep();
              step3.setTrackKey("backend");
              step3.setPhase(3);
              step3.setTitle("Arquitectura Avanzada");
              step3.setDescription("Microservicios, caching y patterns");
              step3.setDuration(8);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Microservices", "Redis caching", "Design patterns", "Message queues", "Docker basics"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Microservices.io", "Redis documentation", "RabbitMQ tutorials", "Docker getting started"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Microservices architecture", "Caching layer implementation", "Event-driven system", "Containerized app"
              )));
              learningStepRepository.save(step3);

              LearningStep step4 = new LearningStep();
              step4.setTrackKey("backend");
              step4.setPhase(4);
              step4.setTitle("Escalabilidad & Performance");
              step4.setDescription("Optimización para alto rendimiento");
              step4.setDuration(8);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Load balancing", "Database optimization", "Monitoring", "Performance tuning", "Security best practices"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "nginx documentation", "Database indexing guides", "Prometheus monitoring", "OWASP guidelines"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "High-load API", "Performance monitoring dashboard", "Security audit system", "Scalable chat app"
              )));
              learningStepRepository.save(step4);

              LearningStep step5 = new LearningStep();
              step5.setTrackKey("backend");
              step5.setPhase(5);
              step5.setTitle("DevOps & Deployment");
              step5.setDescription("Deploy y mantener sistemas en producción");
              step5.setDuration(6);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "AWS/Azure", "CI/CD pipelines", "Infrastructure as Code", "System monitoring", "Troubleshooting"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "AWS documentation", "Jenkins tutorials", "Terraform guides", "CloudWatch monitoring"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Cloud deployment", "CI/CD pipeline setup", "Infrastructure automation", "Production monitoring"
              )));
              learningStepRepository.save(step5);
              }

              // 3. FULLSTACK PATH
              private void createFullStackPath() throws Exception {
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("fullstack");
              step1.setPhase(1);
              step1.setTitle("Full Stack Foundations");
              step1.setDescription("Fundamentos frontend y backend");
              step1.setDuration(12);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "HTML/CSS/JavaScript", "React basics", "Node.js fundamentals", "Express.js", "MongoDB"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Full Stack Open", "Node.js docs", "React documentation", "MongoDB University"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Simple CRUD app", "Todo app with database", "User authentication", "Basic e-commerce"
              )));
              learningStepRepository.save(step1);

              LearningStep step2 = new LearningStep();
              step2.setTrackKey("fullstack");
              step2.setPhase(2);
              step2.setTitle("Modern Stack");
              step2.setDescription("Tecnologías modernas full stack");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "TypeScript", "Next.js", "Prisma ORM", "PostgreSQL", "Tailwind CSS"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "TypeScript handbook", "Next.js learn", "Prisma docs", "Tailwind documentation"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Blog platform", "Social media app", "Dashboard with charts", "Real-time chat"
              )));
              learningStepRepository.save(step2);

              LearningStep step3 = new LearningStep();
              step3.setTrackKey("fullstack");
              step3.setPhase(3);
              step3.setTitle("Advanced Integration");
              step3.setDescription("APIs, testing y deployment");
              step3.setDuration(8);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "API integration", "Testing (Jest/Cypress)", "GraphQL", "Docker", "Deployment"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "GraphQL docs", "Cypress documentation", "Docker tutorials", "Vercel guides"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "GraphQL API", "E2E tested app", "Microservices architecture", "Deployed full stack app"
              )));
              learningStepRepository.save(step3);

              LearningStep step4 = new LearningStep();
              step4.setTrackKey("fullstack");
              step4.setPhase(4);
              step4.setTitle("Production Ready");
              step4.setDescription("Aplicaciones listas para producción");
              step4.setDuration(8);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Performance optimization", "Security", "Monitoring", "Error handling", "Scalability"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Web Performance", "OWASP guidelines", "Sentry docs", "Load testing guides"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Optimized e-commerce", "Secure banking app", "Real-time collaboration tool", "Scalable SaaS"
              )));
              learningStepRepository.save(step4);

              LearningStep step5 = new LearningStep();
              step5.setTrackKey("fullstack");
              step5.setPhase(5);
              step5.setTitle("Leadership & Architecture");
              step5.setDescription("Liderazgo técnico y arquitectura");
              step5.setDuration(6);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Technical leadership", "System design", "Code reviews", "Team mentoring", "Project management"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "System Design Primer", "Tech Lead guides", "Architecture patterns", "Agile methodologies"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Enterprise application", "Team project leadership", "Architecture documentation", "Open source project"
              )));
              learningStepRepository.save(step5);
              }

              // 4. DEVOPS PATH
              private void createDevOpsPath() throws Exception {
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("devops");
              step1.setPhase(1);
              step1.setTitle("Linux & Scripting");
              step1.setDescription("Fundamentos de sistemas y automatización");
              step1.setDuration(8);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Linux administration", "Bash scripting", "Git advanced", "Networking basics", "Security fundamentals"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Linux Command Line", "Bash scripting guide", "Git Pro book", "Networking tutorials"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Server setup automation", "Backup scripts", "Monitoring scripts", "User management system"
              )));
              learningStepRepository.save(step1);

              LearningStep step2 = new LearningStep();
              step2.setTrackKey("devops");
              step2.setPhase(2);
              step2.setTitle("Containerization & Orchestration");
              step2.setDescription("Docker y Kubernetes");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Docker", "Docker Compose", "Kubernetes", "Container security", "Registry management"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Docker documentation", "Kubernetes tutorials", "Docker Hub", "K8s official docs"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Multi-container app", "K8s cluster setup", "Microservices deployment", "Container monitoring"
              )));
              learningStepRepository.save(step2);

              LearningStep step3 = new LearningStep();
              step3.setTrackKey("devops");
              step3.setPhase(3);
              step3.setTitle("CI/CD & Automation");
              step3.setDescription("Pipelines y automatización");
              step3.setDuration(8);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Jenkins/GitHub Actions", "Pipeline as Code", "Automated testing", "Deployment strategies", "Rollback procedures"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Jenkins documentation", "GitHub Actions guide", "GitLab CI/CD", "Jenkins Pipeline"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Complete CI/CD pipeline", "Multi-environment deployment", "Automated testing suite", "Rollback automation"
              )));
              learningStepRepository.save(step3);

              LearningStep step4 = new LearningStep();
              step4.setTrackKey("devops");
              step4.setPhase(4);
              step4.setTitle("Cloud & Infrastructure");
              step4.setDescription("AWS/Azure y Infrastructure as Code");
              step4.setDuration(10);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "AWS/Azure services", "Terraform", "CloudFormation", "Serverless", "Cost optimization"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "AWS documentation", "Terraform guides", "Azure tutorials", "Serverless framework"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Cloud infrastructure", "IaC implementation", "Serverless application", "Cost monitoring system"
              )));
              learningStepRepository.save(step4);

              LearningStep step5 = new LearningStep();
              step5.setTrackKey("devops");
              step5.setPhase(5);
              step5.setTitle("Monitoring & SRE");
              step5.setDescription("Site Reliability Engineering");
              step5.setDuration(8);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Prometheus/Grafana", "ELK Stack", "Incident management", "SLA/SLO", "Disaster recovery"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Prometheus docs", "Grafana tutorials", "Elasticsearch guide", "SRE book"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Complete monitoring stack", "Alerting system", "Disaster recovery plan", "SRE dashboard"
              )));
              learningStepRepository.save(step5);
              }

              // 5. CYBERSECURITY PATH
              private void createCybersecurityPath() throws Exception {
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("cybersecurity");
              step1.setPhase(1);
              step1.setTitle("Security Fundamentals");
              step1.setDescription("Bases de ciberseguridad y redes");
              step1.setDuration(10);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Network security", "Cryptography basics", "Security protocols", "Risk assessment", "Compliance"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "CISSP study guide", "Security+ materials", "OWASP documentation", "NIST framework"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Network security audit", "Risk assessment report", "Security policy document", "Vulnerability scan"
              )));
              learningStepRepository.save(step1);

              LearningStep step2 = new LearningStep();
              step2.setTrackKey("cybersecurity");
              step2.setPhase(2);
              step2.setTitle("Penetration Testing");
              step2.setDescription("Ethical hacking y testing");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Kali Linux", "Metasploit", "Burp Suite", "OWASP Top 10", "Social engineering"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Kali documentation", "Metasploit guides", "PortSwigger Web Security", "CEH materials"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Web app penetration test", "Network penetration test", "Social engineering assessment", "Vulnerability report"
              )));
              learningStepRepository.save(step2);

              LearningStep step3 = new LearningStep();
              step3.setTrackKey("cybersecurity");
              step3.setPhase(3);
              step3.setTitle("Security Operations");
              step3.setDescription("SOC y respuesta a incidentes");
              step3.setDuration(8);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "SIEM tools", "Incident response", "Digital forensics", "Malware analysis", "Threat hunting"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Splunk documentation", "SANS incident response", "Volatility framework", "GCIH materials"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "SOC setup", "Incident response plan", "Forensics investigation", "Threat hunting program"
              )));
              learningStepRepository.save(step3);

              LearningStep step4 = new LearningStep();
              step4.setTrackKey("cybersecurity");
              step4.setPhase(4);
              step4.setTitle("Advanced Security");
              step4.setDescription("Especialización avanzada");
              step4.setDuration(8);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Cloud security", "IoT security", "AI/ML security", "Zero trust architecture", "DevSecOps"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Cloud security guides", "IoT security framework", "DevSecOps practices", "Zero trust models"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Cloud security architecture", "IoT security assessment", "DevSecOps pipeline", "Zero trust implementation"
              )));
              learningStepRepository.save(step4);

              LearningStep step5 = new LearningStep();
              step5.setTrackKey("cybersecurity");
              step5.setPhase(5);
              step5.setTitle("Security Leadership");
              step5.setDescription("Gestión y liderazgo en seguridad");
              step5.setDuration(6);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Security governance", "Risk management", "Team leadership", "Business communication", "Strategic planning"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "CISM study guide", "Risk management frameworks", "Security leadership books", "Governance models"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Security program design", "Risk management framework", "Security team building", "Executive security briefing"
              )));
              learningStepRepository.save(step5);
              }

              // 6. AI/ML PATH  
              private void createAIMLPath() throws Exception {
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("ai_ml");
              step1.setPhase(1);
              step1.setTitle("Math & Programming");
              step1.setDescription("Fundamentos matemáticos y Python");
              step1.setDuration(12);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Python programming", "Linear algebra", "Statistics", "Calculus", "NumPy/Pandas"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Python for Data Science", "Khan Academy Math", "3Blue1Brown", "NumPy documentation"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Data analysis project", "Statistical analysis", "Python algorithms", "Data visualization"
              )));
              learningStepRepository.save(step1);

              LearningStep step2 = new LearningStep();
              step2.setTrackKey("ai_ml");
              step2.setPhase(2);
              step2.setTitle("Machine Learning");
              step2.setDescription("Algoritmos y modelos ML");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Supervised learning", "Unsupervised learning", "Scikit-learn", "Feature engineering", "Model evaluation"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Scikit-learn docs", "Andrew Ng course", "Hands-On ML book", "Kaggle Learn"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Classification project", "Regression analysis", "Clustering project", "Kaggle competition"
              )));
              learningStepRepository.save(step2);

              LearningStep step3 = new LearningStep();
              step3.setTrackKey("ai_ml");
              step3.setPhase(3);
              step3.setTitle("Deep Learning");
              step3.setDescription("Neural networks y frameworks");
              step3.setDuration(10);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Neural networks", "TensorFlow/PyTorch", "CNN", "RNN", "Transfer learning"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "TensorFlow tutorials", "PyTorch documentation", "Deep Learning book", "Fast.ai course"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Image classification", "Text analysis", "Time series prediction", "Neural network from scratch"
              )));
              learningStepRepository.save(step3);

              LearningStep step4 = new LearningStep();
              step4.setTrackKey("ai_ml");
              step4.setPhase(4);
              step4.setTitle("Specialized AI");
              step4.setDescription("NLP, Computer Vision, y especialización");
              step4.setDuration(8);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "MLOps", "Model deployment"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Hugging Face docs", "OpenCV tutorials", "MLOps guides", "Model serving tutorials"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Chatbot development", "Object detection system", "Recommendation engine", "ML pipeline"
              )));
              learningStepRepository.save(step4);

              LearningStep step5 = new LearningStep();
              step5.setTrackKey("ai_ml");
              step5.setPhase(5);
              step5.setTitle("AI Engineering");
              step5.setDescription("Producción y escalamiento de AI");
              step5.setDuration(8);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Production ML", "A/B testing", "Model monitoring", "Ethical AI", "Research skills"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "ML Engineering books", "Google AI ethics", "Research papers", "Production ML guides"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "End-to-end ML system", "AI product development", "Research project", "Open source contribution"
              )));
              learningStepRepository.save(step5);
              }

              // 7. QA PATH
              private void createQAPath() throws Exception {
              LearningStep step1 = new LearningStep();
              step1.setTrackKey("qa");
              step1.setPhase(1);
              step1.setTitle("Testing Fundamentals");
              step1.setDescription("Bases de testing y QA");
              step1.setDuration(8);
              step1.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Testing principles", "Test case design", "Bug reporting", "SDLC knowledge", "Manual testing"
              )));
              step1.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "ISTQB syllabus", "Testing fundamentals", "Bug tracking tools", "Agile testing"
              )));
              step1.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Test plan creation", "Manual testing project", "Bug report portfolio", "Test case suite"
              )));
              learningStepRepository.save(step1);

              LearningStep step2 = new LearningStep();
              step2.setTrackKey("qa");
              step2.setPhase(2);
              step2.setTitle("Automation Testing");
              step2.setDescription("Selenium y frameworks de automatización");
              step2.setDuration(10);
              step2.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Selenium WebDriver", "TestNG/JUnit", "Page Object Model", "Data-driven testing", "CI/CD integration"
              )));
              step2.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Selenium documentation", "TestNG guides", "Automation frameworks", "Jenkins integration"
              )));
              step2.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Web automation suite", "Mobile automation", "API automation", "CI/CD pipeline"
              )));
              learningStepRepository.save(step2);

              LearningStep step3 = new LearningStep();
              step3.setTrackKey("qa");
              step3.setPhase(3);
              step3.setTitle("Advanced Testing");
              step3.setDescription("Performance, API y security testing");
              step3.setDuration(8);
              step3.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "API testing", "Performance testing", "Security testing", "Database testing", "Test management"
              )));
              step3.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Postman documentation", "JMeter tutorials", "OWASP testing guide", "SQL for testers"
              )));
              step3.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "API test suite", "Performance testing project", "Security test plan", "Database validation"
              )));
              learningStepRepository.save(step3);

              LearningStep step4 = new LearningStep();
              step4.setTrackKey("qa");
              step4.setPhase(4);
              step4.setTitle("DevOps Testing");
              step4.setDescription("Testing en pipeline DevOps");
              step4.setDuration(6);
              step4.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Docker testing", "Kubernetes testing", "Infrastructure testing", "Monitoring", "Test reporting"
              )));
              step4.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "Docker test strategies", "K8s testing", "Infrastructure testing", "Test reporting tools"
              )));
              step4.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "Containerized test suite", "Infrastructure tests", "Monitoring setup", "Test dashboard"
              )));
              learningStepRepository.save(step4);

              LearningStep step5 = new LearningStep();
              step5.setTrackKey("qa");
              step5.setPhase(5);
              step5.setTitle("QA Leadership");
              step5.setDescription("Gestión de calidad y equipos");
              step5.setDuration(6);
              step5.setSkillsJson(objectMapper.writeValueAsString(List.of(
                     "Test strategy", "Team leadership", "Process improvement", "Quality metrics", "Stakeholder management"
              )));
              step5.setResourcesJson(objectMapper.writeValueAsString(List.of(
                     "QA management books", "Test strategy guides", "Agile QA practices", "Quality metrics"
              )));
              step5.setProjectsJson(objectMapper.writeValueAsString(List.of(
                     "QA strategy document", "Team process improvement", "Quality dashboard", "Training program"
              )));
              learningStepRepository.save(step5);
              }
       }

