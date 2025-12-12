// Core calculation functions for the Eco-Impact Tracker

import { ResourceData, EcoScore, MonthlyProjection, ResourcePercentages, WhatIfScenario } from '@/types';
import { CO2_FACTORS, THRESHOLDS, GRADES, NORMALIZATION_FACTORS } from './constants';

/**
 * Calculate the eco-score based on resource consumption
 * Formula: Base score (100) - penalties for exceeding thresholds
 *
 * @param data - Daily resource consumption data
 * @returns EcoScore object with score, grade, color, and carbon footprint
 */
export function calculateEcoScore(data: ResourceData): EcoScore {
  let score = 100;

  // Electricity penalty: -2 points per kWh above threshold
  if (data.electricity > THRESHOLDS.ELECTRICITY) {
    score -= (data.electricity - THRESHOLDS.ELECTRICITY) * 2;
  }

  // Water penalty: -0.1 points per liter above threshold
  if (data.water > THRESHOLDS.WATER) {
    score -= (data.water - THRESHOLDS.WATER) * 0.1;
  }

  // Paper penalty: -0.5 points per sheet
  score -= data.paper * 0.5;

  // Waste penalty: -10 points per kg above threshold
  if (data.waste > THRESHOLDS.WASTE) {
    score -= (data.waste - THRESHOLDS.WASTE) * 10;
  }

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));
  score = Math.round(score);

  // Determine grade based on score
  let grade: EcoScore['grade'] = 'F';
  let color = GRADES.F.color;

  if (score >= GRADES.A.min) {
    grade = 'A';
    color = GRADES.A.color;
  } else if (score >= GRADES.B.min) {
    grade = 'B';
    color = GRADES.B.color;
  } else if (score >= GRADES.C.min) {
    grade = 'C';
    color = GRADES.C.color;
  } else if (score >= GRADES.D.min) {
    grade = 'D';
    color = GRADES.D.color;
  }

  // Calculate total carbon footprint (kg CO2 per day)
  const carbonFootprint =
    data.electricity * CO2_FACTORS.ELECTRICITY +
    data.water * CO2_FACTORS.WATER +
    data.paper * CO2_FACTORS.PAPER +
    data.waste * CO2_FACTORS.WASTE;

  return {
    score,
    grade,
    color,
    carbonFootprint: Math.round(carbonFootprint * 100) / 100, // Round to 2 decimal places
  };
}

/**
 * Calculate monthly projections from daily consumption
 *
 * @param data - Daily resource consumption data
 * @returns Monthly projection for all resources
 */
export function calculateMonthlyProjection(data: ResourceData): MonthlyProjection {
  const dailyScore = calculateEcoScore(data);

  return {
    electricity: Math.round(data.electricity * 30 * 10) / 10,
    water: Math.round(data.water * 30),
    paper: Math.round(data.paper * 30),
    waste: Math.round(data.waste * 30 * 10) / 10,
    totalCO2: Math.round(dailyScore.carbonFootprint * 30 * 100) / 100,
  };
}

/**
 * Calculate resource distribution percentages for pie chart
 * Normalizes different units to comparable scales
 *
 * @param data - Daily resource consumption data
 * @returns Percentage breakdown of each resource
 */
export function calculateResourcePercentages(data: ResourceData): ResourcePercentages {
  // Normalize to comparable units
  const normalized = {
    electricity: data.electricity * NORMALIZATION_FACTORS.electricity,
    water: data.water * NORMALIZATION_FACTORS.water,
    paper: data.paper * NORMALIZATION_FACTORS.paper,
    waste: data.waste * NORMALIZATION_FACTORS.waste,
  };

  const total = Object.values(normalized).reduce((sum, val) => sum + val, 0);

  // Avoid division by zero
  if (total === 0) {
    return {
      electricity: 25,
      water: 25,
      paper: 25,
      waste: 25,
    };
  }

  return {
    electricity: Math.round((normalized.electricity / total) * 100 * 10) / 10,
    water: Math.round((normalized.water / total) * 100 * 10) / 10,
    paper: Math.round((normalized.paper / total) * 100 * 10) / 10,
    waste: Math.round((normalized.waste / total) * 100 * 10) / 10,
  };
}

/**
 * Calculate What-If scenario comparison
 *
 * @param current - Current resource consumption
 * @param reductionPercentages - Percentage reduction for each resource (0-100)
 * @returns Scenario comparison with savings
 */
export function calculateWhatIfScenario(
  current: ResourceData,
  reductionPercentages: ResourceData
): WhatIfScenario {
  // Calculate improved values based on reduction percentages
  const improved: ResourceData = {
    electricity: current.electricity * (1 - reductionPercentages.electricity / 100),
    water: current.water * (1 - reductionPercentages.water / 100),
    paper: current.paper * (1 - reductionPercentages.paper / 100),
    waste: current.waste * (1 - reductionPercentages.waste / 100),
  };

  // Calculate scores for both scenarios
  const currentScore = calculateEcoScore(current);
  const improvedScore = calculateEcoScore(improved);

  // Calculate savings
  const co2Reduction = currentScore.carbonFootprint - improvedScore.carbonFootprint;
  const percentageImprovement = Math.round(((currentScore.carbonFootprint - improvedScore.carbonFootprint) / currentScore.carbonFootprint) * 100);
  const monthlySavings = co2Reduction * 30;

  return {
    current,
    improved,
    savings: {
      co2Reduction: Math.round(co2Reduction * 100) / 100,
      percentageImprovement: isNaN(percentageImprovement) ? 0 : percentageImprovement,
      monthlySavings: Math.round(monthlySavings * 100) / 100,
    },
  };
}

/**
 * Calculate rate of change (derivative) for calculus section
 * Simplified version assuming linear change
 *
 * @param previous - Previous day's consumption
 * @param current - Current day's consumption
 * @returns Rate of change for each resource
 */
export function calculateRateOfChange(previous: ResourceData, current: ResourceData): ResourceData {
  return {
    electricity: Math.round((current.electricity - previous.electricity) * 100) / 100,
    water: Math.round((current.water - previous.water) * 100) / 100,
    paper: Math.round((current.paper - previous.paper) * 100) / 100,
    waste: Math.round((current.waste - previous.waste) * 100) / 100,
  };
}

/**
 * Calculate 6-month projection based on current consumption
 *
 * @param data - Daily resource consumption data
 * @returns 6-month projection
 */
export function calculateSixMonthProjection(data: ResourceData): MonthlyProjection {
  const dailyScore = calculateEcoScore(data);

  return {
    electricity: Math.round(data.electricity * 180 * 10) / 10,
    water: Math.round(data.water * 180),
    paper: Math.round(data.paper * 180),
    waste: Math.round(data.waste * 180 * 10) / 10,
    totalCO2: Math.round(dailyScore.carbonFootprint * 180 * 100) / 100,
  };
}

/**
 * Get grade label from score
 *
 * @param score - Eco score (0-100)
 * @returns Grade label string
 */
export function getGradeLabel(score: number): string {
  if (score >= GRADES.A.min) return GRADES.A.label;
  if (score >= GRADES.B.min) return GRADES.B.label;
  if (score >= GRADES.C.min) return GRADES.C.label;
  if (score >= GRADES.D.min) return GRADES.D.label;
  return GRADES.F.label;
}
