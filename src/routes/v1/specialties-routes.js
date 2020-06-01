const express = require('express');

const specialtiesController = require('../../controllers/v1/specialties-controller');

const router = express.Router();
/**
 * @swagger
 * /api/v1/specialties:
 *   get:
 *     tags:
 *       - Specialties
 *     description: get 10 Specialties
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name string
 *         in: query
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
router.get('/', specialtiesController.getSpecialties);
/**
 * @swagger
 * /api/v1/specialties:
 *   post:
 *     tags:
 *       - Specialties
 *     description: create a specialtiy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: specialtiy
 *         description: Specialtiy Model
 *         required: true
 *         in: body
 *     responses:
 *       200:
 *         description: Object {status , {Specialty}}.
 */
router.post('/', specialtiesController.createSpecialties);
/**
 * @swagger
 * /api/v1/specialties/{id}:
 *   get:
 *     tags:
 *       - Specialties
 *     description: get a Specialties for id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Object Mongo id
 *         in: path
 *     responses:
 *       200:
 *         description: Object {status , {Specialty}}.
 */
router.get('/:id', specialtiesController.getSpecialtiesForId);
/**
 * @swagger
 * /api/v1/specialties/{id}:
 *   put:
 *     tags:
 *       - Specialties
 *     description: Update Specialty
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
router.put('/:id', specialtiesController.updateSpecialties);
/**
 * @swagger
 * /api/v1/specialties/{id}:
 *   delete:
 *     tags:
 *       - Specialties
 *     description: Delete Specialty
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
router.delete('/:id', specialtiesController.deleteSpecialties);

module.exports = router;
