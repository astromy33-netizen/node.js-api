const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000; // ← КРИТИЧНО! Render передаёт PORT через env

const routes = require("./routes"); // это src/routes/index.js

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    docExpansion: "none",
    filter: true,
    persistAuthorization: true
  }
}));

// ← ВАЖНО! Слушаем на 0.0.0.0, чтобы Render мог подключиться
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});

module.exports = app;