# Experiment: Mongo change event and SSE

This project aims to experiment on Mongo's _change event stream_ and SSE (Server Sent Event) to broadcast changes into database.

## Macro architecture

- Mongo DB server
  - replicat set is enabled in order to have oplog and allow change stream listener
- Node application _worker_
  - write new message into DB
- Applications _backend_ (_front-java_ or _front-node_)
  - register connected clients
  - open a SSE "channel" for each connected client
  - is notified by each new DB entry through change stream events and forward new message to each connected client
  - receive new message from client and write them to DB
- Frontend client
  - register to backend when initialising message list
  - retrieve from backend initial message list
  - send to backend new message
  - receive new messages saved into backend through SSE

## Setup

### With Docker

```sh
# node backend + react frontend
docker-compose -f docker-compose__node.yml up
# java backend + react frontend
docker-compose -f docker-compose__java.yml up
```

If you need to rebuild projects :

```sh
# node backend + react frontend
docker-compose -f docker-compose__node.yml up --build
# java backend + react frontend
docker-compose -f docker-compose__java.yml up --build
```

You can access:

- React front client on _localhost:3000_
- api on _localhost:3001_
- Angular front client on _localhost:3002_

### Without Docker

Docker is not required to develop nor test this project.
It is just easier to bootstrap a database for our demonstration.
Also, focus for this experiment is on application side.

#### Mongo

The system needs a Mongo instance with replica set enabled::

```sh
# as we need oplog to be available, we need to run a replica set
docker run -d -p 27017:27017 --name mongodb mongo:4.0.14 --replSet rs0
# the we need to initialize replica set
# connect to container instance
docker exec -it mongodb bash
# -> you're on container instance shell
mongo
# -> you're on container instance mongo shell
# initialize replica set
rs.initiate()
```

#### Applications

You can start each application thanks to the setup shell script contained in each folder (_node-front_, _node-worker_, _java-front_, _ui-react_): `start-with-env.sh`.
This shell script sets up environment variables and start the application.

UI can be started with classic _create-react-app_ workflow : `npm run start`.

## Documentation

- mongo change stream tutorial : https://www.mongodb.com/blog/post/five-minute-mongodb--change-streams-and-mongodb-4x
- mongo change stream doc : https://docs.mongodb.com/manual/changeStreams/
- SSE theory : https://javascript.info/server-sent-events
- SSE between express and react : https://alligator.io/nodejs/server-sent-events-build-realtime-app/
- mongo change stream with java : https://github.com/spring-projects/spring-data-mongodb/blob/master/src/main/asciidoc/reference/change-streams.adoc
- mongo db replica set : https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose

## Summary

- in order to access Mongo's change stream, we need to enable oplog, and so, we need to enable replica set
- replica set needs to be manually activated, what is done in this experiment is VERY dirty
- using Mongo's change stream is very easy with NodeJS or Java
- broadcasting through SSE is very easy from NodeJS or Java
- proxy (in our case Nginx) needs specific configuration to allow SSE pass through (enable HTTP1.1 for example)
- application stack is quite easy to set up once Mongo replica set is enabled

- Docker configuration was the hardest part
  - i'm quite a beginner with Docker
  - node application containers need database container to be up and running as replica set, it means, we need to wait for container to be up (managed thanks to Docker _depends_on_ in _docker-compose.yml_), then we need to wait for database to be up (thanks to _Docker-wait-for.sh_ script in each application container) and finally we need to wait for _replica set_ to be available (thanks to polling `rs.status()`with Mongo CLI from each application container)
