const mongoose = require('mongoose');

/**
 * @swagger
 *
 * definitions:
 *   Specialty:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *       createdBy:
 *         type: number
 *         format: number
 *       updatedBy:
 *         type: number
 *         format: number
 */

const { Schema } = mongoose;

const SpecialtiesSchema = new Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: Number },
    updatedBy: { type: Number },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model('Specialties', SpecialtiesSchema);
module.exports.schema = SpecialtiesSchema;
module.exports = model;
