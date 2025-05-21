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
