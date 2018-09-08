# Airtable Proxy Cloudflare Worker

> A [Cloudflare Worker](http://developers.cloudflare.com/workers/) that allows you to make secure requests to the [Airtable API](https://airtable.com/api) from your frontend.

## Setup

### Building Locally

- Clone this repo.
- Install dependencies: `npm install`
- Build the worker with your Airtable Base ID and API Key: `AIRTABLE_API_BASE_ID=... AIRTABLE_API_KEY=... npm run build`

To preview your worker, upload the built `dist/worker.js` file to [cloudflareworkers.com](https://cloudflareworkers.com/) or your Cloudflare account.

### Configuration

In addition to the required `AIRTABLE_API_KEY` and `AIRTABLE_API_BASE_ID` variables, you can also set the following configuration options as ENV vars:

- `AIRTABLE_API_URL` - Defaults to `https://api.airtable.com`.
- `AIRTABLE_API_VERSION` - Defaults to `v0`.
- `PREFIX` - Use this if your Cloudflare worker's routes are prefixed by something before the Airtable resource name. For example, you may want to call `mycustomdomain.com/api/posts` instead of `mycustomdomain.com/posts`. In this example, you would add `api` as a prefix.
- `ALLOWED_TARGETS` - Use this to lock down your Airtable API to specific resources and methods. For example, a stringified JSON object like this: `'[{"resource":"posts","method":"GET,PUT"},{"resource":"comments","method":"*"}]'` will allow `GET` and `PUT` requests on the `posts` resource and all request methods on the `comments` resource. Allows all methods for all resources by default.

### Automated Deployment

You can use Travis to automatically deploy updates to your Worker. Just add the following environment variables to your Travis settings:

- `CLOUDFLARE_EMAIL`
- `CLOUDFLARE_AUTH_KEY`
- `CLOUDFLARE_ZONE_ID`
- `AIRTABLE_API_BASE_ID`
- `AIRTABLE_API_KEY`

The `deploy` block in the `.travis.yml` file will automatically update your worker in Cloudflare when the `master` branch is built using the script at `scripts/deploy`.


## Contributing

### Testing

Before you make a pull request, please add or update any relevant tests. You can run the test suite (uses [Jest](https://jestjs.io/)): `npm test`

Also run [Prettier](https://prettier.io/) to ensure that code styling is consistent: `npm run prettier`.


## License
 
The MIT License (MIT)

Copyright (c) 2018 Portable CTO, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
