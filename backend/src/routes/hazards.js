const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');

// Mock data for when Supabase is not configured
const mockHazards = [];

// GET all hazard reports
router.get('/', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('hazard_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }
    
    res.json(mockHazards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single hazard report
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (supabase) {
      const { data, error } = await supabase
        .from('hazard_reports')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return res.json(data);
    }
    
    const hazard = mockHazards.find(h => h.id === id);
    if (!hazard) return res.status(404).json({ error: 'Hazard report not found' });
    res.json(hazard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new hazard report
router.post('/', async (req, res) => {
  try {
    const { hazard_type, severity, location, description, responses } = req.body;

    if (!hazard_type || !severity) {
      return res.status(400).json({ error: 'hazard_type and severity are required' });
    }

    const newHazard = {
      id: crypto.randomUUID(),
      hazard_type,
      severity,
      location: location || null,
      description: description || null,
      responses: responses || {},
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('hazard_reports')
        .insert([newHazard])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    mockHazards.push(newHazard);
    res.status(201).json(newHazard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH update hazard report status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'status is required' });
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('hazard_reports')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    }

    const hazardIndex = mockHazards.findIndex(h => h.id === id);
    if (hazardIndex === -1) return res.status(404).json({ error: 'Hazard report not found' });
    
    mockHazards[hazardIndex].status = status;
    res.json(mockHazards[hazardIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
