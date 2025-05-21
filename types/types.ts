export type measurement = {
  day_name: string;
  day_date: string;
  total_power: number;
};

export type yearly_measurement = {
  total_consumption: number;
};

export interface DeviceConsumptionRecord {
  device_id: number;
  device_name: string;
  location: string;
  consumption: string | number; // Podría venir como string desde la base de datos
}

export interface MonthlyConsumption {
  currentConsumption: number;
  previousConsumption: number;
  percentageChange: number;
  isIncrease: boolean;
}

export interface DailyConsumptionData {
  day_number: number;
  day_date: string;
  total_power: number;
}

export interface DailyConsumptionSummary {
  dailyData: DailyConsumptionData[];
  highestConsumption: {
    day: number;
    month: string;
    power: number;
  };
  lowestConsumption: {
    day: number;
    month: string;
    power: number;
  };
}

export interface DailyConsumptionRecord {
  day_number: number;
  day_date: string;
  total_power: string | number;
}

export interface ZoneConsumption {
  zone_name: string;
  total_consumption: number;
  percentage: number;
}

export interface ZoneConsumptionSummary {
  zones: ZoneConsumption[];
  totalConsumption: number;
}

export interface DeviceConsumptionItem {
  device_id: number;
  device_name: string;
  total_consumption: number;
  percentage: number;
}

export interface DeviceConsumptionSummary {
  devices: DeviceConsumptionItem[];
  totalConsumption: number;
}
