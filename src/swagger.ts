import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My APIs',
      version: '1.0.0',
      description: 'My Brand Apis',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJsDoc(options);

export default specs;
