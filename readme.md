Airtable Proxy Worker
====

> A [Cloudflare Worker](http://developers.cloudflare.com/workers/) that allows you to make secure requests to the [Airtable API]() from your frontend.

### Instructions

- `npm install`
- `npm run build`

To preview your worker, upload the built `dist/worker.js` file to [cloudflareworkers.com](https://cloudflareworkers.com/).

### Automated Deployment

You can use Travis to automatically deploy updates to your Worker. Just add the following environment variables to your Travis settings:

- `CLOUDFLARE_EMAIL`
- `CLOUDFLARE_AUTH_KEY`
- `CLOUDFLARE_ZONE_ID`

The `deploy` block in the `.travis.yml` file will automatically update your worker in Cloudflare when the `master` branch is built using the script at `scripts/deploy`.
