import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerName: text("referrer_name").notNull(),
  referrerEmail: text("referrer_email").notNull(),
  referralInfo: text("referral_info").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dynamicButtons = pgTable("dynamic_buttons", {
  id: serial("id").primaryKey(),
  number: text("number").notNull(),
  imageUrl: text("image_url").notNull(),
  link: text("link").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts);
export const insertReferralSchema = createInsertSchema(referrals);
export const insertDynamicButtonSchema = createInsertSchema(dynamicButtons).omit({ id: true, createdAt: true });