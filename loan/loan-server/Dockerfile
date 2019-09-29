FROM openjdk:11-slim

WORKDIR /app
ADD build/libs/loan-server.jar loan.jar

EXPOSE 8080

CMD ["java", "-jar", "loan.jar"]