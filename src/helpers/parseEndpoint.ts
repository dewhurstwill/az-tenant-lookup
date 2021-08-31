import { isUuid } from '../helpers';

export function parseTokenEndpoint(tokenEndpoint) {
  if (!tokenEndpoint.startsWith('https://login.microsoftonline.com/')) return {
    status: false,
    errorMessage: `Invalid token endpoint URL: ${tokenEndpoint}`,
    tenantId: null
  }

  const parsedEndpoint = tokenEndpoint.split('/');
  const tenantId = parsedEndpoint[3];
  
  const isTenantIdUuid: boolean = isUuid(tenantId);
  if (!isTenantIdUuid) return {
    status: false,
    errorMessage: `Invalid tenantId [Not a UUID]: ${tenantId}`,
    tenantId: null
  }

  return {
    status: true,
    message: 'Tenant ID Found',
    tenantId
  }
};