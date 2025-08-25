import { Request, Response, Router } from "express";
import { insertContactSchema, insertReferralSchema, insertDynamicButtonSchema } from "../shared/schema";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

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

router.post("/api/buttons", upload.single('image'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    let imageUrl = '';
    
    if (req.file) {
      // Upload image to Cloudinary
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { 
              resource_type: 'image',
              folder: 'button-images' // Optional: organize images in folders
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.file!.buffer);
        });
        
        imageUrl = (uploadResult as any).secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    } else {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const buttonData = {
      number: req.body.number,
      imageUrl: imageUrl,
      link: req.body.link
    };
    
    const button = insertDynamicButtonSchema.parse(buttonData);
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