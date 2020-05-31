const Specialties = require('../../mongo/models/specialties');
const GenerateQueryObject = require('../../utils/generateQueryObject');

/**
 *  Retrieves the Specialties
 *  @async
 *  @method
 *  @query {name} filter with the value of the query
 *    the Specialties that coincide with the value.
 *  @query {createdBy} filter with the value of the query
 *    the Specialties that coincide with the value.
 *  @query {updatedBy} filter with the value of the query
 *    the Specialties that coincide with the value.
 *  @returns {JSON} Object {status , [{Specialty}]}.
 *  @throws {NotFoundError} When the server get error.
 */

const getSpecialties = async (req, res) => {
  try {
    const { page = 0, limit = 10, ...restQuery } = req.query;
    const pageSize = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);
    // Filter Configuration
    const extraQuerySelector = {
      name: {
        q: '$regex',
        callback: (value) => new RegExp(value),
        $options: 'i',
      },
      createdBy: {
        q: '$eq',
        callback: (value) => parseInt(value, 10),
      },
      updatedBy: {
        q: '$eq',
        callback: (value) => parseInt(value, 10),
      },
    };

    const queryObject = GenerateQueryObject(restQuery, extraQuerySelector);
    const specialties = await Specialties.find(queryObject)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize);

    res.send({ status: 'OK', data: specialties });
  } catch (e) {
    res
      .status(500)
      .send({ status: 'ERROR', data: 'Error retrieving Specialties' });
  }
};

/**
 *  Retrieves the Specialty
 *  @async
 *  @method
 *  @param {string} id Specialty identifier.
 *  @returns {JSON} Object {status , {Specialty}}.
 *  @throws {NotFoundError} When the Specialty is not found.
 *  @throws {ServerError} When we have an error on the server.
 */

const getSpecialtiesForId = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const specialties = await Specialties.findById(id);
    if (!specialties) {
      res.status(404).send({
        status: 'ERROR',
        message: `Cannot found Specialty  with id ${id}`,
      });
    } else {
      res.send({ status: 'OK', data: specialties });
    }
  } catch (e) {
    res.status(500).send({
      status: 'ERROR',
      message: 'Error retrieving Specialty',
    });
  }
};

/**
 *  Create the Specialty method
 *  @async
 *  @method
 *  @body {string} name - Name of the specificity that we are going to create .
 *  @body {number} createdBy - createdBy identifier of the created of specificity.
 *  @returns {JSON} Object {status , {Specialty}}.
 *  @throws {MissingBody} When body request is empty.
 *  @throws {MissingBodyName} When name is missing in body.
 *  @throws {ServerError} When we have an error on the server.
 */

const createSpecialties = async (req, res) => {
  try {
    const { name, createdBy } = req.body;

    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    if (!name) {
      res
        .status(400)
        .send({ message: "Error: Missing 'Name' parameter is requered" });
      return;
    }
    if (!createdBy) {
      res.status(400).send({
        status: 'ERROR',
        message: "Error: Missing 'createdBy' parameter",
      });
    } else {
      const specialty = await Specialties.create({
        name,
        createdBy,
      });
      res.send({ status: 'OK', data: specialty });
    }
  } catch (e) {
    res.status(500).send({
      status: 'ERROR',
      message: 'Some error occurred while creating the Specialty',
    });
  }
};

/**
 *  Update the Specialty method
 *  @async
 *  @method
 *  @body {string} _id - Mongo object to identify the Specialty.
 *  @body {string} name - Name of the specificity that we are going to create .
 *  @body {number} updatedBy - updatedBy identifier of the update of specificity.
 *  @returns {JSON} Object {status , message}.
 *  @throws {MissingBody} When body request is empty.
 *  @throws {MissingBodyUpdatedBy} When updatedBy is missing in body.
 *  @throws {ServerError} When we have an error on the server.
 */

const updateSpecialties = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const { name, updatedBy } = req.body;

    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    if (!updatedBy) {
      res.status(400).send({
        status: 'ERROR',
        message: "Error: Missing 'updatedBy' parameter",
      });
    } else {
      await Specialties.findByIdAndUpdate(id, {
        name,
        updatedBy,
      });
      res.send({
        status: 'OK',
        message: 'Success: Update Document Specialty',
      });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

/**
 *  Delete the Specialty method
 *  @async
 *  @method
 *  @body {string} _id - Mongo object to identify the Specialty.
 *  @returns {JSON} Object {status , message}.
 *  @throws {MissingBody} When body request is empty.
 *  @throws {MissingBodyND} When _id is missing in body.
 *  @throws {ServerError} When we have an error on the server.
 */

const deleteSpecialties = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await Specialties.findByIdAndDelete(id);
    res.send({
      status: 'OK',
      message: 'Success: Delete Document Specialty',
    });
  } catch (e) {
    res.status(500).send({
      status: 'ERROR',
      message: 'Some error occurred while deleting the Specialty',
    });
  }
};

module.exports = {
  getSpecialties,
  getSpecialtiesForId,
  createSpecialties,
  updateSpecialties,
  deleteSpecialties,
};

// {
//       name: 'Test',
//       createdBy: 4343,
//       updatedBy: 3443,
//     }

// Update
// {
//     "_id": "5ed30d1caceffca602fd65ad",
//     "name": "Test",
//     "createdBy": 345,
//     "createdAt": "2020-05-31T01:49:16.575Z",
//     "updatedAt": "2020-05-31T01:49:16.575Z",
//     "__v": 0
//   }
