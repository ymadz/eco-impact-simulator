// Manual test file for calculation functions
// Run this with: npx tsx lib/__tests__/calculations.test.ts

import { calculateEcoScore, calculateMonthlyProjection, calculateResourcePercentages, calculateWhatIfScenario } from '../calculations';
import { ResourceData } from '@/types';

console.log('🧪 Testing Eco-Impact Tracker Calculations\n');

// Test 1: Perfect Score (minimal consumption)
console.log('Test 1: Perfect Score (Minimal Consumption)');
const perfectData: ResourceData = {
  electricity: 5,
  water: 100,
  paper: 10,
  waste: 0.5,
};
const perfectScore = calculateEcoScore(perfectData);
console.log('Input:', perfectData);
console.log('Expected: Score ~95, Grade A');
console.log('Result:', perfectScore);
console.log('✅ Pass:', perfectScore.grade === 'A' && perfectScore.score >= 90);
console.log('');

// Test 2: Average Consumption
console.log('Test 2: Average Consumption');
const avgData: ResourceData = {
  electricity: 10,
  water: 150,
  paper: 50,
  waste: 1,
};
const avgScore = calculateEcoScore(avgData);
console.log('Input:', avgData);
console.log('Expected: Score ~75, Grade C');
console.log('Result:', avgScore);
console.log('✅ Pass:', avgScore.grade === 'C' && avgScore.score >= 70 && avgScore.score < 80);
console.log('');

// Test 3: High Consumption
console.log('Test 3: High Consumption');
const highData: ResourceData = {
  electricity: 30,
  water: 300,
  paper: 100,
  waste: 5,
};
const highScore = calculateEcoScore(highData);
console.log('Input:', highData);
console.log('Expected: Score < 50, Grade F');
console.log('Result:', highScore);
console.log('✅ Pass:', highScore.grade === 'F' && highScore.score < 60);
console.log('');

// Test 4: Monthly Projections
console.log('Test 4: Monthly Projections');
const monthlyProj = calculateMonthlyProjection(avgData);
console.log('Input:', avgData);
console.log('Expected: Electricity = 300, Water = 4500');
console.log('Result:', monthlyProj);
console.log('✅ Pass:', monthlyProj.electricity === 300 && monthlyProj.water === 4500);
console.log('');

// Test 5: Resource Percentages
console.log('Test 5: Resource Percentages');
const percentages = calculateResourcePercentages(avgData);
console.log('Input:', avgData);
console.log('Expected: Sum = 100%');
console.log('Result:', percentages);
const sum = percentages.electricity + percentages.water + percentages.paper + percentages.waste;
console.log('Sum:', sum);
console.log('✅ Pass:', Math.abs(sum - 100) < 1); // Allow for rounding
console.log('');

// Test 6: What-If Scenario
console.log('Test 6: What-If Scenario (50% reduction)');
const reductions: ResourceData = {
  electricity: 50,
  water: 50,
  paper: 50,
  waste: 50,
};
const scenario = calculateWhatIfScenario(avgData, reductions);
console.log('Current:', scenario.current);
console.log('Improved:', scenario.improved);
console.log('Savings:', scenario.savings);
console.log('✅ Pass:', scenario.savings.co2Reduction > 0 && scenario.savings.percentageImprovement > 0);
console.log('');

// Test 7: Edge Case - Zero consumption
console.log('Test 7: Edge Case - Zero Consumption');
const zeroData: ResourceData = {
  electricity: 0,
  water: 0,
  paper: 0,
  waste: 0,
};
const zeroScore = calculateEcoScore(zeroData);
const zeroPercentages = calculateResourcePercentages(zeroData);
console.log('Input:', zeroData);
console.log('Score:', zeroScore);
console.log('Percentages:', zeroPercentages);
console.log('✅ Pass:', zeroScore.score === 100 && zeroScore.grade === 'A');
console.log('');

console.log('✅ All tests completed!');
