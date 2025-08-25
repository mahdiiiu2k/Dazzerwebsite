import { users, contacts, referrals, dynamicButtons, type User, type InsertUser, type Contact, type InsertContact, type Referral, type InsertReferral, type DynamicButton, type InsertDynamicButton } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;

  // Contact methods
  createContact(insertContact: InsertContact): Promise<Contact>;
  
  // Referral methods
  createReferral(insertReferral: InsertReferral): Promise<Referral>;
  
  // Dynamic Button methods
  getDynamicButtons(): Promise<DynamicButton[]>;
  createDynamicButton(insertButton: InsertDynamicButton): Promise<DynamicButton>;
  deleteDynamicButton(number: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const [referral] = await db
      .insert(referrals)
      .values(insertReferral)
      .returning();
    return referral;
  }

  async getDynamicButtons(): Promise<DynamicButton[]> {
    const buttons = await db.select().from(dynamicButtons);
    return buttons;
  }

  async createDynamicButton(insertButton: InsertDynamicButton): Promise<DynamicButton> {
    const [button] = await db
      .insert(dynamicButtons)
      .values(insertButton)
      .returning();
    return button;
  }

  async deleteDynamicButton(number: string): Promise<boolean> {
    const result = await db
      .delete(dynamicButtons)
      .where(eq(dynamicButtons.number, number));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();