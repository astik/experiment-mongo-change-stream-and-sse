FROM node:12

# Install Mongo CLI
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv E52529D4
RUN echo "deb http://repo.mongodb.org/apt/debian "$(cat /etc/os-release | grep VERSION_CODENAME  | cut -d= -f2)"/mongodb-org/4.0 main" | tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install mongodb-org-shell

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

COPY .babelrc ./
COPY src src/

# Wait for mongo to be running as replica set (we should also test if mongo is running (wait-for script ?))
# CMD sleep 5 && mongo $DATABASE_URL -u $DATABASE_USERNAME -p $DATABASE_PASSWORD --eval "while (true) { if (rs.initiate().ok || rs.status().ok) break; sleep(1000); }" && npm run start
CMD sleep 10 && mongo $DATABASE_URL --eval "while (true) { if (rs.initiate().ok || rs.status().ok) break; sleep(1000); }" && npm run start
