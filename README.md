# Singularity website
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)


<img src="/public/images/singularity-open-graph.jpg" alt="package graph image">

## Overview

This is the repo for the Singularity static microsite, (available at [singularity.storage](https://singularity.storage))

- This repo represents a static site which requires compilation, but can then be served as a static resource
- This site can be hosted on any resource supporting static files, but may include some services that require a serverless node
- The site itself is served statically, but internal navigation is virtualized in the browser: in other words, the site acts as an SPA when browsed on the client
- While a static site, this app can be extended at any time to a full application by changing the target in settings


## Stack

- Requires nodeJS and has been tested on node 16.18 (node 16.18+ required)
- Uses a Vue framework, [nuxtJS 3](https://nuxtjs.org/), deployed in static mode
- Styles are written in SCSS, and are concatenated and tree-shaken during compile-time


## Build

To build this site:
- Clone this repo
- Make sure Node.js 16 or newer is installed
  - A version 1 lockfile will not be compatible with this site, so npm 7 or higher must be used
- Configure a self-signed certificate for local HTTPS support (see next section)
- Install npm dependencies by running `npm ci`
- Then, either generate the static site, or run it in local development mode:
  - To build the static site
    - Run `npm run generate`
    - A directory `dist` is created, which contains the static site output
  - To run in local development mode, for features like hot reload:
    - Run `npm run dev`
    - The site will be available in real time via a localhost URL

### Generate a self-signed certificate

In order to browse with TLS locally, you'll need a certificate. A self-signed certificate is satisfactory for this purpose. Here's how to set one up.

Used for development in a local environment (such as on your personal computer). You only need to do this once. If you've already done this for a different project, just copy your existing `localhost_cert.pem` and `localhost_key.pem` files from `~/.ssh` into the root directory of this repo and skip the rest of this step.

- [Install mkcert and generate certificate](https://github.com/FiloSottile/mkcert) by running the commands below, in this order:
  ```zsh
  cd ~/.ssh
  brew install mkcert # replace with another package manager for linux distro
  brew install nss # need to install certutil before running `mkcert -install` so the CA can be automatically installed in Firefox

  # at this point, open any https website in Firefox before running the below commands

  mkcert -install
  mkcert -key-file localhost_key.pem -cert-file localhost_cert.pem localhost 127.0.0.1
  cat localhost_cert.pem > localhost_fullchain.pem
  cat "$(mkcert -CAROOT)/rootCA.pem" >> localhost_fullchain.pem
  ```
- Copy the new `localhost_cert.pem` and `localhost_key.pem` files to the root directory of this repo

The above tutorial is specifically for MacOS machines with `brew` installed. For other \*nix OS's replace the installation step with your preferred package manager (e.g. `apt install mkcert`).

### Environment variables

Add the following `.env` file to the repo root

```ini
NODE_ENV=stable
SERVER_ENV=development
AIRTABLE_SINGULARITY_ACCESS_TOKEN=<entry>

```

## Updating dependencies

Please use `npm ci` in place of `npm i` when not explicitly upgrading dependencies. `npm ci` will only install versions of packages provided in the lockfile, leading to more stability.

Always regression test the site if upgrading packages, as they may contain breaking changes.


## Commit Messages

Commit messages should use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format. `commitlint` has been installed to validate this usage. This means that all commits should be prefixed appropriately with a tag denoting the kind of code being committed.

- `feat:` A feature, or part of a feature
- `fix:` A bug fix
- `style:` A visual or stylistic change only
- `chore:` An operational task, such as routine maintenance, version control related operations, dependencies, etc.
- `refactor:` A change to the way the code is implemented, without materially changing the feature
- `perf:` A change that is made primarily to improve performance
- `test:` Any changes required to run a specific test or try out a behavior for the purposes of testing
- `cleanup:` Markup and syntactic cleanup that doesn't affect the code output
- `docs:` Documentation-related changes
- `content:` Changes to the project's content, such as copy or media


## Storybook

> Note: Storybook is currently disabled, disregard this section

To better display the components available on the site, their properties, and the states they might appear in, a Storybook app is included in this repo.

- Each component that's developed must have its own story
- Use `npm run storybook` to run Storybook locally
- Or `npm run storybook-build` to generate a static Storybook UI website
- Storybook automatically deploys to [https://agency-undone.github.io/nuxt-static](https://agency-undone.github.io/nuxt-static) using Github pages. The static build is stored in `docs` branch under `docs` folder


## Style guide

1. All file names will be in `kebab-case`
2. All component names on import will be `PascalCase`
3. The grid used is a flexbox style system called [Gridlex](https://gridlex.devlint.fr/), its documentation is also available as a [readme in this repo](packages/site/assets/scss/grid/README.md)
4. Color name variables in `SCSS` are obtained from [this resource](https://chir.ag/projects/name-that-color/)


## [Release Please](https://github.com/googleapis/release-please)

- Release Please automates CHANGELOG generation, the creation of GitHub releases, and version bumps for your projects.
- It is currently setup as a github action in this repo
- See [documentation](https://github.com/googleapis/release-please) on how to use
