// Constants and configuration for the Eco-Impact Tracker

// Carbon footprint conversion factors (kg CO2)
export const CO2_FACTORS = {
  ELECTRICITY: 0.5, // per kWh
  WATER: 0.002, // per liter
  PAPER: 0.005, // per sheet
  WASTE: 2.5, // per kg
} as const;

// Eco-score thresholds for penalties
export const THRESHOLDS = {
  ELECTRICITY: 10, // kWh/day
  WATER: 150, // L/day
  WASTE: 1, // kg/day
} as const;

// Grade configuration
export const GRADES = {
  A: { min: 90, color: '#10b981', label: 'Excellent' },
  B: { min: 80, color: '#34d399', label: 'Good' },
  C: { min: 70, color: '#f59e0b', label: 'Moderate' },
  D: { min: 60, color: '#fb923c', label: 'Needs Improvement' },
  F: { min: 0, color: '#ef4444', label: 'High Impact' },
} as const;

// Default resource values for initialization
export const DEFAULT_RESOURCES = {
  electricity: 10,
  water: 150,
  paper: 50,
  waste: 1,
} as const;

// Input ranges for sliders
export const INPUT_RANGES = {
  electricity: { min: 0, max: 50, step: 0.5 },
  water: { min: 0, max: 500, step: 5 },
  paper: { min: 0, max: 200, step: 1 },
  waste: { min: 0, max: 10, step: 0.1 },
} as const;

// Normalization factors for percentage calculations
// These convert different units to comparable scales
export const NORMALIZATION_FACTORS = {
  electricity: 10, // 1 kWh = 10 units
  water: 0.1, // 10 L = 1 unit
  paper: 0.05, // 20 sheets = 1 unit
  waste: 10, // 1 kg = 10 units
} as const;
