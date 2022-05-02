# ct-azure-function-app-nodejs-starter

[![Build & Deploy](https://github.com/CU-CommunityApps/ct-azure-function-app-nodejs-starter/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/CU-CommunityApps/ct-azure-function-app-nodejs-starter/actions/workflows/build-and-deploy.yml)

Template repo for starting an Azure Function App with Node.js

:construction: Work and documentation in progress :construction:

## About

This template repo contains all the basics for starting a Node.js Azure Function App project

### Requirements

- Node.js v16.x (with npm >= v7.x)
- Azure Subscription

#### Assumptions

- You are familiar with [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview)
  - including how to [create them](https://docs.microsoft.com/en-us/azure/azure-functions/functions-get-started?pivots=programming-language-javascript)

#### Good to know (but not necessary to use this template)

- [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates) - enabled via `./.github/dependabot.yml`
- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows) - enabled via `./.github/workflows/*.yml`

## What's Included

- Minimal Node.js Azure Function App with two example Azure Functions that can be used as starting points (or removed)
- ESlint and Prettier configs for development
- GitHub Actions Workflow that can be configured and used to build and deploy the Function App
- Dependabot.yml configured to check daily for dependency updates
- Example `local.settings.json` (necessary to configure/run locally)
- Some VSCode related files for folks who use it (`./.vscode/`, `./jsconfig.json`)

Note that this project uses ESM so each Azure Function has an `.mjs` extension (vs `.js`)

### Example Azure Functions

#### HTTP Trigger

- **Name:** `http-example`
- **Description:** example of proxying another API, returns JSON output
- **Demo:** <https://ct-azure-function-app-nodejs-starter.azurewebsites.net/api/http-example>
  - source API attribution: <https://icanhazdadjoke.com/api>

#### Timer Trigger

- **Name:** `timer-example`
- **Description:** cron/scheduled example (console.logs some output every minute)
- **Demo:** n/a (run locally or deploy to see output)

## Getting Started

### Local Development

1. From GitHub, click the `Use this template` button to create a new repository under your namespace
    - **note:** you'll be required to give it a name, all other fields can be left alone)
1. Clone the new repo to your machine `git clone https://github.com/your-username/your-repo-name.git`
1. Enter directory `cd your-repo-name`
1. Install dependencies `npm install`
1. Setup `local.settings.json`
    - At minimum, make a copy of `example.local.settings.json` or Function App won't run locally
      - `cp example.local.settings.json local.settings.json`
    - **note:** once you have a Function App setup in Azure, you will want to fill in these values and add any additional you need
1. Run function app locally `npm run functions` or `npm run functions:verbose`

### Configure GH Action Workflow for Deployments

... WIP...
