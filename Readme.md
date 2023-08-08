# Realtime Messager

## Description

This Webapp allow user to communicate with one user using websockets.
Two Users can send and receive text message in realtime.
All text messages should be save in a database to allow each User to read old conversation history.

From this app User could:
- Start or Resume a conversation with an other User
- Send and Receive realtime text messages with an other User
- Read old User text messages history saved from database

## Deployements

The application is deployed using docker and `docker-compose.yml` config file.

## Technologies

- Front-end webApp is written using Svelte framework, Sveltekit for SSR and Typescript
- Back-end service is written using Express with Typescript 
- Realtime messaging system is written socket.io
- The used DataBase system is MONGODB
- Git to version and publish your code with pull-requests
- Github actions to run ci/cd pipeline to check format code and linting
- Dockerfile to build image of your application
- docker compose to deploy your application using Dockerfile

## Documentations

[Svelte](https://svelte.dev)
[SvelteKit](https://kit.svelte.dev)
[LearnSvelte](https://learn.svelte.dev)




