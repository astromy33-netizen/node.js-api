const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "React Pizza API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [{ url: "http://localhost:3000" }],

    // ✅ JWT Bearer auth
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [path.join(__dirname, "routes/**/*.js")],
};

module.exports = swaggerJsdoc(options);
