const express = require('express');

const providersController = require('../../controllers/v1/providers-controller');

const router = express.Router();
/**
 * @swagger
 * /api/v1/providers:
 *   get:
 *     tags:
 *       - Providers
 *     description: get 10 providers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: providers
 *         description: Providers Model
 *         required: true
 *         in: body
 *       - name: limit
 *         description: Quantity of item to bring
 *         in: query
 *       - name: page
 *         description: Page that we are going to bring
 *         in: query
 *     responses:
 *       200:
 *         description: response 10 Specialties
 */
router.get('/', providersController.getProviders);
/**
 * @swagger
 * /api/v1/providers:
 *   post:
 *     tags:
 *       - Providers
 *     description: create a Provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Providers
 *         description: Providers Model
 *         required: true
 *         in: body
 *     responses:
 *       200:
 *         description: Object {status , {Providers}}.
 */
router.post('/', providersController.createProviders);
/**
 * @swagger
 * /api/v1/providers/{id}:
 *   get:
 *     tags:
 *       - Providers
 *     description: get a Provider for id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Object Mongo id
 *         in: path
 *     responses:
 *       200:
 *         description: Object {status , {Provider}}.
 */
router.get('/:id', providersController.getProvidersForId);
/**
 * @swagger
 * /api/v1/providers/{id}:
 *   put:
 *     tags:
 *       - Providers
 *     description: Update Provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Object Mongo id
 *         in: path
 *       - name: Specialty
 *         description: Specialty Object Model
 *         in: body
 *     responses:
 *       200:
 *         description: Object {status , message}.
 */
router.put('/:id', providersController.updateProviders);
/**
 * @swagger
 * /api/v1/providers/{id}:
 *   delete:
 *     tags:
 *       - Providers
 *     description: Delete Provider
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Object Mongo id
 *         in: path
 *     responses:
 *       200:
 *         description: Object {status , message}.
 */
router.delete('/:id', providersController.deleteProviders);

module.exports = router;
