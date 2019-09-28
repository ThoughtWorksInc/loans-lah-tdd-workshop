FROM openjdk:11-slim

WORKDIR /app
ADD build/libs/credit-history-server.jar credit-history.jar

EXPOSE 8080

CMD ["java", "-jar", "credit-history.jar"]