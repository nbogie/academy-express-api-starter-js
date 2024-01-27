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
-   jsconfig.json (to enable vscode error-reporting in type-checked js files)
-   express-session (only with flaky in-memory support. not meant for production use, only development)
-   .gitignore
-   demo of classless css framework (sakura.css or mvp.css, etc)
-   static file serving from `/public`
    -   favicon
-   TODO: node debugger launcher

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

## Running tests

`yarn test`

## Linting

`yarn lint`

## Formatting with prettier

`yarn format`

However, it is suggested you install vscode's prettier extension and enable the user setting `format on save`. When formatting, VSCode will notice the .prettierrc and format according to those rules (and prettier's defaults).

## CI (linting, formatting check, automated tests)

This project includes a workflow file in [.github](.github) which will cause CI to run on github.

## Debugging with vscode

Set a breakpoint in the margin of any JS file, and use run-and-debug (ctrl-shift-d)'s `Run and Debug` button to start express. Bear in mind that a breakpoint set in a request handler won't cause express to pause until a matching request comes in!

## Getting started coding

-   [Flavio Copes' Express Handbook](https://www.freecodecamp.org/news/the-express-handbook/)
