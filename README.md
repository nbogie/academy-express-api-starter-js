# Intermediate starter for express _javascript_ apps

This is an intermediate starter template for express apps written in JavaScript (not TypeScript).

It does not use express router.

## Change this README.md file!

If you have used this project as a template, remember to change this readme file to add your own documentation and remove anything you don't need.

## Features

-   EJS template setup with express
-   Database support:
    -   connection-pool setup for node-postgres
    -   loads DATABASE_URL from env variable. (And tries to load .env files with dotenv)
-   live-reload
-   automated testing with jest
    -   example jest test
-   formatting with prettier
-   linting with eslint
-   workflow config for CI on github (see [.github/workflows/ci-for-node.yaml](.github/workflows/ci-for-node.yaml) )
-   .gitignore
-   demo of classless css framework (sakura.css or mvp.css, etc)
-   static file serving from `/public`
    -   favicon

### note about live reload

In development mode, when viewing an html page, if a file is changed and saved, the browser will make the request again. This won't work if the browser is viewing a json output - it needs to be an html page so that live-reload can insert a javascript fragment into it.

## Installation

Install dependencies

`yarn`

## Configuration on dev machine

Copy `.env.example` to `.env` and set `DATABASE_URL` to your database's connection string.

## Running

Run (in dev mode with live-reload):

`yarn start:dev`

Run (for production with no live-reload)

`yarn start`
