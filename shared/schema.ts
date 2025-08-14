import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const hospitals = pgTable("hospitals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  address: text("address").notNull(),
  addressEn: text("address_en").notNull(),
  phone: text("phone").notNull(),
  beds: integer("beds").notNull(),
  services: jsonb("services").$type<string[]>().notNull(),
  servicesEn: jsonb("services_en").$type<string[]>().notNull(),
  city: text("city").notNull(),
  cityEn: text("city_en").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
});

export const healthUnits = pgTable("health_units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  address: text("address").notNull(),
  addressEn: text("address_en").notNull(),
  phone: text("phone").notNull(),
  workingHours: text("working_hours").notNull(),
  workingHoursEn: text("working_hours_en").notNull(),
  services: jsonb("services").$type<string[]>().notNull(),
  servicesEn: jsonb("services_en").$type<string[]>().notNull(),
  city: text("city").notNull(),
  cityEn: text("city_en").notNull(),
});

export const dialysisCenters = pgTable("dialysis_centers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  address: text("address").notNull(),
  addressEn: text("address_en").notNull(),
  phone: text("phone").notNull(),
  machines: integer("machines").notNull(),
  workingHours: text("working_hours").notNull(),
  workingHoursEn: text("working_hours_en").notNull(),
  city: text("city").notNull(),
  cityEn: text("city_en").notNull(),
});

export const emergencyServices = pgTable("emergency_services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  phone: text("phone").notNull(),
  type: text("type").notNull(), // ambulance, fire, police, etc.
  typeEn: text("type_en").notNull(),
  city: text("city").notNull(),
  cityEn: text("city_en").notNull(),
  available24h: integer("available_24h").notNull().default(1), // 1 for true, 0 for false
  vehicles: integer("vehicles"),
});

export const insertHospitalSchema = createInsertSchema(hospitals).omit({
  id: true,
});

export const insertHealthUnitSchema = createInsertSchema(healthUnits).omit({
  id: true,
});

export const insertDialysisCenterSchema = createInsertSchema(dialysisCenters).omit({
  id: true,
});

export const insertEmergencyServiceSchema = createInsertSchema(emergencyServices).omit({
  id: true,
});

export type InsertHospital = z.infer<typeof insertHospitalSchema>;
export type InsertHealthUnit = z.infer<typeof insertHealthUnitSchema>;
export type InsertDialysisCenter = z.infer<typeof insertDialysisCenterSchema>;
export type InsertEmergencyService = z.infer<typeof insertEmergencyServiceSchema>;

export type Hospital = typeof hospitals.$inferSelect;
export type HealthUnit = typeof healthUnits.$inferSelect;
export type DialysisCenter = typeof dialysisCenters.$inferSelect;
export type EmergencyService = typeof emergencyServices.$inferSelect;
