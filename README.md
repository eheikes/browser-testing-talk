# Automate Your Browser Testing

> End-to-end tests are an important part of a testing strategy and continuous integration. Find out how to automate your testing across multiple browsers on your machine and in the cloud.

This was a talk given at the [2016 Des Moines Web Geeks Social Event](http://www.dsmwebgeeks.com/2016/03/12/annual-social-event/).

The presentation is available pre-built in the [`dist` folder](dist/).

## Local Build

The presentation can be built and served locally using [Node.js](https://nodejs.org/) and [gulp](http://gulpjs.com/). To begin, `git clone` this repository and then run `npm install` at the command line (in the new folder).

The gulp tasks are:

* `gulp` or `gulp default` -- Compiles the presentation into the `dist` folder
* `gulp serve` -- Starts a local server at [http://localhost:8080](http://localhost:8080/) to serve the presentation
* `gulp test` -- Runs the example E2E tests
* `gulp deploy` -- Deploys the presentation to the Github Page
