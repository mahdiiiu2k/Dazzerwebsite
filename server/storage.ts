import { type User, type InsertUser, type Referral, type InsertReferral } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createReferral(referral: InsertReferral): Promise<Referral>;
  getReferrals(): Promise<Referral[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private referrals: Map<string, Referral>;

  constructor() {
    this.users = new Map();
    this.referrals = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const id = randomUUID();
    const referral: Referral = { 
      ...insertReferral, 
      id,
      createdAt: new Date()
    };
    this.referrals.set(id, referral);
    return referral;
  }

  async getReferrals(): Promise<Referral[]> {
    return Array.from(this.referrals.values());
  }
}

export const storage = new MemStorage();
