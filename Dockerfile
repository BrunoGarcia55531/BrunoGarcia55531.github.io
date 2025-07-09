# Usa una imagen base de Java
FROM openjdk:17-jdk-slim

# Crea un directorio en el contenedor
WORKDIR /app

# Copia el JAR generado al contenedor
COPY target/smartcompare-backend-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto donde corre tu app (ajusta si es otro)
EXPOSE 8080

# Comando para iniciar la app
ENTRYPOINT ["java", "-jar", "app.jar"]

