// Node modules
import express from 'express';
import axios from 'axios';

// Types
import { ParsedEndpoint } from '../types';

// Helpers
import {  
  addItemToCache, 
  checkCache, 
  checkCacheById,
  parseTokenEndpoint
} from '../helpers';

const router = express.Router(); 

router.get('/by-domain/:tenantName', async (req, res) => {
  const { tenantName } = req.params;

  const cache = await checkCache(tenantName);
  if (cache) {
    const { tenantId, tenantRegion } = cache;
    return res.json({
      statusCode: 200,
      statusMessage: 'Success',
      data: {
        tenantId,
        tenantRegion
      }
    });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `https://login.microsoftonline.com/${tenantName}/.well-known/openid-configuration`,
      validateStatus: function (status) {
        return status < 500;
      }
    });
    
    if (response.data && ('error' in response.data || 'error_description' in response.data)) {
      if (response.data.error === 'invalid_tenant') return res.status(404).json({
        statusCode: 404,
        statusMessage: 'Failed',
        data: {
          errorMessage: 'Tenant not found',
          invalidTenant: tenantName
        }
      });
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Failed',
        data: {
          error: response.data
        }
      })
    }
    
    if ('token_endpoint' in response.data) {
      const parsedEndpoint: ParsedEndpoint = parseTokenEndpoint(response.data.token_endpoint);
      if (!parsedEndpoint.status) return res.json({
        statusCode: 404,
        statusMessage: 'Failed',
        data: {
          errorMessage: parsedEndpoint.errorMessage,
          invalidTenant: tenantName
        }
      });

      await addItemToCache(
        tenantName,
        parsedEndpoint.tenantId,
        response.data.tenant_region_scope
      );

      return res.json({
        statusCode: 200,
        statusMessage: 'Success',
        data: {
          tenantId: parsedEndpoint.tenantId,
          tenantRegion: response.data.tenant_region_scope
        }
      });
    } 
  } catch(err) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: 'Service Unavailable',
      data: {}
    });
  }
});

export default router;