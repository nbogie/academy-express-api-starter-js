# Intermediate starter for express _javascript_ apps

This is an intermediate starter template for express apps written in JavaScript (not TypeScript).

It does not use express router, though you are free to make use of that.

## Change this README.md file!

If you have used this project as a template, remember to change this readme file to add your own documentation and remove anything you don't need.

## Read this first - check your formatters

Prior to making any changes to the files in this repo, we suggest you make sure your editor is set up correctly to format them the same way as they have been, previously.

1.  Install all the recommended vscode extensions.
1.  Run `yarn` to install prettier and eslint (among others).
1.  Make a tiny change to an ejs file [/views/pages/index.ejs](/views/pages/index.ejs) and confirm that the editor doesn't reformat the entire file differently when you save. (It _should_ be formatting on save\*, but the formatting rules used should match what has been used when making this project template).
1.  Do the same for a javascript file [/src/app.js](/src/app.js) - this should be formatted by prettier.

\* If you're curious what formatter settings have been adapted for this project, see [/.vscode/settings.json](/.vscode/settings.json):

-   prettier has been configured to be the default formatter for all files
-   but for "html" files (which as we'll see will include EJS files), the EJS-beautify extension will be used instead as an override to the above
-   "format on save" is enabled
-   ejs files are to be loaded in HTML-language mode (for better html autocompletion and syntax highlighting)

(Of course, you and any teammates are welcome to change the formatting of all files in what is now YOUR project! That will cause a some "noise" on your first save of each file.)

## Features

-   EJS template setup with express
-   Database support:

    -   connection-pool setup for [node-postgres](https://node-postgres.com/)
    -   loads DATABASE_URL from env variable. (And tries to load `.env` files with `dotenv`)

-   live-reload
-   automated testing with jest
    -   example jest test
-   formatting with prettier
-   linting with eslint
-   workflow config for CI on github (see [.github/workflows/ci-for-node.yaml](.github/workflows/ci-for-node.yaml) )
-   jsconfig.json (to enable vscode error-reporting in type-checked js files)
-   express-session (only with flaky in-memory support. not meant for production use, only development)
-   .gitignore
-   logging with [morgan](https://expressjs.com/en/resources/middleware/morgan.html)
-   demo of classless css framework ([sakura.css](https://oxal.org/projects/sakura/) or mvp.css, etc)
-   static file serving from `/public`
    -   favicon
-   TODO: error-handling

### note about live reload

In development mode, when viewing an html page, if a file is changed and saved, the browser will make the request again. This won't work if the browser is viewing a json output - it needs to be an html page so that live-reload can insert a javascript fragment into it.

## Installation

Install dependencies

`yarn`

## Configuration on dev machine

Copy `.env.example` to `.env` and set any variables there appropriately:

-   `DATABASE_URL` to your database's connection string.
-   `SESSION_SECRET` to a long very random string with no spaces, unique to your application.

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
