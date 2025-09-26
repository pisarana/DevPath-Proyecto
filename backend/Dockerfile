# =============================================================================
# MULTI-STAGE BUILD: JDK para compilar, JRE para ejecutar (PRODUCCIÓN)
# =============================================================================

# PRIMERA ETAPA: BUILD
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# Copiar archivos Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Dar permisos de ejecución
RUN chmod +x ./mvnw

# Descargar dependencies primero (mejor caching)
RUN ./mvnw dependency:resolve

# Copiar código fuente
COPY src src

# Compilar aplicación (sin tests para producción)
RUN ./mvnw clean package -DskipTests

# =============================================================================
# SEGUNDA ETAPA: RUNTIME (SOLO JRE - MÁS LIVIANO)
# =============================================================================
FROM eclipse-temurin:17-jre

# Metadata
LABEL maintainer="Misael Challco <misaelchallco0@gmail.com>"
LABEL description="DevPath Backend - Learning Platform API"
LABEL version="1.0"

# Crear usuario no-root por seguridad
RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

WORKDIR /app

# Copiar JAR de la etapa de build
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exponer puerto
EXPOSE 8080

# Variables de entorno por defecto
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseContainerSupport"

# Health check (opcional pero recomendado)
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Comando de ejecución
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
