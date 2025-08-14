import express from "express";
import { registerRoutes } from "../server/routes";

// Create an Express app for the Serverless Function
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes from the existing server code
// Note: registerRoutes creates an HTTP server instance, but does not listen.
// In serverless, that's fine — we just ignore the returned server.
registerRoutes(app).catch((err) => {
  console.error("Failed to register routes:", err);
});

// Vercel Node functions can export a default handler or an Express app.
// Exporting the Express app lets Vercel handle requests via the app.
export default app;
