const Providers = require('../../mongo/models/providers');
const GenerateQueryObject = require('../../utils/generateQueryObject');

const getProviders = async (req, res) => {
  try {
    const pageSize = parseInt(req.param.limit || 10, 10);
    const pageNumber = parseInt(req.param.page || 0, 10);

    const { page, limit, ...restQuery } = req.query;
    // Filter Configuration
    const extraQuerySelector = {
      firstName: {
        q: '$regex',
        callback: (value) => `${value}`,
        $options: 'i',
      },
      lastName: {
        q: '$regex',
        callback: (value) => `${value}`,
        $options: 'i',
      },
      middleName: {
        q: '$regex',
        callback: (value) => `${value}`,
        $options: 'i',
      },
      email: {
        q: '$eq',
        callback: (value) => `${value}`,
      },
      employerId: {
        q: '$eq',
        callback: (value) => `${value}`,
      },
    };

    const queryObject = GenerateQueryObject(restQuery, extraQuerySelector);

    const providers = await Providers.find(queryObject)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize);

    res.send({ status: 'OK', data: providers });
  } catch (e) {
    console.log('Error on get Collection of providers:', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

/**
 *  Retrieves a Provider by id.
 *  @async
 *  @method
 *  @param {string} id Provider identifier.
 *  @returns {JSON} Object [status , {Provider}].
 *  @throws {NotFoundError} When the Provider is not found.
 */
const getProvidersForId = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const providers = await Providers.findById(id);
    res.send({ status: 'OK', data: providers });
  } catch (e) {
    res.status(404).send({
      status: 'ERROR',
      message: 'Provider is not found.',
    });
  }
};

const createProviders = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      email,
      projectedStartDate,
      employerId,
      providerType,
      staffStatus,
      assignedTo,
      status,
      specialty,
      createdBy,
    } = req.body;

    // Validate Number employerId, assignedTo, createdBy
    const atributeValidate = {
      employerId,
      assignedTo,
      createdBy,
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

    if (errorNumeric.length > 0) {
      res.status(400).send({
        status: 'ERROR',
        message: `These fields must be numeric: 
          ${JSON.stringify(errorNumeric)}
          `,
      });
    } else if (!createdBy) {
      res.status(400).send({
        status: 'ERROR',
        message: "Error: Missing 'createdBy' parameter",
      });
    } else {
      const provider = await Providers.create({
        firstName,
        lastName,
        middleName,
        email,
        projectedStartDate,
        employerId,
        providerType,
        staffStatus,
        assignedTo,
        status,
        specialty,
        createdBy,
      });
      res.send({ status: 'OK', data: provider });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const updateProviders = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const {
      firstName,
      lastName,
      middleName,
      email,
      projectedStartDate,
      employerId,
      providerType,
      staffStatus,
      assignedTo,
      status,
      specialty,
      updatedBy,
    } = req.body;

    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
    } else if (!updatedBy) {
      res.status(400).send({
        status: 'ERROR',
        message: "Error: Missing 'updatedBy' parameter",
      });
    } else {
      await Providers.findByIdAndUpdate(id, {
        firstName,
        lastName,
        middleName,
        email,
        projectedStartDate,
        employerId,
        providerType,
        staffStatus,
        assignedTo,
        status,
        specialty,
        updatedBy,
      });
      res.send({
        status: 'OK',
        message: 'Success: Update Document Providers',
      });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};
const deleteProviders = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await Providers.findByIdAndDelete(id);
    res.send({
      status: 'OK',
      message: 'Success: Delete Document Providers',
    });
  } catch (e) {
    res.status(500).send({
      status: 'ERROR',
      message: 'Some error occurred while deleting the Providers',
    });
  }
};

module.exports = {
  getProviders,
  getProvidersForId,
  createProviders,
  updateProviders,
  deleteProviders,
};
