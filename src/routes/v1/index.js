const providersRoutes = require('./providers-routes');
const specialtiesRoutes = require('./specialties-routes');

module.exports = (app) => {
  app.use('/api/v1/specialties', specialtiesRoutes);
  app.use('/api/v1/providers', providersRoutes);
};
