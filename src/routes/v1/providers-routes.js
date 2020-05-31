const express = require('express');

const providersController = require('../../controllers/v1/providers-controller');

const router = express.Router();

router.get('/', providersController.getProviders);
router.get('/:id', providersController.getProvidersForId);
router.post('/create', providersController.createProviders);
router.post('/update', providersController.updateProviders);
router.post('/delete', providersController.deleteProviders);

module.exports = router;
