#!/usr/bin/env bash
npm install;
npm install --prefix subjects/node;
mvn clean package -DskipTests -f subjects/java;
