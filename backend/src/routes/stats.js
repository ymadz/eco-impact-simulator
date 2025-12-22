const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');

// Mock survey statistics data
const mockStats = [
  {
    id: '1',
    stat_type: 'water_usage',
    value: 60,
    unit: 'percent',
    description: '60% of students use more than 3 liters of water per day at school',
  },
  {
    id: '2',
    stat_type: 'paper_waste',
    value: 45,
    unit: 'percent',
    description: 'Paper waste is the most common type of waste among students (45%)',
  },
  {
    id: '3',
    stat_type: 'electricity_avg',
    value: 8,
    unit: 'kWh',
    description: 'Average electricity usage per classroom is 8 kWh per day',
  },
  {
    id: '4',
    stat_type: 'plastic_bottles',
    value: 70,
    unit: 'percent',
    description: '70% of students use more than 3 plastic bottles per week',
  },
  {
    id: '5',
    stat_type: 'food_waste',
    value: 2.5,
    unit: 'kg',
    description: 'Average food waste per student is 2.5 kg per week',
  },
  {
    id: '6',
    stat_type: 'recycling',
    value: 25,
    unit: 'percent',
    description: 'Only 25% of students actively recycle at school',
  },
];

// GET all survey statistics
router.get('/', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('survey_stats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }

    res.json(mockStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET summary statistics for "Did You Know?" section
router.get('/summary', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('survey_stats')
        .select('*')
        .limit(4);

      if (error) throw error;
      return res.json(data);
    }

    // Return random selection of 4 stats
    const shuffled = [...mockStats].sort(() => 0.5 - Math.random());
    res.json(shuffled.slice(0, 4));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
