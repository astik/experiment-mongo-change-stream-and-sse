# ACEM - POC

## TLDR

- Mongo DB server
  - replicat set is enabled in order to have oplog and allow change stream listener
- Node application _worker_
  - write new message into DB
- Node application _front_
  - register connected clients
  - open a SSE "channel" for each connected client
  - is notified by each new DB entry through change stream events and forward new message to each connected client
  - receive new message from client and write them to DB
- Frontend client
  - register to backend when initialising message list
  - retrieve from backend initial message list
  - send to backend new message
  - receive new messages saved into backend through SSE

## Prérequisite

### Mongo

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

### Application

You can start each application thanks to the setup shell script contain in each folder (_front_, _worker_, _ui-react_).

A docker alternative is available to quickly test the system:

```sh
docker-compose up
```

If you need to rebuild projects :

```sh
docker-compose up --build
```

## Development

Each project has a shell script which setup environment variable for application configuration and start the application.

Docker is not required to develop nor test this project.
It is just easier to bootstrap for non technical profiles =)

## Documentation

- mongo change stream tutorial : https://www.mongodb.com/blog/post/five-minute-mongodb--change-streams-and-mongodb-4x
- mongo change stream doc : https://docs.mongodb.com/manual/changeStreams/
- SSE theory : https://javascript.info/server-sent-events
- SSE between express and react : https://alligator.io/nodejs/server-sent-events-build-realtime-app/
- mongo change stream with java : https://github.com/spring-projects/spring-data-mongodb/blob/master/src/main/asciidoc/reference/change-streams.adoc
- mongo db replica set : https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose
