import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { writeFileSync } from "node:fs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vendo Backend API",
      version: "1.0.0",
      description: "API documentation for the Vendo Backend project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/modules/**/*.router.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
