# 🚀 DevPath - Plataforma de Rutas de Aprendizaje Tecnológico

<div align="center">


**Una plataforma completa para guiar el aprendizaje en desarrollo de software**  
*Desarrollada como proyecto final para Marcos de Desarrollo Web - UTP*

</div>

***

## 📋 **Tabla de Contenidos**

- [✨ Características](#-características)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🎯 Funcionalidades Principales](#-funcionalidades-principales)
- [🚀 Demo en Vivo](#-demo-en-vivo)
- [⚙️ Instalación Local](#️-instalación-local)
- [🐳 Docker](#-docker)
- [📱 Uso de la Plataforma](#-uso-de-la-plataforma)
- [🔧 API Endpoints](#-api-endpoints)
- [👤 Autor](#-autor)

***

## ✨ **Características**

- 🎓 **7 Rutas de Aprendizaje Completas** - Frontend, Backend, DevOps, FullStack, AI/ML, Cybersecurity, QA
- 🧭 **Sistema de Navegación Intuitivo** - Progresa paso a paso con 35+ learning steps
- 📊 **Quiz Interactivo Inteligente** - 12 preguntas con algoritmo de recomendación personalizada
- 🔐 **Autenticación Segura JWT** - Sistema completo con Spring Security
- 📱 **Diseño 100% Responsive** - Optimizado para móvil, tablet y desktop
- 🚀 **API REST Robusta** - Backend con Spring Boot y PostgreSQL
- 🐳 **Containerizado con Docker** - Deployado profesionalmente en Render
- 📈 **Base de Datos Persistente** - PostgreSQL con data inicializada automáticamente

***

## 🛠️ **Stack Tecnológico**

### **Backend**
```
☕ Java 17                    🌱 Spring Boot 3.5.6
🔒 Spring Security + JWT      🐘 PostgreSQL 17.6  
📊 Hibernate/JPA              🏗️ Maven
```

### **Frontend**
```
🌐 HTML5 + CSS3              ⚡ JavaScript ES6+
🎨 Responsive Design          📱 Mobile First
```

### **DevOps & Deploy**
```
🐳 Docker Multi-Stage        ☁️ Render Cloud
📄 GitHub Pages              🔧 Git Workflow
```

***

## 🎯 **Funcionalidades Principales**

### **🧭 Sistema de Rutas de Aprendizaje**

| Track | Tecnologías | Fases |
|-------|-------------|--------|
| 🎨 **Frontend** | HTML, CSS, JS, React, Vue | 5 fases - 35 pasos |
| ⚙️ **Backend** | Java, Spring, APIs, Microservicios | 5 fases - 35 pasos |
| ☁️ **DevOps** | Docker, CI/CD, Cloud, Kubernetes | 5 fases - 35 pasos |
| 🔄 **Full Stack** | Desarrollo end-to-end completo | 5 fases - 35 pasos |
| 🤖 **AI/ML** | Python, TensorFlow, Algoritmos | 5 fases - 35 pasos |
| 🛡️ **Cybersecurity** | Pentesting, Ethical Hacking | 5 fases - 35 pasos |
| 🧪 **QA Testing** | Automatización, Calidad | 5 fases - 35 pasos |

### **📊 Sistema de Quiz Inteligente**
- ✅ **12 preguntas técnicas** curadas por expertos en desarrollo
- 🎯 **Algoritmo de recomendación** basado en respuestas del usuario
- 📈 **Puntuación automática** con feedback instantáneo
- 💡 **Recomendaciones personalizadas** de rutas de aprendizaje

### **🔐 Sistema de Autenticación Completo**
- 🔑 **Registro/Login seguro** con encriptación BCrypt
- 🎟️ **JWT Tokens** para autenticación stateless
- 🛡️ **Protección de rutas** con Spring Security
- 💾 **Sesión persistente** en localStorage del navegador

***

## 🚀 **Demo en Vivo**

### **🌐 Aplicación Frontend**
**URL:** **[https://pisarana.github.io/DevPath-Proyecto/](https://pisarana.github.io/DevPath-Proyecto/)**

### **🔗 API Backend**
**URL:** **[https://devpath-proyecto.onrender.com](https://devpath-proyecto.onrender.com)**

### **🧪 Prueba los Endpoints**
```bash
# Health Check del sistema
curl https://devpath-proyecto.onrender.com/actuator/health

# Obtener todas las rutas de aprendizaje
curl https://devpath-proyecto.onrender.com/learning/tracks

# Obtener ruta específica de Frontend
curl https://devpath-proyecto.onrender.com/learning/path/frontend

# Obtener preguntas del quiz
curl https://devpath-proyecto.onrender.com/quiz/questions
```

***

## ⚙️ **Instalación Local**

### **📋 Prerrequisitos**
```bash
☕ Java 17+          📦 Maven 3.8+
🐘 PostgreSQL 12+    🐳 Docker (opcional)
📁 Git              🌐 Navegador web moderno
```

### **🚀 Configuración Paso a Paso**

#### **1. Clonar el Repositorio**
```bash
git clone https://github.com/pisarana/DevPath-Proyecto.git
cd DevPath-Proyecto
```

#### **2. Configurar Base de Datos**
```bash
# Crear base de datos PostgreSQL
createdb devpath_local

# Configurar application.yml (backend/src/main/resources/)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/devpath_local
    username: tu_usuario
    password: tu_password
```

#### **3. Ejecutar Backend**
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run

# Backend disponible en: http://localhost:8080
```

#### **4. Ejecutar Frontend**
```bash
# Desde la raíz del proyecto
# Con Python
python -m http.server 3000

# Con Node.js
npx serve . -p 3000

# Frontend disponible en: http://localhost:3000
```

***

## 🐳 **Docker**

### **🏃‍♂️ Ejecución con Docker Compose**
```bash
# Clonar y ejecutar todo el stack
git clone https://github.com/pisarana/DevPath-Proyecto.git
cd DevPath-Proyecto
docker-compose up --build

# Aplicación disponible en:
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
```

### **🔧 Build Manual**
```bash
# Construir imagen del backend
cd backend
docker build -t devpath-backend .

# Ejecutar con variables de entorno
docker run -p 8080:8080 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e JWT_SECRET=tu-jwt-secret-seguro \
  devpath-backend
```

***

## 📱 **Uso de la Plataforma**

### **1. 🎯 Evalúa tu Nivel Actual**
- Completa el **quiz de 12 preguntas técnicas**
- Recibe una **puntuación automática** del 0 al 100%
- Obtén **recomendaciones personalizadas** basadas en tus respuestas

### **2. 🧭 Explora las Rutas de Aprendizaje**
- Navega por **7 tracks de desarrollo** diferentes
- Cada ruta tiene **5 fases estructuradas** de aprendizaje
- Más de **35 pasos detallados** con recursos específicos

### **3. 📈 Registra tu Progreso**
- **Crea tu cuenta** para guardar tu progreso
- **Autenticación segura** con JWT
- **Interfaz intuitiva** para navegación fluida

***

## 🔧 **API Endpoints**

### **🔐 Autenticación**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/auth/register` | Registro de nuevo usuario |
| `POST` | `/auth/login` | Iniciar sesión |
| `GET` | `/auth/test` | Verificar autenticación |

### **📚 Learning Paths**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/learning/tracks` | Obtener todos los tracks |
| `GET` | `/learning/path/{trackName}` | Obtener ruta específica |
| `GET` | `/tracks` | Lista básica de tracks |

### **📊 Sistema de Quiz**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/quiz/questions` | Obtener preguntas del quiz |
| `POST` | `/quiz/submit` | Enviar respuestas (auth requerida) |

### **💡 Recomendaciones**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/recommendations/quiz/{score}` | Recomendaciones por puntuación |

### **🏥 Monitoreo**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/actuator/health` | Estado de la aplicación |
| `GET` | `/actuator/info` | Información del sistema |

***

## 👤 **Autor**

<div align="center">

### **Misael Challco**  
*🎓 Estudiante de Ingeniería de Software - UTP*  
*💼 Especialista en Sistemas Mainframe & Full Stack Development*

🚀 Journey:** Junior Programmer → Switch Analyst  
**💻 Tech:** COBOL/AS400 → Spring Boot & Modern Web  
**🎯 Vision:** Liderando la nueva generación de desarrolladores

</div>

---

<div align="center">

### **🌟 ¡Gracias por visitar DevPath!**

**Si este proyecto te parece útil, dale una ⭐ y compártelo con otros desarrolladores**



**Desarrollado con ❤️ para la comunidad de desarrolladores peruanos**

---

**📅 Última actualización:** Septiembre 2025  
**📄 Licencia:** MIT License  
**🏫 Universidad:** Universidad Tecnológica del Perú (UTP)  
**📚 Curso:** Marcos de Desarrollo Web

</div>

