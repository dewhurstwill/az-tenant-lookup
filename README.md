# Azure Tenant ID Lookup

Ever needed to get the tenantId based on the Azure AD domain? This API makes that a simple task.

## Basic/Dev Use

1. Run `npm run start:dev`
2. Navigate to `http://localhost/find-tenant/by-domain/your_domain`

## Running Tests

1. Run `npm run test`

## Prod Use

1. Run `npm run build`
2. (Optional) Set the PORT environment variable to a different port, defaults to 80
3. Serve the code `npm run start`

<br/>

If you like frontend challenges try creating something like [this](https://www.whatismytenantid.com/) using this API
