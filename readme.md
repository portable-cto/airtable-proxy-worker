# Airtable Proxy Cloudflare Worker

> A [Cloudflare Worker](http://developers.cloudflare.com/workers/) that allows you to make secure requests to the [Airtable API](https://airtable.com/api) from your frontend.

[![Travis Build Status](https://travis-ci.org/portable-cto/airtable-proxy-worker.png?branch=master)](https://travis-ci.org/portable-cto/rss-to-email)
[![Coverage Status](https://coveralls.io/repos/github/portable-cto/airtable-proxy-worker/badge.svg)](https://coveralls.io/github/portable-cto/airtable-proxy-worker)
[![GitHub stars](https://img.shields.io/github/stars/portable-cto/airtable-proxy-worker.svg?style=social&label=Stars)](https://github.com/portable-cto/airtable-proxy-worker)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![](https://i.imgur.com/QW0VWpG.png)


## Features

- Keep your Airtable Base ID and API Key secret while still allowing frontend apps to access data from Airtable's API.
- Limit requests to specific methods and tables. For example, using this library, you can make sure that public users can only make `GET` requests to your tables.
- Automatically build and push updates to your Cloudflare Worker using [Travis-CI](https://travis-ci.org/). 


## Usage

### Building Locally

The easiest way to see this project in action is to build your Worker locally and copy/paste it into Cloudflare's UI:

- Clone this repo.
- Install dependencies: `npm install`
- Build the worker with your Airtable Base ID and API Key: `AIRTABLE_API_BASE_ID=... AIRTABLE_API_KEY=... npm run build`

To preview your worker, upload the built `dist/worker.js` file to [cloudflareworkers.com](https://cloudflareworkers.com/) or your Cloudflare account.

### Automated Deployment

You can also use Travis to automatically deploy updates to your Worker. Just add the following environment variables to your Travis settings:

- `CLOUDFLARE_EMAIL`
- `CLOUDFLARE_AUTH_KEY`
- `CLOUDFLARE_ZONE_ID`
- `AIRTABLE_API_BASE_ID`
- `AIRTABLE_API_KEY`

The `deploy` block in the `.travis.yml` file will automatically update your worker in Cloudflare when the `master` branch is built using the script at `scripts/deploy`.

### Configuration

In addition to the required `AIRTABLE_API_KEY` and `AIRTABLE_API_BASE_ID` variables, you can also set the following configuration options as ENV vars:

- `AIRTABLE_API_URL` - Defaults to `https://api.airtable.com`.
- `AIRTABLE_API_VERSION` - Defaults to `v0`.
- `PREFIX` - Use this if your Cloudflare worker's routes are prefixed by something before the Airtable resource name. For example, you may want to call `mycustomdomain.com/api/posts` instead of `mycustomdomain.com/posts`. In this example, you would add `api` as a prefix.
- `ALLOWED_TARGETS` - Use this to lock down your Airtable API to specific resources and methods. For example, a stringified JSON object like this: `'[{"resource":"posts","method":"GET,PUT"},{"resource":"comments","method":"*"}]'` will allow `GET` and `PUT` requests on the `posts` resource and all request methods on the `comments` resource. Allows all methods for all resources by default.


## Contributing

Contributions are welcome and encouraged! When contributing to this repository, please first discuss the change you wish to make via the [issues on Github](https://github.com/portable-cto/airtable-proxy-worker/issues).

### Testing

Before you make a pull request, please add or update any relevant tests. You can run the test suite (uses [Jest](https://jestjs.io/)): `npm test:local`

Also run [Prettier](https://prettier.io/) to ensure that code styling is consistent: `npm run prettier`.

### Pull Request Process

1. Make sure tests are running and linting passes before you submit a PR.
2. Update any relevant parts of the documentation in the `readme.md` file.
3. Update the `changelog.md` file with any new updates, breaking changes, or important notes.
3. Run the build process to make sure it passes too: `npm run build`.
4. Include a link to any relevant issues in the PR on Github. If there are problems with your PR, we will discuss them in Github before merging.

### Releases

This library uses [semantic versioning](https://semver.org/) to inform users of breaking and non-breaking changes. When a new release is ready, the following steps will be taken:

- Make sure tests still pass: `npm test`.
- Run the release script: `npm version <SEMANTIC_VERSION> && git push --tags` with the release number you want to use.

This will create a new Tag in Github.


## License
 
The MIT License (MIT)

Copyright (c) 2018 Portable CTO, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
