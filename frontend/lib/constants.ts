export const HAZARD_TYPES = {
  flood: {
    name: 'Flood',
    icon: '🌊',
    questions: [
      {
        id: 'water_level',
        text: 'Is the water level rising?',
        options: ['Yes, rapidly', 'Yes, slowly', 'No, stable', 'Unknown'],
      },
      {
        id: 'area_affected',
        text: 'Which area is affected?',
        options: ['Classroom', 'Hallway', 'Restroom', 'Cafeteria', 'Playground', 'Other'],
      },
      {
        id: 'depth',
        text: 'Estimated water depth?',
        options: ['Ankle-deep', 'Knee-deep', 'Waist-deep or higher', 'Unknown'],
      },
    ],
    tips: [
      'Move electronics and important documents to higher ground',
      'Do not walk through flooded areas - there may be hidden dangers',
      'Report to facility management immediately',
      'Turn off electrical outlets in affected areas if safe to do so',
      'Avoid contact with flood water - it may be contaminated',
    ],
  },
  fire: {
    name: 'Fire Hazard',
    icon: '🔥',
    questions: [
      {
        id: 'smoke_visible',
        text: 'Is there visible smoke?',
        options: ['Yes, heavy smoke', 'Yes, light smoke', 'No smoke', 'Smell only'],
      },
      {
        id: 'source',
        text: 'What is the suspected source?',
        options: ['Electrical', 'Chemical/Lab', 'Kitchen/Cafeteria', 'Unknown'],
      },
      {
        id: 'size',
        text: 'Estimated size of hazard?',
        options: ['Small (can be contained)', 'Medium (spreading)', 'Large (out of control)', 'Unknown'],
      },
    ],
    tips: [
      'Do not use elevators - use stairs only',
      'Stay low if there is smoke - air is cleaner near the floor',
      'Know your nearest exit and assembly point',
      'Do not re-enter the building until cleared by authorities',
      'If clothes catch fire: Stop, Drop, and Roll',
    ],
  },
  leak: {
    name: 'Water Leak',
    icon: '💧',
    questions: [
      {
        id: 'source',
        text: 'Where is the leak coming from?',
        options: ['Ceiling/Roof', 'Pipe', 'Faucet', 'Toilet', 'Unknown'],
      },
      {
        id: 'severity',
        text: 'How severe is the leak?',
        options: ['Dripping', 'Steady flow', 'Heavy flow', 'Burst pipe'],
      },
      {
        id: 'near_electrical',
        text: 'Is the leak near electrical equipment?',
        options: ['Yes', 'No', 'Not sure'],
      },
    ],
    tips: [
      'Turn off water supply if safe and accessible',
      'Move electronics away from the water',
      'Place containers to catch dripping water',
      'Report to maintenance immediately',
      'Do not use electrical equipment near the leak',
    ],
  },
  waste: {
    name: 'Waste Overflow',
    icon: '🗑️',
    questions: [
      {
        id: 'type',
        text: 'What type of waste?',
        options: ['General trash', 'Recyclables', 'Food waste', 'Chemical/Lab waste', 'Unknown'],
      },
      {
        id: 'location',
        text: 'Where is the overflow?',
        options: ['Classroom', 'Hallway', 'Cafeteria', 'Lab', 'Restroom', 'Outdoor'],
      },
      {
        id: 'health_risk',
        text: 'Is there a visible health risk?',
        options: ['Yes, foul odor', 'Yes, pests present', 'Yes, hazardous materials', 'No immediate risk'],
      },
    ],
    tips: [
      'Do not touch or handle hazardous waste directly',
      'Keep area clear of students until cleaned',
      'Report to janitorial staff immediately',
      'Ensure proper ventilation if there is odor',
      'Wash hands thoroughly after any contact',
    ],
  },
  electrical: {
    name: 'Electrical Hazard',
    icon: '⚡',
    questions: [
      {
        id: 'type',
        text: 'What type of electrical issue?',
        options: ['Sparking outlet', 'Exposed wires', 'Burning smell', 'Equipment malfunction', 'Power outage'],
      },
      {
        id: 'location',
        text: 'Where is the hazard?',
        options: ['Wall outlet', 'Ceiling', 'Equipment', 'Extension cord', 'Other'],
      },
      {
        id: 'active',
        text: 'Is the hazard currently active?',
        options: ['Yes, ongoing', 'Intermittent', 'Stopped but visible damage', 'Not sure'],
      },
    ],
    tips: [
      'Do not touch any electrical equipment showing signs of damage',
      'Keep everyone away from the area',
      'Do not use water near electrical hazards',
      'Report to maintenance and administration immediately',
      'If someone is shocked, do not touch them directly',
    ],
  },
};

export const SEVERITY_LEVELS = {
  low: { name: 'Low', color: 'bg-yellow-500', description: 'Minor issue, no immediate danger' },
  medium: { name: 'Medium', color: 'bg-orange-500', description: 'Requires attention soon' },
  high: { name: 'High', color: 'bg-red-500', description: 'Immediate action required' },
  critical: { name: 'Critical', color: 'bg-red-700', description: 'Emergency - evacuate if necessary' },
};

export const SURVEY_STATS = [
  {
    id: '1',
    icon: '💧',
    stat: '60%',
    description: 'of students use more than 3 liters of water per day at school',
    action: 'Try reducing your water usage',
  },
  {
    id: '2',
    icon: '📄',
    stat: '45%',
    description: 'Paper waste is the most common type of waste among students',
    action: 'Go digital when possible',
  },
  {
    id: '3',
    icon: '⚡',
    stat: '8 kWh',
    description: 'Average electricity usage per classroom per day',
    action: 'Turn off lights when leaving',
  },
  {
    id: '4',
    icon: '🥤',
    stat: '70%',
    description: 'of students use more than 3 plastic bottles per week',
    action: 'Bring a reusable bottle',
  },
  {
    id: '5',
    icon: '🍔',
    stat: '2.5 kg',
    description: 'Average food waste per student per week',
    action: 'Take only what you can eat',
  },
  {
    id: '6',
    icon: '♻️',
    stat: '25%',
    description: 'Only 25% of students actively recycle at school',
    action: 'Start recycling today',
  },
];

// Fun facts for E-Tech integration
export const FUN_FACTS = [
  {
    id: '1',
    category: 'water',
    icon: '💧',
    fact: 'If everyone in the Philippines saved just 1 liter of water daily, we could save over 100 million liters every day!',
    source: 'Environmental Conservation Studies',
  },
  {
    id: '2',
    category: 'energy',
    icon: '💡',
    fact: 'LED bulbs use 75% less energy than traditional incandescent bulbs and last 25 times longer!',
    source: 'Energy Efficiency Report',
  },
  {
    id: '3',
    category: 'waste',
    icon: '♻️',
    fact: 'Recycling one aluminum can saves enough energy to power a TV for 3 hours!',
    source: 'Recycling Association',
  },
  {
    id: '4',
    category: 'plastic',
    icon: '🥤',
    fact: 'A single plastic bottle takes approximately 450 years to decompose in the ocean!',
    source: 'Marine Conservation Society',
  },
  {
    id: '5',
    category: 'paper',
    icon: '🌳',
    fact: 'Recycling 1 ton of paper saves 17 trees, 26,000 liters of water, and 3 cubic meters of landfill space!',
    source: 'Forest Conservation Foundation',
  },
  {
    id: '6',
    category: 'food',
    icon: '🍎',
    fact: 'About 1/3 of all food produced globally is wasted. That\'s enough to feed 2 billion people!',
    source: 'UN Food and Agriculture Organization',
  },
  {
    id: '7',
    category: 'carbon',
    icon: '🌍',
    fact: 'Planting just one tree can absorb up to 22 kg of CO₂ per year for 40 years!',
    source: 'Climate Action Network',
  },
  {
    id: '8',
    category: 'electricity',
    icon: '⚡',
    fact: 'Leaving your charger plugged in when not in use still consumes electricity - up to 0.26 watts per hour!',
    source: 'Energy Conservation Institute',
  },
];

// Usage analogies for better understanding
export const USAGE_ANALOGIES = {
  water: [
    { amount: 6, description: 'toilet flush', icon: '🚽' },
    { amount: 10, description: 'brushing teeth (tap running)', icon: '🪥' },
    { amount: 15, description: 'hand washing (1 min)', icon: '🧼' },
    { amount: 40, description: 'washing dishes by hand', icon: '🍽️' },
    { amount: 65, description: 'average shower (5 min)', icon: '🚿' },
    { amount: 150, description: 'bathtub fill', icon: '🛁' },
    { amount: 200, description: 'washing machine load', icon: '👕' },
  ],
  energy: [
    { amount: 0.01, description: 'phone charging (1 hour)', icon: '📱' },
    { amount: 0.06, description: 'LED bulb (1 hour)', icon: '💡' },
    { amount: 0.1, description: 'laptop (1 hour)', icon: '💻' },
    { amount: 0.15, description: 'desktop computer (1 hour)', icon: '🖥️' },
    { amount: 0.5, description: 'ceiling fan (1 hour)', icon: '🌀' },
    { amount: 1.0, description: 'electric fan (1 hour)', icon: '📺' },
    { amount: 1.5, description: 'air conditioner (1 hour)', icon: '❄️' },
    { amount: 2.0, description: 'electric iron (1 hour)', icon: '👔' },
  ],
};

// Updated waste types based on survey data
export const WASTE_TYPES = [
  { id: 'paper', name: 'Paper & Cardboard', icon: '📄', percentage: 45, tip: 'Recycle or go digital!' },
  { id: 'plastic', name: 'Plastic Bottles/Items', icon: '🥤', percentage: 70, tip: 'Use reusable bottles!' },
  { id: 'food', name: 'Food Waste', icon: '🍔', percentage: 35, tip: 'Take only what you can eat!' },
  { id: 'electronics', name: 'E-Waste (batteries, etc.)', icon: '🔋', percentage: 15, tip: 'Proper disposal required!' },
  { id: 'organic', name: 'Organic/Compostable', icon: '🍂', percentage: 25, tip: 'Compost when possible!' },
  { id: 'general', name: 'General/Mixed Waste', icon: '🗑️', percentage: 20, tip: 'Sort before throwing!' },
];
