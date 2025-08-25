import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

export type DynamicButton = typeof dynamicButtons.$inferSelect;
export type InsertDynamicButton = typeof dynamicButtons.$inferInsert;

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertContactSchema = createInsertSchema(contacts);
export const selectContactSchema = createSelectSchema(contacts);

export const insertReferralSchema = createInsertSchema(referrals);
export const selectReferralSchema = createSelectSchema(referrals);

export const insertDynamicButtonSchema = createInsertSchema(dynamicButtons).omit({ id: true, createdAt: true });
export const selectDynamicButtonSchema = createSelectSchema(dynamicButtons);