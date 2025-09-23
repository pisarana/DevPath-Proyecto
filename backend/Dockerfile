# Usar OpenJDK 17 como base
FROM openjdk:17-jdk-slim

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

# Exponer puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
