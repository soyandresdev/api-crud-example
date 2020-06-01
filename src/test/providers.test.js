const request = require('supertest');
const app = require('../server');

describe('Get Providers Endpoints', () => {
  it('should get a Object with Status and Data', async () => {
    const res = await request(app).get('/api/v1/providers').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('POST Create Providers Endpoints', () => {
  it('should POST', async () => {
    const res = await request(app)
      .post('/api/v1/providers')
      .send({
        firstName: 'Andres',
        lastName: 'hernandez',
        middleName: 'QQ',
        email: `${Math.random()}sddsdd${Math.random()}@gmail.com`,
        projectedStartDate: '2020-05-31T00:29:13.498Z',
        employerId: 805,
        providerType: 'MD',
        staffStatus: 'ASSOCIATE',
        assignedTo: 54321,
        specialty: {
          _id: '59baf9b7c52f6a85ec5ff962',
          name: 'Adolescent Medicine',
          createdBy: 3838,
          createdAt: '2017-02-28T05:07:45.536Z',
          updatedBy: 82768,
          updatedAt: '2017-09-14T05:56:20.918Z',
        },
        createdBy: 23424,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('PUT Create Providers Endpoints', () => {
  let resC = {};
  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/providers')
      .send({
        firstName: 'Andres',
        lastName: 'hernandez',
        middleName: 'QQ',
        email: `${Math.random()}sddsdd${Math.random()}@gmail.com`,
        projectedStartDate: '2020-05-31T00:29:13.498Z',
        employerId: 805,
        providerType: 'MD',
        staffStatus: 'ASSOCIATE',
        assignedTo: 54321,
        specialty: {
          _id: '59baf9b7c52f6a85ec5ff962',
          name: 'Adolescent Medicine',
          createdBy: 3838,
          createdAt: '2017-02-28T05:07:45.536Z',
          updatedBy: 82768,
          updatedAt: '2017-09-14T05:56:20.918Z',
        },
        createdBy: 23424,
      });
    resC = res.body.data;
  });
  it('should PUT', async () => {
    const res = await request(app).put(`/api/v1/specialties/${resC._id}`).send({
      firstName: 'Andres',
      lastName: 'hernandez',
      middleName: 'QQ',
      assignedTo: 54321,
      updatedBy: 23424,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('DELETE Create Providers Endpoints', () => {
  let resC = {};
  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/providers')
      .send({
        firstName: 'Andres',
        lastName: 'hernandez',
        middleName: 'QQ',
        email: `${Math.random()}sddsdd${Math.random()}@gmail.com`,
        projectedStartDate: '2020-05-31T00:29:13.498Z',
        employerId: 805,
        providerType: 'MD',
        staffStatus: 'ASSOCIATE',
        assignedTo: 54321,
        specialty: {
          _id: '59baf9b7c52f6a85ec5ff962',
          name: 'Adolescent Medicine',
          createdBy: 3838,
          createdAt: '2017-02-28T05:07:45.536Z',
          updatedBy: 82768,
          updatedAt: '2017-09-14T05:56:20.918Z',
        },
        createdBy: 23424,
      });
    resC = res.body.data;
  });
  it('should DELETE', async () => {
    const res = await request(app).delete(`/api/v1/specialties/${resC._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});
