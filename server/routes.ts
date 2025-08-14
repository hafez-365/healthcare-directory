import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Hospital routes
  app.get("/api/hospitals", async (req, res) => {
    try {
      const hospitals = await storage.getHospitals();
      res.json(hospitals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hospitals" });
    }
  });

  app.get("/api/hospitals/:id", async (req, res) => {
    try {
      const hospital = await storage.getHospital(req.params.id);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      res.json(hospital);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hospital" });
    }
  });

  // Health Units routes
  app.get("/api/health-units", async (req, res) => {
    try {
      const healthUnits = await storage.getHealthUnits();
      res.json(healthUnits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch health units" });
    }
  });

  app.get("/api/health-units/:id", async (req, res) => {
    try {
      const healthUnit = await storage.getHealthUnit(req.params.id);
      if (!healthUnit) {
        return res.status(404).json({ message: "Health unit not found" });
      }
      res.json(healthUnit);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch health unit" });
    }
  });

  // Dialysis Centers routes
  app.get("/api/dialysis-centers", async (req, res) => {
    try {
      const dialysisCenters = await storage.getDialysisCenters();
      res.json(dialysisCenters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dialysis centers" });
    }
  });

  app.get("/api/dialysis-centers/:id", async (req, res) => {
    try {
      const dialysisCenter = await storage.getDialysisCenter(req.params.id);
      if (!dialysisCenter) {
        return res.status(404).json({ message: "Dialysis center not found" });
      }
      res.json(dialysisCenter);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dialysis center" });
    }
  });

  // Emergency Services routes
  app.get("/api/emergency-services", async (req, res) => {
    try {
      const emergencyServices = await storage.getEmergencyServices();
      res.json(emergencyServices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emergency services" });
    }
  });

  app.get("/api/emergency-services/:id", async (req, res) => {
    try {
      const emergencyService = await storage.getEmergencyService(req.params.id);
      if (!emergencyService) {
        return res.status(404).json({ message: "Emergency service not found" });
      }
      res.json(emergencyService);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emergency service" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
