# ct-azure-function-app-nodejs-starter

[![Build & Deploy](https://github.com/CU-CommunityApps/ct-azure-function-app-nodejs-starter/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/CU-CommunityApps/ct-azure-function-app-nodejs-starter/actions/workflows/build-and-deploy.yml)

Template repo for starting an Azure Function App with Node.js

:construction: Work and documentation in progress :construction:

## About

This template repo contains all the basics for starting a Node.js Azure Function App project.

### Assumptions

- you have an [Azure Subscription](https://azure.microsoft.com/free/) to work with
- you are familiar with [Node.js](https://nodejs.org/en/about/)
- you are familiar with [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
  - including how to [create them](https://docs.microsoft.com/en-us/azure/azure-functions/functions-get-started?pivots=programming-language-javascript)

### Good to know (but not necessary to use this template)

- [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates) - enabled via `./.github/dependabot.yml`
- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows) - enabled via `./.github/workflows/*.yml`

## What's Included

- Minimal Node.js Azure Function App with two example Azure Functions that can be used as starting points (or removed)
- ESlint and Prettier configs for development
- GitHub Actions Workflow that can be configured and used to build and deploy the Function App
- Dependabot.yml configured to check daily for dependency updates
- Example `local.settings.json` (necessary to run locally)
- Some VSCode related files for folks who use it (`./.vscode/`, `./jsconfig.json`)

Note that this project uses ESM so each Azure Function has an `.mjs` extension (vs `.js`)

### Example Azure Functions

#### HTTP Trigger

- name: `http-example`
- about: example of proxying another API, returns JSON output
- demo: <https://ct-azure-function-app-nodejs-starter.azurewebsites.net/api/http-example>
  - source API: <https://icanhazdadjoke.com/api>

#### Timer Trigger

- name: `timer-example`
- about: example using a cron (just console.logs every minute)
- demo: n/a

## Getting Started

... WIP ...
