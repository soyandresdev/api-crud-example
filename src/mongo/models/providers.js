const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const ProviderSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    email: { type: String, required: true, unique: true },
    projectedStartDate: { type: Date, required: true },
    employerId: { type: Number },
    providerType: { type: String },
    staffStatus: { type: String },
    assignedTo: { type: Number },
    status: { type: String },
    createdBy: { type: Number },
    updatedBy: { type: Number },
    specialty: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialties',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model('Provider', ProviderSchema);

module.exports = model;
