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
      updatedBy,
    } = req.body;

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
      updatedBy,
    });
    res.send({ status: 'OK', data: provider });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const updateProviders = async (req, res) => {
  try {
    const products = await Providers.find({})
      .select('title desc price')
      .populate('user', 'username email data role');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('Error on get Collection of Providers:', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};
const deleteProviders = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new Error('Missing param id');
    }

    await Providers.findByIdAndDelete(id);
    res.send({ status: 'OK', message: 'Providers deleted' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

module.exports = {
  getProviders,
  getProvidersForId,
  createProviders,
  updateProviders,
  deleteProviders,
};

// {
//     "firstName" : "Andres",
//     "lastName" : "hernandez",
//     "middleName" : "QQ",
//     "email" : "andreshernandez@gmail.com",
// 		"projectedStartDate": "2020-05-31T00:29:13.498Z",
//     "employerId" : 805,
//     "providerType" : "MD",
//     "staffStatus" : "ASSOCIATE",
//     "assignedTo" : 54321,
//     "status" : "AWAITING_DECISION",
//     "specialty": ["59baf9b7c52f6a85ec5ff962"]
// }
