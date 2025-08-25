import { Request, Response, Router } from "express";
import { insertContactSchema, insertReferralSchema, insertDynamicButtonSchema } from "../shared/schema";
import { storage } from "./storage";
import { z } from "zod";

const router = Router();

// Contact route
router.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const contact = insertContactSchema.parse(req.body);
    const result = await storage.createContact(contact);
    res.json({ success: true, contact: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid input", details: error.errors });
    } else {
      console.error("Contact creation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Referral route
router.post("/api/referral", async (req: Request, res: Response) => {
  try {
    const referral = insertReferralSchema.parse(req.body);
    const result = await storage.createReferral(referral);
    res.json({ success: true, referral: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid input", details: error.errors });
    } else {
      console.error("Referral creation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Dynamic button routes
router.get("/api/buttons", async (req: Request, res: Response) => {
  try {
    const buttons = await storage.getDynamicButtons();
    res.json({ buttons });
  } catch (error) {
    console.error("Get buttons error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/buttons", async (req: Request, res: Response) => {
  try {
    const button = insertDynamicButtonSchema.parse(req.body);
    const result = await storage.createDynamicButton(button);
    res.json({ success: true, button: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid input", details: error.errors });
    } else {
      console.error("Button creation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.delete("/api/buttons/:number", async (req: Request, res: Response) => {
  try {
    const { number } = req.params;
    const success = await storage.deleteDynamicButton(number);
    if (success) {
      res.json({ success: true, message: "Button deleted" });
    } else {
      res.status(404).json({ error: "Button not found" });
    }
  } catch (error) {
    console.error("Button deletion error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;