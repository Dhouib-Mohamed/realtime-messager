# CIRIS Technic test

This test has no time limit but you will be evaluate from your work and your publish time.
You have to use git and your best practices to resolve this test.

You can start and pause when ever you want.
When you start, pause or finish your test, please git commit message to indicate you're started, paused or finished your test.

If you have one or multitple ideas to evolve your project, be creative !
Have fun and good luck !

## Description

You in charge to develop a realtime text messager app.
This Webapp allow user to communicate with one user using websockets.
Two Users can send and receive text message in realtime.
All text messages should be save in a database to allow each User to read old conversation history.

From this app User could:
- Start or Resume a conversation with an other User
- Send and Receive realtime text messages with an other User
- Read old User text messages history saved from database

You have to split front-end and back-end service:
- One web front-end client to handle application
- One REST-API to handle readtime messages and old text messages with database connection

## Deployements

You have to deploy your application using docker and `docker-compose.yml` config file.

For example if we run `docker compose up` it should start one webclient app container and one rest-api container as production.

## Requirements

- Front-end webApp is written using Svelte framework, Sveltekit for SSR and Typescript
- Back-end service is written using .NET core app OR Node.js with Typescript 
- Realtime messaging system is written using native websocket or library (socket.io, etc...)
- You can use any DataBase system you want (SQL-LITE, MONGODB, etc...)
- Use Git to version and publish your code with pull-requests
- Use Github actions to run ci/cd pipeline to check format code and linting
- Use Dockerfile to build image of your application
- Use docker compose to deploy your application using Dockerfile

## Begin, finish and publish

1. When you start you project, please git commit with one message to indicate you started.
2. When you finish you test, please git commit with one message to indicate you finised your test.
3. When you finish you test, push your code to a new private github repository and add Github User `lloyet` to your repository to allow review.

## ETA

Average estimated time to code this application should be 2 days, but depends on your own practices and knowleges.
Remember you can pause and restart this technical test severals times before validate and posting it.

## Documentations

[Svelte](https://svelte.dev)
[SvelteKit](https://kit.svelte.dev)
[LearnSvelte](https://learn.svelte.dev)




