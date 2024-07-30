const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Your API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Thesis: {
          type: 'object',
          required: [
            'title',
            'university',
            'professor'
          ],
          properties: {
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            prerequisites: {
              type: 'string'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            university: {
              type: 'string'
            },
            professor: {
              type: 'string'
            },
            creator_student: {
              type: 'string'
            },
            creator_external: {
              type: 'string'
            },
            images: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js', './middleware/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/swagger.json', (req, res) => res.json(swaggerSpec));
};
