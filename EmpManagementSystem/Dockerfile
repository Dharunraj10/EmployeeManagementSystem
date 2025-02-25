# Use official OpenJDK base image with Java 17
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml file
COPY ./mvnw ./mvnw
COPY ./pom.xml ./pom.xml

# Copy the whole project source
COPY ./src ./src

# Give execute permission to the wrapper
RUN chmod +x mvnw

# Run Maven build to package the application
RUN ./mvnw clean install -DskipTests

# Use a smaller base image to run the Java application
FROM openjdk:17-jre-slim

# Set the working directory for the app
WORKDIR /app

# Copy the JAR file built from the previous image
COPY --from=build /app/target/EmpManagementSystem-0.0.1-SNAPSHOT.jar /app/EmpManagementSystem.jar

# Expose port 8080 (default Spring Boot port)
EXPOSE 8080

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app/EmpManagementSystem.jar"]
