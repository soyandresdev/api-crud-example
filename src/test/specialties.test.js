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

describe('POST Create Specialties Endpoints ERROR createdBy String ', () => {
  it('should POST', async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      name: 'AAAA1',
      createdBy: '3838',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual('ERROR');
  });
});

describe('POST Create Specialties Endpoints ERROR Missing "name" ', () => {
  it('should POST', async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      createdBy: 3838,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual('ERROR');
    expect(res.body.message).toEqual(
      "Error: Missing 'Name' parameter is requered",
    );
  });
});

describe('PUT Specialties Endpoints', () => {
  let resC = {};
  beforeEach(async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      name: 'AAAA1',
      createdBy: 3838,
    });
    resC = res.body.data;
  });

  it('should PUT', async () => {
    const res = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .put(`/api/v1/specialties/${resC._id}`)
      .send({
        name: 'AAAA1',
        updatedBy: 3000,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});

describe('DELETE Specialties Endpoints', () => {
  let resC = {};
  beforeEach(async () => {
    const res = await request(app).post('/api/v1/specialties').send({
      name: 'AAAA1',
      createdBy: 3838,
    });
    resC = res.body.data;
  });
  it('should DELETE', async () => {
    const res = await request(app).delete(`/api/v1/specialties/${resC._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('OK');
  });
});
