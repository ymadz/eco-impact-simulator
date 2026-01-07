// Eco-Score Calculation
export interface EcoResult {
  score: number;
  grade: string;
  color: string;
  bgColor: string;
  message: string;
  breakdown: {
    energy: string;
    water: string;
    waste: string;
  };
  recommendations: string[];
}

export const calculateEcoScore = (
  electricity: number,
  water: number,
  waste: number
): EcoResult => {
  // Formula: Electricity has highest impact (x5), Waste (x10), Water (x2)
  const score = Math.round((electricity * 5) + (water * 2) + (waste * 10));

  let grade: string;
  let color: string;
  let bgColor: string;
  let message: string;
  let breakdown: { energy: string; water: string; waste: string };
  let recommendations: string[];

  if (score <= 50) {
    grade = 'A';
    color = 'text-green-600';
    bgColor = 'bg-green-500';
    message = 'Excellent! Your eco-impact is minimal. Keep up the great habits!';
    breakdown = {
      energy: 'Low usage - Excellent!',
      water: 'Minimal consumption',
      waste: 'Very eco-friendly'
    };
    recommendations = [
      'Share your eco-friendly habits with others',
      'Consider renewable energy sources',
      'Continue monitoring your consumption'
    ];
  } else if (score <= 80) {
    grade = 'B';
    color = 'text-lime-600';
    bgColor = 'bg-lime-500';
    message = 'Good job! Your consumption is within acceptable limits.';
    breakdown = {
      energy: 'Moderate usage - Good!',
      water: 'Acceptable levels',
      waste: 'Room for improvement'
    };
    recommendations = [
      'Turn off lights when not in use',
      'Reduce water usage during showers',
      'Increase recycling efforts'
    ];
  } else if (score <= 100) {
    grade = 'C';
    color = 'text-yellow-600';
    bgColor = 'bg-yellow-500';
    message = 'Moderate impact. Consider reducing your resource usage.';
    breakdown = {
      energy: 'Higher than average',
      water: 'Could be reduced',
      waste: 'Needs attention'
    };
    recommendations = [
      'Switch to energy-efficient appliances',
      'Fix any leaking taps',
      'Separate recyclables from trash',
      'Reduce single-use plastics'
    ];
  } else if (score <= 150) {
    grade = 'D';
    color = 'text-orange-600';
    bgColor = 'bg-orange-500';
    message = 'High impact! Your consumption needs attention.';
    breakdown = {
      energy: 'Significantly high',
      water: 'Excessive usage',
      waste: 'Major concern'
    };
    recommendations = [
      'Unplug unused electronics',
      'Take shorter showers',
      'Compost organic waste',
      'Avoid disposable products',
      'Use reusable bags and bottles'
    ];
  } else {
    grade = 'F';
    color = 'text-red-600';
    bgColor = 'bg-red-500';
    message = 'Critical! Immediate action required to reduce consumption.';
    breakdown = {
      energy: 'Critically high',
      water: 'Unsustainable levels',
      waste: 'Urgent action needed'
    };
    recommendations = [
      'Conduct an energy audit',
      'Install water-saving devices',
      'Start a comprehensive recycling program',
      'Reduce, reuse, recycle everything possible',
      'Seek professional environmental advice'
    ];
  }

  return { score, grade, color, bgColor, message, breakdown, recommendations };
};

// Limit Projection Calculation (Calculus)
export interface ProjectionData {
  labels: string[];
  data: number[];
  limit: number;
  daysToLimit: number | null;
}

export const calculateProjection = (
  dailyIncrease: number,
  days: number = 365,
  limit: number = 10000
): ProjectionData => {
  const labels: string[] = [];
  const data: number[] = [];
  let cumulative = 0;
  let daysToLimit: number | null = null;

  for (let day = 1; day <= days; day++) {
    cumulative += dailyIncrease * (1 + day * 0.01); // Slight acceleration
    labels.push(`Day ${day}`);
    data.push(Math.round(cumulative * 100) / 100);

    if (daysToLimit === null && cumulative >= limit) {
      daysToLimit = day;
    }
  }

  return { labels, data, limit, daysToLimit };
};

// Chemistry Concentration Calculation
export interface ConcentrationResult {
  concentration: number;
  severity: 'safe' | 'moderate' | 'dangerous' | 'critical';
  color: string;
  opacity: number;
  warning: string;
}

export const WATER_BODIES: Record<string, { name: string; volume: number }> = {
  cup: { name: 'Cup', volume: 0.25 },
  bucket: { name: 'Bucket', volume: 10 },
  sink: { name: 'Sink', volume: 50 },
  canal: { name: 'School Canal', volume: 1000 },
  river: { name: 'River', volume: 100000 },
};

export const POLLUTANTS: Record<string, { name: string; toxicityFactor: number }> = {
  detergent: { name: 'Detergent', toxicityFactor: 1.0 },
  oil: { name: 'Cooking Oil', toxicityFactor: 1.5 },
  fertilizer: { name: 'Fertilizer', toxicityFactor: 2.0 },
  paint: { name: 'Paint', toxicityFactor: 2.5 },
};

export const calculateConcentration = (
  pollutantAmount: number,
  waterBodyType: string,
  pollutantType: string = 'detergent'
): ConcentrationResult => {
  const waterBody = WATER_BODIES[waterBodyType] || WATER_BODIES.bucket;
  const pollutant = POLLUTANTS[pollutantType] || POLLUTANTS.detergent;

  const concentration = (pollutantAmount / waterBody.volume) * pollutant.toxicityFactor;

  let severity: ConcentrationResult['severity'];
  let color: string;
  let opacity: number;
  let warning: string;

  if (concentration < 0.01) {
    severity = 'safe';
    color = 'bg-blue-400';
    opacity = 0.3;
    warning = 'Safe levels - Minimal environmental impact';
  } else if (concentration < 0.1) {
    severity = 'moderate';
    color = 'bg-blue-600';
    opacity = 0.5;
    warning = 'Moderate concentration - Some impact on aquatic life';
  } else if (concentration < 1.0) {
    severity = 'dangerous';
    color = 'bg-blue-800';
    opacity = 0.7;
    warning = 'Dangerous levels - Significant harm to ecosystem';
  } else {
    severity = 'critical';
    color = 'bg-gray-800';
    opacity = 0.9;
    warning = 'CRITICAL! Toxic levels - Fish kill imminent!';
  }

  return { concentration, severity, color, opacity, warning };
};
