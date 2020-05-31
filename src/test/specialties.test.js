const request = require('supertest');
const app = require('../server');

describe('Get Specialties Endpoints', () => {
  it('should get a Object with Status and Data', async () => {
    const res = await request(app).get('/api/v1/specialties').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('POST Create Specialties Endpoints', () => {
  it('should POST', async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      name: 'AAAA1',
      createdBy: 3838,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('PUT Specialties Endpoints', () => {
  let datacreate = {};
  beforeEach(async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      name: 'AAAA1',
      createdBy: 3838,
    });
    datacreate = res.body.data;
  });

  it('should PUT', async () => {
    const res = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/api/v1/specialties/${datacreate._id}`)
      .send({
        name: 'AAAA1',
        updatedBy: 3000,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('DELETE Specialties Endpoints', () => {
  let datacreate = {};
  beforeEach(async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      name: 'AAAA2',
      createdBy: 3838,
    });
    datacreate = res.body.data;
  });

  it('should PUT', async () => {
    const res = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/api/v1/specialties/${datacreate._id}`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});
