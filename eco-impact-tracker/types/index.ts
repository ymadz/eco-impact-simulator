// Core data types for the Eco-Impact Tracker

export interface ResourceData {
  electricity: number; // kWh per day
  water: number; // liters per day
  paper: number; // sheets per day
  waste: number; // kg per day
}

export interface EcoScore {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: string; // Hex color code
  carbonFootprint: number; // Total CO2 in kg
}

export interface MonthlyProjection {
  electricity: number;
  water: number;
  paper: number;
  waste: number;
  totalCO2: number;
}

export interface HistoricalEntry {
  date: string; // ISO string
  data: ResourceData;
  score: EcoScore;
}

export interface WhatIfScenario {
  current: ResourceData;
  improved: ResourceData;
  savings: {
    co2Reduction: number;
    percentageImprovement: number;
    monthlySavings: number;
  };
}

export interface ResourcePercentages {
  electricity: number;
  water: number;
  paper: number;
  waste: number;
}
