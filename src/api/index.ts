// Node Modules
import express from 'express';

// Importing the tenant route
import tenant from './tenant';

const router = express.Router();

// Consuming the tenant route
router.use('/find-tenant', tenant);

export default router;
