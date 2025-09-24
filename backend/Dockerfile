# Multi-stage build: JDK para compilar, JRE para ejecutar
FROM eclipse-temurin:17-jdk AS builder

# Directorio de trabajo dentro del container
WORKDIR /app

# Copiar archivos del proyecto
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Dar permisos de ejecución al maven wrapper
RUN chmod +x ./mvnw

# Compilar la aplicación
RUN ./mvnw clean package -DskipTests

# Segunda etapa: Solo JRE para ejecutar (más liviano)
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copiar el JAR compilado de la etapa anterior
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exponer puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
