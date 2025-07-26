import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertReferralSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Referral form submission
  app.post("/api/referral", async (req, res) => {
    try {
      const validatedData = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral(validatedData);
      res.json({ success: true, referral });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit referral form" 
        });
      }
    }
  });

  // Get contacts (admin)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get contacts" });
    }
  });

  // Get referrals (admin)
  app.get("/api/referrals", async (req, res) => {
    try {
      const referrals = await storage.getReferrals();
      res.json(referrals);
    } catch (error) {
      res.status(500).json({ message: "Failed to get referrals" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
