# ct-azure-function-app-nodejs-starter

[![Build & Deploy](https://github.com/cu-cit-cloud-team/azure-function-app-nodejs-starter/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/cu-cit-cloud-team/azure-function-app-nodejs-starter/actions/workflows/build-and-deploy.yml)

Template repo for starting an Azure Function App with Node.js/TypeScript

## About

This template repo contains all the basics for starting a TypeScript Azure Function App project

### Requirements

- Node.js v24.x (with npm >= v11.x)
- Azure Subscription

#### Assumptions

- You are familiar with [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview) (including how to [create them](https://docs.microsoft.com/en-us/azure/azure-functions/functions-get-started?pivots=programming-language-javascript))

#### Good to know (but not necessary to use this template)

- [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates) - enabled via `./.github/dependabot.yml`
- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows) - enabled via `./.github/workflows/*.yml`

## What's Included

- Minimal Node.js/TypeScript Azure Function App with two example Azure Functions that can be used as starting points (or removed)
- GitHub Actions Workflow that can be configured and used to build and deploy the Function App
- Dependabot.yml configured to check daily for dependency updates
- Example `local.settings.json` (necessary to configure/run locally)
- Biome config for development
- Some VSCode related files for folks who use it (`./.vscode/`)

### Example Azure Functions

#### HTTP Trigger

- **Name:** `http-example`
- **Description:** example of proxying another API, returns JSON output
- **Demo:** <https://ct-az-function-app-nodejs-starter.azurewebsites.net/api/http-example>
  - source API attribution: <https://icanhazdadjoke.com/api>

#### Timer Trigger

- **Name:** `timer-example`
- **Description:** cron/scheduled example (console.logs some output every 6 hours)
- **Demo:** n/a (run locally or deploy to see output)

## Getting Started

1. In GitHub, [use this link](https://github.com/cu-cit-cloud-team/azure-function-app-nodejs-starter/generate) (or at the top of the repo click the `Use this template` button) to create a new repository under your namespace
    - **note:** you'll be required to give it a name, all other fields can be left alone)

### Local Development

1. Clone the new repo to your machine `git clone https://github.com/your-username/your-repo-name.git`
1. Enter directory `cd your-repo-name`
1. Install dependencies `npm install`
1. Setup `local.settings.json`
    - At minimum, make a copy of `example.local.settings.json` or Function App won't run locally
      - `cp example.local.settings.json local.settings.json`
    - **note:** once you have a Function App setup in Azure, you will want to fill in these values and add any additional you need
1. Run function app locally `npm run functions` or `npm run functions:verbose`

### Azure Deployment

#### General

Deployments can be configured however one typically deploys their Function Apps.

For convenience, this template includes a GitHub Action Workflow that (with minimal
configuration) can be setup and used to deploy your Function App to Azure.

#### Configuring Included Workflow for Deployments

1. Before continuing, you will need:
    - [ ] The name of the function app you have already created and will be deploying to
    - [ ] The publish profile for the function app you will be deploying to
1. Go to repo settings for [Actions secrets](https://github.com/cu-cit-cloud-team/azure-function-app-nodejs-starter/settings/secrets/actions)
   1. Click the `New repository secret` button
       - Name: `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`
       - Value: use the contents of the function app's publish profile
1. Go to repo settings for [Actions variables](https://github.com/cu-cit-cloud-team/azure-function-app-nodejs-starter/settings/variables/actions)
   1. Click the `New repository variable` button
       - Name: `NODE_VERSION`
       - Value: match the Node.js version your function app is configured to use (e.g. `24`)
1. Edit `./.github/workflows/build-and-deploy.yml`
    - change the value of `FUNCTION_APP_NAME` in the `env` block to match your function app's name
