#!/bin/bash

mvn spring-boot:run \
    -Dspring-boot.run.arguments=--spring.data.mongodb.host=localhost,--spring.data.mongodb.port=27017,--spring.data.mongodb.database=poc
