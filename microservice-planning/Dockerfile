# Utilise l'image OpenJDK 17 officielle
FROM openjdk:21

#EXPOSE 8081

# Ajoute le JAR compilé dans l'image
COPY target/attendance-0.0.1-SNAPSHOT.jar attendance.jar

# Définit le point d'entrée
ENTRYPOINT ["java", "-jar", "/attendance.jar"]
