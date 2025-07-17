# Utilise l'image OpenJDK 17 officielle
FROM openjdk:17

#EXPOSE 8080

# Ajoute le JAR compilé dans l'image
COPY target/students-0.0.1-SNAPSHOT.jar students.jar

# Définit le point d'entrée
ENTRYPOINT ["java", "-jar", "/students.jar"]
