const mongoose = require('mongoose');
const Specialties = require('./specialties');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;
/**
 * @swagger
 *
 * definitions:
 *   Provider:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - email
 *       - projectedStartDate
 *       - specialty
 *     properties:
 *       firstName:
 *         type: string
 *         format: string
 *       lastName:
 *         type: string
 *         format: string
 *       middleName:
 *         type: string
 *         format: string
 *       email:
 *         type: string
 *         format: string
 *       projectedStartDate:
 *         type: Date
 *         format: Date
 *       employerId:
 *         type: number
 *         format: number
 *       providerType:
 *         type: string
 *         format: string
 *       assignedTo:
 *         type: number
 *         format: number
 *       status:
 *         type: string
 *         format: string
 *       createdBy:
 *         type: number
 *         format: number
 *       updatedBy:
 *         type: number
 *         format: number
 *       specialty:
 *         type: array
 *         format: Specialty
 */

const ProviderSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    email: {
      type: String,
      required: [true, 'Please enter Email Address'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        async validator(email) {
          const provider = await this.constructor.findOne({ email });
          if (provider) {
            if (this.id === provider.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: () => 'The specified email address is already in use.',
      },
    },
    projectedStartDate: { type: Date, required: true },
    statusProjected: { type: String },
    employerId: { type: Number },
    providerType: { type: String },
    staffStatus: { type: String },
    assignedTo: { type: Number },
    status: { type: String, default: 'AWAITING_CREDENTIALS' },
    createdBy: { type: Number },
    updatedBy: { type: Number },
    specialty: Specialties.schema,
  },
  {
    timestamps: true,
  },
);

ProviderSchema.path('email').validate((email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The email field cannot be empty or an invalid email');

ProviderSchema.pre('validate', function (next) {
  const providerType = [
    'APRN',
    'ARNP',
    'CNS',
    'CRNA',
    'DS',
    'DDS',
    'DMD‌‌',
    'DO',
    'DPM',
    'LCMFT',
    'LCMHC',
    'LCP',
    'LCPC',
    'MD',
    'NP',
    'PA',
  ];
  const hasProviderType = providerType.includes(this.providerType);
  if (hasProviderType) {
    next();
  }
  next(
    new Error(
      `Not a valid providerType: 
          ${JSON.stringify(providerType)}
          `,
    ),
  );
});
ProviderSchema.pre('validate', function (next) {
  const atributeValidate = {
    employerId: this.employerId,
    assignedTo: this.assignedTo,
  };
  const errorNumeric = Object.keys(atributeValidate).reduce(
    (act, itemValidate) => {
      if (typeof atributeValidate[itemValidate] !== 'number') {
        act.push(itemValidate);
      }
      return act;
    },
    [],
  );
  if (!errorNumeric.length) {
    next();
  }
  next(
    new Error(
      `These fields must be numeric: 
          ${JSON.stringify(errorNumeric)}
          `,
    ),
  );
});

ProviderSchema.pre('validate', function (next) {
  const staffStatus = [
    'ACTIVE',
    'AFFILIATE',
    'ASSOCIATE',
    'COMMUNITY',
    'CONSULTING',
    'COURTESY',
    'FACULTY',
    'HONORARY',
    'HOSPITALIST',
    'HOUSE_STAFF',
    'LOCUM_TENENS',
    'PROVISIONAL',
    'RESIDENT',
    'TEACHING',
  ];
  const hasStaffStatus = staffStatus.includes(this.staffStatus);
  if (hasStaffStatus) {
    next();
  }
  next(
    new Error(
      `Not a valid staffStatus: 
          ${JSON.stringify(staffStatus)}
          `,
    ),
  );
});

// If the employerId field is specified then assingedTo field should be specified too
ProviderSchema.pre('validate', function (next) {
  if (this.employerId) {
    if (this.employerId && this.assignedTo) next();
  }
  next(new Error("You need to specify 'assignedTo' too"));
});

ProviderSchema.pre('save', function (next) {
  const statusValidate = [
    'AWAITING_CREDENTIALS',
    'READY_FOR_REVIEW',
    'UNDER_REVIEW',
    'AWAITING_DECISION',
    'APPROVED',
    'DENIED',
  ];
  const hasStatus = statusValidate.includes(this.status);

  if (hasStatus) {
    next();
  }
  next(
    new Error(
      `Not a valid status: 
          ${JSON.stringify(statusValidate)}
          `,
    ),
  );
});

ProviderSchema.pre('save', function (next) {
  const isBefore = new Date(this.projectedStartDate) < new Date();
  this.statusProjected = isBefore ? 'DONE' : 'PENDING';
  next();
});

const model = mongoose.model('Provider', ProviderSchema);

module.exports = model;
