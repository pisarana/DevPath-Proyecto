

# 🚀 DevPath - Plataforma de Rutas de Aprendizaje Tecnológico

<div align="center">

![DevPath Banner](https://img.shields.io/badge/DevPath-Learning%20Platform-blue?style=for-the-badgeio/badge/🌐%20Live%20Demo-Visit%20Site-brightgreen?style=for-ttps://img.shields.io/badge/🔗%20Backend%20API-Render-blueviolet?style=for-
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen?style=flats://img.shields.io/badge/PostgreSQL-17shields.io/badge/Docker-Containerizeompleta para guiar el aprendizaje en desarrollo de software**  
*Desarrollada como proyecto final para Marcos de Desarrollo Web*

[🎯 **Ver Demo**](https://pisarana.github.io/DevPath-Proyecto/) -  [📖 **Documentación API**](https://devpath-proyecto.onrender.com/actuator/health) -  [🐳 **Docker Hub**](#docker)

</div>

***

## 📋 **Tabla de Contenidos**

- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [🎯 Funcionalidades](#-funcionalidades)
- [🚀 Demo en Vivo](#-demo-en-vivo)
- [⚙️ Instalación y Configuración](#️-instalación-y-configuración)
- [🐳 Docker](#-docker)
- [📱 Uso de la Plataforma](#-uso-de-la-plataforma)
- [🔧 API Endpoints](#-api-endpoints)
- [👤 Autor](#-autor)

***

## ✨ **Características**

🎓 **Rutas de Aprendizaje Estructuradas** - 7 tracks completos de desarrollo tecnológico  
🧭 **Sistema de Navegación Intuitivo** - Progresa paso a paso en tu carrera  
📊 **Quiz Interactivo** - Evalúa tus conocimientos y obtén recomendaciones personalizadas  
🔐 **Autenticación JWT** - Sistema seguro de usuarios con Spring Security  
📱 **Diseño Responsive** - Experiencia optimizada en todos los dispositivos  
🚀 **Arquitectura Moderna** - Backend REST API + Frontend dinámico  
🐳 **Containerizado** - Deployado con Docker en Render  
📈 **Base de Datos Robusta** - PostgreSQL para almacenamiento persistente  

***

## 🛠️ **Tecnologías**

### **Backend**
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=spring&/badge/Java-ED8B00?style=flat&logo=



![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flatimg.shields.io/badge/JWT-black






### **Frontend**
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&://img.shields.io/badge/CSS3-1572B6


![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColorOps & Deploy**
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flatio/badge/Render-46E3B7?style=flat/badge/GitHub%20Pages-222222?style=flat&logo=/badge/Git-F05032?style=flat&logo=gitFuncionalidades**

### **🧭 Sistema de Rutas de Aprendizaje**
```
📚 Frontend Development    - HTML, CSS, JS, React, Vue
💻 Backend Development     - Java, Spring, APIs, Microservicios  
☁️  DevOps                 - Docker, CI/CD, Cloud, Kubernetes
🔧 Full Stack             - Desarrollo completo end-to-end
🤖 AI & Machine Learning   - Python, TensorFlow, Algoritmos
🛡️  Cybersecurity         - Pentesting, Seguridad, Ethical Hacking
🧪 Quality Assurance      - Testing, Automatización, Calidad
```

### **📊 Sistema de Quiz Inteligente**
- **12 preguntas técnicas** curadas por expertos
- **Algoritmo de recomendación** basado en respuestas
- **Puntuación automática** con feedback instantáneo
- **Recomendaciones personalizadas** de rutas de aprendizaje

### **🔐 Sistema de Autenticación**
- **Registro/Login seguro** con encriptación de contraseñas
- **JWT Tokens** para autenticación stateless
- **Protección de rutas** con Spring Security
- **Sesión persistente** en localStorage

***

## 🚀 **Demo en Vivo**

### **🌐 Frontend**
**URL:** [https://pisarana.github.io/DevPath-Proyecto/](https://pisarana.github.io/DevPath-Proyecto/)

### **🔗 Backend API**
**URL:** [https://devpath-proyecto.onrender.com](https://devpath-proyecto.onrender.com)

### **🧪 Endpoints de Prueba**
```bash
# Health Check
GET https://devpath-proyecto.onrender.com/actuator/health

# Learning Tracks
GET https://devpath-proyecto.onrender.com/learning/tracks

# Frontend Learning Path
GET https://devpath-proyecto.onrender.com/learning/path/frontend

# Quiz Questions
GET https://devpath-proyecto.onrender.com/quiz/questions
```

***

## ⚙️ **Instalación y Configuración**

### **📋 Prerrequisitos**
- Java 17+
- Maven 3.8+
- PostgreSQL 12+
- Docker (opcional)
- Git

### **🚀 Instalación Local**

```bash
# 1. Clonar el repositorio
git clone https://github.com/pisarana/DevPath-Proyecto.git
cd DevPath-Proyecto

# 2. Configurar Backend
cd backend
cp src/main/resources/application.yml.example src/main/resources/application.yml
# Editar application.yml con tu configuración de base de datos

# 3. Instalar dependencias y ejecutar
./mvnw clean install
./mvnw spring-boot:run

# 4. El backend estará disponible en: http://localhost:8080
```

### **🎨 Frontend**
```bash
# Servir archivos estáticos (desde la raíz del proyecto)
# Con Python
python -m http.server 3000

# Con Node.js
npx serve . -p 3000

# Frontend disponible en: http://localhost:3000
```

***

## 🐳 **Docker**

### **🏃‍♂️ Ejecución Rápida**
```bash
# Ejecutar con Docker Compose (recomendado)
docker-compose up --build

# O construir manualmente
cd backend
docker build -t devpath-backend .
docker run -p 8080:8080 \
  -e DATABASE_URL=your_postgres_url \
  -e JWT_SECRET=your_secret \
  devpath-backend
```

### **📦 Multi-Stage Build**
El Dockerfile utiliza **multi-stage build** para optimizar el tamaño de la imagen:
- **Stage 1:** Compilación con Maven
- **Stage 2:** Runtime con JRE (imagen final ~200MB)

---

## 📱 **Uso de la Plataforma**

### **1. 🎯 Evalúa tu Nivel**
- Completa el quiz de 12 preguntas
- Recibe una puntuación automática
- Obtén recomendaciones personalizadas

### **2. 🧭 Explora las Rutas**
- Navega por 7 tracks de desarrollo
- Cada ruta tiene 5 fases estructuradas
- 35+ pasos de aprendizaje detallados

### **3. 📈 Sigue tu Progreso**
- Sistema de autenticación para guardar progreso
- Interfaz intuitiva para navegación
- Recomendaciones adaptativas

***

## 🔧 **API Endpoints**

### **🔐 Autenticación**
```http
POST /auth/register    # Registro de usuario
POST /auth/login       # Iniciar sesión
GET  /auth/test        # Verificar autenticación
```

### **📚 Learning Paths**
```http
GET  /learning/tracks              # Todos los tracks
GET  /learning/path/{trackName}    # Ruta específica
GET  /tracks                       # Lista básica de tracks
```

### **📊 Quiz System**
```http
GET  /quiz/questions    # Obtener preguntas
POST /quiz/submit       # Enviar respuestas (requiere auth)
```

### **💡 Recomendaciones**
```http
GET  /recommendations/quiz/{score}  # Recomendaciones por score
```

### **🏥 Health & Monitoring**
```http
GET  /actuator/health   # Estado de la aplicación
GET  /actuator/info     # Información del sistema
```

***

## 👤 **Autor**

<div align="center">

### **Misael Challco**
*Estudiante de Ingeniería de Software | UTP*  
*Especialista en Sistemas Mainframe & Desarrollo Full Stack*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-mg.shields.io/badge/Email-D14836?style=for-the-badgeps://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor🎯 Experiencia:**  
Junior Programmer → Switch Analyst | COBOL/AS400 → Spring Boot  
**🚀 Visión:** Liderando la nueva generación de desarrolladores

</div>

---

<div align="center">

### **🌟 ¡Gracias por visitar DevPath!**

**Si este proyecto te ha sido útil, dale una ⭐ y compártelo con otros desarrolladores**

![Visitor Badge](https://visitor-badge.laobi.icu/badge?page_id=pisarana.Dev/github/stars/pisarana/DevPath-Proyecto?style=socialado con ❤️ para la comunidad de desarrolladores**

</div>

***

**🔄 Última actualización:** Septiembre 2025  
**📄 Licencia:** MIT  
**🏫 Universidad:** Universidad Tecnológica del Perú (UTP)  
**📚 Materia:** Marcos de Desarrollo Web