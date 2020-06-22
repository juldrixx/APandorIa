require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const API = require('./src');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'APandorIa',
      description: 'API Rest for Pandoria.',
      contact: {
        name: 'Julien G.'
      },
    },
    servers: [{ url: '/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ["src/index.js", "src/js/routes/*.route.js", "src/js/routes/*/*.route.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api', API);
app.use('/', express.static('public'));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});