# Eco-Impact Simulator: Development Plan

## 📋 Project Timeline

**Estimated Duration**: 2-3 weeks for MVP

---

## 🗓️ Phase 1: Project Setup (Day 1-2)

### Tasks
- [x] Create project documentation (PROJECT_OVERVIEW.md, PLANNING.md)
- [ ] Initialize Next.js frontend with Tailwind CSS
- [ ] Set up Express backend
- [ ] Configure Supabase project
- [ ] Install dependencies

### Commands
```bash
# Frontend Setup
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir=false
cd frontend
npm install chart.js react-chartjs-2 lucide-react @supabase/supabase-js

# Backend Setup
mkdir backend && cd backend
npm init -y
npm install express cors dotenv @supabase/supabase-js
npm install -D nodemon
```

### Environment Variables

**Frontend (.env.local)**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend (.env)**
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

---

## 🗓️ Phase 2: Core UI Components (Day 3-5)

### Tasks
- [ ] Create shared UI components (Button, Card, Slider, etc.)
- [ ] Build Navigation/Header component
- [ ] Build Footer component
- [ ] Create Landing Page layout
- [ ] Implement "Did You Know?" cards

### Components to Create
```
components/
├── ui/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Slider.jsx
│   └── Badge.jsx
├── layout/
│   ├── Header.jsx
│   └── Footer.jsx
└── DidYouKnow.jsx
```

---

## 🗓️ Phase 3: Simulator Dashboard (Day 6-8)

### Tasks
- [ ] Build SimulatorPanel component with sliders
- [ ] Implement Eco-Score calculation logic
- [ ] Create EcoScore display card with color coding
- [ ] Add "What-If" buttons (Reduce 50%, Reset, etc.)
- [ ] Create responsive layout for simulator page

### Key Logic
```javascript
// Eco-Score Calculation
const calculateEcoScore = (electricity, water, waste) => {
  const score = (electricity * 5) + (water * 2) + (waste * 10);
  
  let grade, color;
  if (score <= 50) { grade = 'A'; color = 'green'; }
  else if (score <= 80) { grade = 'B'; color = 'lime'; }
  else if (score <= 100) { grade = 'C'; color = 'yellow'; }
  else if (score <= 150) { grade = 'D'; color = 'orange'; }
  else { grade = 'F'; color = 'red'; }
  
  return { score, grade, color };
};
```

---

## 🗓️ Phase 4: Calculus Limit Graph (Day 9-10)

### Tasks
- [ ] Set up Chart.js with react-chartjs-2
- [ ] Create LimitGraph component
- [ ] Implement limit calculation logic
- [ ] Add daily increase input
- [ ] Display asymptote line for ecosystem limit
- [ ] Add projection timeframe selector (30/90/365 days)

### Key Logic
```javascript
// Limit Calculation
const calculateProjection = (dailyIncrease, days) => {
  const data = [];
  let cumulative = 0;
  
  for (let day = 1; day <= days; day++) {
    cumulative += dailyIncrease * day; // Accelerating growth
    data.push({ x: day, y: cumulative });
  }
  
  return data;
};

// Ecosystem Limit (arbitrary threshold)
const ECOSYSTEM_LIMIT = 10000; // kg of waste
```

---

## 🗓️ Phase 5: Chemistry Pollution Lab (Day 11-12)

### Tasks
- [ ] Create PollutionTank visual component
- [ ] Build pollutant selector dropdown
- [ ] Create water body size selector
- [ ] Implement concentration calculation
- [ ] Add toxicity indicator with warnings
- [ ] Create comparison view (side-by-side tanks)

### Key Logic
```javascript
// Concentration Calculation
const WATER_BODIES = {
  cup: 0.25,
  bucket: 10,
  sink: 50,
  canal: 1000,
  river: 100000,
};

const TOXICITY_THRESHOLDS = {
  safe: 0.01,
  moderate: 0.1,
  dangerous: 1.0,
};

const calculateConcentration = (pollutantGrams, waterBodyType) => {
  const volume = WATER_BODIES[waterBodyType];
  const concentration = pollutantGrams / volume;
  
  let severity;
  if (concentration < TOXICITY_THRESHOLDS.safe) severity = 'safe';
  else if (concentration < TOXICITY_THRESHOLDS.moderate) severity = 'moderate';
  else if (concentration < TOXICITY_THRESHOLDS.dangerous) severity = 'dangerous';
  else severity = 'critical';
  
  return { concentration, severity, volume };
};
```

---

## 🗓️ Phase 6: DRRR Safety Center (Day 13-14)

### Tasks
- [ ] Create HazardForm component
- [ ] Implement multi-step form wizard
- [ ] Add conditional questions based on hazard type
- [ ] Create safety tips database
- [ ] Set up Supabase integration for reports
- [ ] Build report submission and confirmation

### Hazard Types & Questions
```javascript
const HAZARD_TYPES = {
  flood: {
    name: 'Flood',
    questions: [
      { id: 'water_level', text: 'Is water level rising?', options: ['Yes', 'No', 'Unknown'] },
      { id: 'area_affected', text: 'Which area is affected?', options: ['Classroom', 'Hallway', 'Restroom', 'Other'] },
    ],
    tips: [
      'Move electronics to higher ground',
      'Do not walk through flooded areas',
      'Report to facility management immediately',
    ],
  },
  fire: {
    name: 'Fire Hazard',
    questions: [
      { id: 'smoke_visible', text: 'Is there visible smoke?', options: ['Yes', 'No'] },
      { id: 'source', text: 'What is the source?', options: ['Electrical', 'Chemical', 'Unknown'] },
    ],
    tips: [
      'Do not use elevators',
      'Stay low if there is smoke',
      'Know your nearest exit',
    ],
  },
  // ... more hazard types
};
```

---

## 🗓️ Phase 7: Backend & Database (Day 15-16)

### Tasks
- [ ] Set up Express server with routes
- [ ] Create Supabase tables (hazard_reports, survey_stats)
- [ ] Implement hazard report API endpoints
- [ ] Seed survey statistics data
- [ ] Connect frontend to backend APIs

### API Endpoints
```
POST   /api/hazards          - Submit hazard report
GET    /api/hazards          - Get all hazard reports (admin)
GET    /api/hazards/:id      - Get single report
PATCH  /api/hazards/:id      - Update report status

GET    /api/stats            - Get survey statistics
GET    /api/stats/summary    - Get aggregated stats for "Did You Know?"
```

---

## 🗓️ Phase 8: Polish & Testing (Day 17-18)

### Tasks
- [ ] Add loading states and error handling
- [ ] Implement responsive design fixes
- [ ] Add animations and transitions
- [ ] Test all features end-to-end
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

---

## 🗓️ Phase 9: Deployment (Day 19-20)

### Tasks
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway/Render
- [ ] Configure environment variables
- [ ] Set up custom domain (optional)
- [ ] Final testing on production

---

## ✅ Feature Checklist

### Landing Page
- [ ] Hero section with title and tagline
- [ ] "Did You Know?" statistics cards
- [ ] Navigation to all sections
- [ ] Responsive design

### Simulator Dashboard
- [ ] Electricity slider (0-20 kWh)
- [ ] Water slider (0-100 L)
- [ ] Waste slider (0-10 kg)
- [ ] Live Eco-Score display
- [ ] Color-coded grade (A-F)
- [ ] "What-If" buttons
- [ ] Reset button

### Calculus Limit Projector
- [ ] Daily increase input
- [ ] Time projection selector
- [ ] Line chart visualization
- [ ] Asymptote/limit line
- [ ] Explanation text

### Chemistry Pollution Lab
- [ ] Pollutant type selector
- [ ] Amount input (grams)
- [ ] Water body size selector
- [ ] Visual water tank
- [ ] Toxicity indicator
- [ ] Comparison mode

### DRRR Safety Center
- [ ] Hazard type selection
- [ ] Conditional questions
- [ ] Optional description field
- [ ] Safety tips display
- [ ] Report submission
- [ ] Confirmation message

### Backend
- [ ] Express server setup
- [ ] Supabase connection
- [ ] Hazard reports CRUD
- [ ] Survey stats endpoint

---

## 🔧 Development Commands

```bash
# Start Frontend (from /frontend)
npm run dev

# Start Backend (from /backend)
npm run dev

# Build Frontend for Production
npm run build

# Run Linting
npm run lint
```

---

## 📝 Notes

### Supabase Setup
1. Create new project at supabase.com
2. Go to SQL Editor and run the table creation scripts
3. Copy project URL and anon key to .env files
4. Enable Row Level Security (RLS) for production

### Testing Data
- Use mock survey data for "Did You Know?" section
- Create sample hazard reports for testing
- Test all edge cases for calculations

### Performance Considerations
- Charts should debounce updates during slider drag
- Lazy load chemistry and DRRR pages
- Optimize images with Next.js Image component

---

## 🎯 MVP Priority

**Must Have (MVP):**
1. ✅ Simulator Control Panel with Eco-Score
2. ✅ What-If buttons
3. ✅ Basic landing page
4. ✅ Navigation

**Should Have:**
1. Limit Graph (Calculus)
2. Pollution Lab (Chemistry)
3. Did You Know stats

**Nice to Have:**
1. DRRR Hazard Reporting
2. Backend with Supabase
3. Admin panel for reports
