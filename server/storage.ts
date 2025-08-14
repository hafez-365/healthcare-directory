import { 
  type Hospital, 
  type HealthUnit, 
  type DialysisCenter, 
  type EmergencyService,
  type InsertHospital,
  type InsertHealthUnit,
  type InsertDialysisCenter,
  type InsertEmergencyService
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Hospitals
  getHospitals(): Promise<Hospital[]>;
  getHospital(id: string): Promise<Hospital | undefined>;
  createHospital(hospital: InsertHospital): Promise<Hospital>;
  
  // Health Units
  getHealthUnits(): Promise<HealthUnit[]>;
  getHealthUnit(id: string): Promise<HealthUnit | undefined>;
  createHealthUnit(healthUnit: InsertHealthUnit): Promise<HealthUnit>;
  
  // Dialysis Centers
  getDialysisCenters(): Promise<DialysisCenter[]>;
  getDialysisCenter(id: string): Promise<DialysisCenter | undefined>;
  createDialysisCenter(dialysisCenter: InsertDialysisCenter): Promise<DialysisCenter>;
  
  // Emergency Services
  getEmergencyServices(): Promise<EmergencyService[]>;
  getEmergencyService(id: string): Promise<EmergencyService | undefined>;
  createEmergencyService(emergencyService: InsertEmergencyService): Promise<EmergencyService>;
}

export class MemStorage implements IStorage {
  private hospitals: Map<string, Hospital>;
  private healthUnits: Map<string, HealthUnit>;
  private dialysisCenters: Map<string, DialysisCenter>;
  private emergencyServices: Map<string, EmergencyService>;

  constructor() {
    this.hospitals = new Map();
    this.healthUnits = new Map();
    this.dialysisCenters = new Map();
    this.emergencyServices = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private async initializeData() {
    // Sample Hospitals Data
    const hospitalData: InsertHospital[] = [
      {
        name: "مستشفى دمنهور العام",
        nameEn: "Damanhour General Hospital",
        address: "شارع البحر - دمنهور - محافظة البحيرة",
        addressEn: "Al-Bahr Street - Damanhour - Beheira Governorate",
        phone: "+20123456789",
        beds: 250,
        services: ["جراحة عامة", "طوارئ", "أطفال", "نساء وولادة", "باطنة", "عظام", "قلب", "أشعة"],
        servicesEn: ["General Surgery", "Emergency", "Pediatrics", "Obstetrics & Gynecology", "Internal Medicine", "Orthopedics", "Cardiology", "Radiology"],
        city: "دمنهور",
        cityEn: "Damanhour"
      },
      {
        name: "مستشفى كفر الدوار المركزي",
        nameEn: "Kafr El-Dawwar Central Hospital",
        address: "شارع الجمهورية - كفر الدوار - محافظة البحيرة",
        addressEn: "El-Gomhuria Street - Kafr El-Dawwar - Beheira Governorate",
        phone: "+20123456790",
        beds: 180,
        services: ["نساء وولادة", "عظام", "قلب", "جراحة", "باطنة", "أشعة"],
        servicesEn: ["Obstetrics & Gynecology", "Orthopedics", "Cardiology", "Surgery", "Internal Medicine", "Radiology"],
        city: "كفر الدوار",
        cityEn: "Kafr El-Dawwar"
      },
      {
        name: "مستشفى رشيد العام",
        nameEn: "Rashid General Hospital",
        address: "شارع النيل - رشيد - محافظة البحيرة",
        addressEn: "El-Nil Street - Rashid - Beheira Governorate",
        phone: "+20123456791",
        beds: 120,
        services: ["جراحة", "باطنة", "أشعة", "معمل", "طوارئ", "أطفال", "عظام"],
        servicesEn: ["Surgery", "Internal Medicine", "Radiology", "Laboratory", "Emergency", "Pediatrics", "Orthopedics"],
        city: "رشيد",
        cityEn: "Rashid"
      }
    ];

    // Sample Health Units Data
    const healthUnitData: InsertHealthUnit[] = [
      {
        name: "وحدة صحة دمنهور الريفية",
        nameEn: "Damanhour Rural Health Unit",
        address: "طريق الإسكندرية - دمنهور",
        addressEn: "Alexandria Road - Damanhour",
        phone: "+20111111111",
        workingHours: "8:00 ص - 2:00 م",
        workingHoursEn: "8:00 AM - 2:00 PM",
        services: ["رعاية أولية", "تطعيمات", "رعاية أمومة", "فحص دوري"],
        servicesEn: ["Primary Care", "Vaccinations", "Maternal Care", "Periodic Checkups"],
        city: "دمنهور",
        cityEn: "Damanhour"
      },
      {
        name: "وحدة صحة كفر الدوار",
        nameEn: "Kafr El-Dawwar Health Unit",
        address: "شارع المستشفى - كفر الدوار",
        addressEn: "Hospital Street - Kafr El-Dawwar",
        phone: "+20111111112",
        workingHours: "8:00 ص - 3:00 م",
        workingHoursEn: "8:00 AM - 3:00 PM",
        services: ["رعاية أولية", "تطعيمات", "خدمات أسرة"],
        servicesEn: ["Primary Care", "Vaccinations", "Family Services"],
        city: "كفر الدوار",
        cityEn: "Kafr El-Dawwar"
      }
    ];

    // Sample Dialysis Centers Data
    const dialysisCenterData: InsertDialysisCenter[] = [
      {
        name: "مركز غسيل الكلي - دمنهور",
        nameEn: "Dialysis Center - Damanhour",
        address: "شارع البحر - بجوار مستشفى دمنهور العام",
        addressEn: "Al-Bahr Street - Next to Damanhour General Hospital",
        phone: "+20222222222",
        machines: 20,
        workingHours: "24 ساعة",
        workingHoursEn: "24 Hours",
        city: "دمنهور",
        cityEn: "Damanhour"
      },
      {
        name: "مركز غسيل الكلي - كفر الدوار",
        nameEn: "Dialysis Center - Kafr El-Dawwar",
        address: "شارع الجمهورية - كفر الدوار",
        addressEn: "El-Gomhuria Street - Kafr El-Dawwar",
        phone: "+20222222223",
        machines: 15,
        workingHours: "6:00 ص - 10:00 م",
        workingHoursEn: "6:00 AM - 10:00 PM",
        city: "كفر الدوار",
        cityEn: "Kafr El-Dawwar"
      }
    ];

    // Sample Emergency Services Data
    const emergencyServiceData: InsertEmergencyService[] = [
      {
        name: "إسعاف دمنهور",
        nameEn: "Damanhour Ambulance",
        phone: "123",
        type: "إسعاف",
        typeEn: "Ambulance",
        city: "دمنهور",
        cityEn: "Damanhour",
        available24h: 1,
        vehicles: 5
      },
      {
        name: "الدفاع المدني - البحيرة",
        nameEn: "Civil Defense - Beheira",
        phone: "180",
        type: "دفاع مدني",
        typeEn: "Civil Defense",
        city: "دمنهور",
        cityEn: "Damanhour",
        available24h: 1,
        vehicles: 3
      },
      {
        name: "شرطة النجدة - البحيرة",
        nameEn: "Emergency Police - Beheira",
        phone: "122",
        type: "شرطة",
        typeEn: "Police",
        city: "دمنهور",
        cityEn: "Damanhour",
        available24h: 1,
        vehicles: 10
      }
    ];

    // Initialize data
    for (const hospital of hospitalData) {
      await this.createHospital(hospital);
    }
    
    for (const healthUnit of healthUnitData) {
      await this.createHealthUnit(healthUnit);
    }
    
    for (const dialysisCenter of dialysisCenterData) {
      await this.createDialysisCenter(dialysisCenter);
    }
    
    for (const emergencyService of emergencyServiceData) {
      await this.createEmergencyService(emergencyService);
    }
  }

  // Hospital methods
  async getHospitals(): Promise<Hospital[]> {
    return Array.from(this.hospitals.values());
  }

  async getHospital(id: string): Promise<Hospital | undefined> {
    return this.hospitals.get(id);
  }

  async createHospital(insertHospital: InsertHospital): Promise<Hospital> {
    const id = randomUUID();
    const hospital: Hospital = { ...insertHospital, id };
    this.hospitals.set(id, hospital);
    return hospital;
  }

  // Health Unit methods
  async getHealthUnits(): Promise<HealthUnit[]> {
    return Array.from(this.healthUnits.values());
  }

  async getHealthUnit(id: string): Promise<HealthUnit | undefined> {
    return this.healthUnits.get(id);
  }

  async createHealthUnit(insertHealthUnit: InsertHealthUnit): Promise<HealthUnit> {
    const id = randomUUID();
    const healthUnit: HealthUnit = { ...insertHealthUnit, id };
    this.healthUnits.set(id, healthUnit);
    return healthUnit;
  }

  // Dialysis Center methods
  async getDialysisCenters(): Promise<DialysisCenter[]> {
    return Array.from(this.dialysisCenters.values());
  }

  async getDialysisCenter(id: string): Promise<DialysisCenter | undefined> {
    return this.dialysisCenters.get(id);
  }

  async createDialysisCenter(insertDialysisCenter: InsertDialysisCenter): Promise<DialysisCenter> {
    const id = randomUUID();
    const dialysisCenter: DialysisCenter = { ...insertDialysisCenter, id };
    this.dialysisCenters.set(id, dialysisCenter);
    return dialysisCenter;
  }

  // Emergency Service methods
  async getEmergencyServices(): Promise<EmergencyService[]> {
    return Array.from(this.emergencyServices.values());
  }

  async getEmergencyService(id: string): Promise<EmergencyService | undefined> {
    return this.emergencyServices.get(id);
  }

  async createEmergencyService(insertEmergencyService: InsertEmergencyService): Promise<EmergencyService> {
    const id = randomUUID();
    const emergencyService: EmergencyService = { ...insertEmergencyService, id };
    this.emergencyServices.set(id, emergencyService);
    return emergencyService;
  }
}

export const storage = new MemStorage();
