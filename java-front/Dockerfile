FROM maven:3.6.1-jdk-8-slim AS build
WORKDIR /usr/src/app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src src
RUN mvn package

FROM openjdk:8-jre-stretch

# Install Mongo CLI
RUN apt-get update
RUN apt-get install -y gnupg2
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv E52529D4
RUN echo "deb http://repo.mongodb.org/apt/debian "$(cat /etc/os-release | grep VERSION_CODENAME  | cut -d= -f2)"/mongodb-org/4.0 main" | tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install -y mongodb-org-shell

# Create app directory
WORKDIR /usr/src/app

# Install wait-for.sh
RUN apt-get install -y netcat
COPY Docker-wait-for.sh ./
RUN chmod +x ./Docker-wait-for.sh

# Install app
COPY --from=build /usr/src/app/target/*.jar ./app.jar

# Wait for mongo to be up and running as replica set
CMD ./Docker-wait-for.sh --timeout=30 $DATABASE_URL && mongo $DATABASE_URL --eval "while (true) { if (rs.status().ok) break; sleep(1000); }" && java -jar ./app.jar
