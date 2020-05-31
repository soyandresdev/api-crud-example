const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routesV1 = require('./routes/v1');

const app = express();

app.set('port', process.env.PORT || 4000);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

// Swagger Config
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'API',
      description: 'API Information',
      contact: {
        name: 'Andres Hernandez',
      },
      servers: [`http://localhost:${process.env.PORT}`],
    },
  },
  apis: ['src/routes/v1/*.js', 'src/mongo/models/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Swagger Config END

module.exports = app;
