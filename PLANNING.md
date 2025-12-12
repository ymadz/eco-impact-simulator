# Eco-Impact Tracker - Implementation Plan

## Project Timeline: 21 Days (3 Weeks)

---

## Phase 1: Setup & Foundation (Days 1-7)

### Day 1: Project Initialization & Setup
**Goal:** Get the development environment ready

```bash
# Commands to run
npx create-next-app@latest eco-impact-tracker --typescript --tailwind --app
cd eco-impact-tracker
npm install recharts lucide-react
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card slider input tabs badge separator progress
```

**Deliverables:**
- Next.js project created
- All dependencies installed
- shadcn/ui configured
- Dev server running

---

### Days 2-3: Core Types & Calculation Logic
**Goal:** Build the foundation for all calculations

#### Create `types/index.ts`
```typescript
export interface ResourceData {
  electricity: number;
  water: number;
  paper: number;
  waste: number;
}

export interface EcoScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: string;
  carbonFootprint: number;
}

export interface MonthlyProjection {
  electricity: number;
  water: number;
  paper: number;
  waste: number;
  totalCO2: number;
}

export interface HistoricalEntry {
  date: string;
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
```

#### Create `lib/constants.ts`
```typescript
// Carbon footprint conversion factors (kg CO2)
export const CO2_FACTORS = {
  ELECTRICITY: 0.5,    // per kWh
  WATER: 0.002,        // per liter
  PAPER: 0.005,        // per sheet
  WASTE: 2.5,          // per kg
};

// Eco-score thresholds
export const THRESHOLDS = {
  ELECTRICITY: 10,     // kWh/day
  WATER: 150,          // L/day
  WASTE: 1,            // kg/day
};

// Grade configuration
export const GRADES = {
  A: { min: 90, color: '#10b981', label: 'Excellent' },
  B: { min: 80, color: '#34d399', label: 'Good' },
  C: { min: 70, color: '#f59e0b', label: 'Moderate' },
  D: { min: 60, color: '#fb923c', label: 'Needs Improvement' },
  F: { min: 0, color: '#ef4444', label: 'High Impact' },
};
```

#### Create `lib/calculations.ts`
```typescript
import { ResourceData, EcoScore, MonthlyProjection } from '@/types';
import { CO2_FACTORS, THRESHOLDS, GRADES } from './constants';

export function calculateEcoScore(data: ResourceData): EcoScore {
  let score = 100;

  // Electricity penalty
  if (data.electricity > THRESHOLDS.ELECTRICITY) {
    score -= (data.electricity - THRESHOLDS.ELECTRICITY) * 2;
  }

  // Water penalty
  if (data.water > THRESHOLDS.WATER) {
    score -= (data.water - THRESHOLDS.WATER) * 0.1;
  }

  // Paper penalty
  score -= data.paper * 0.5;

  // Waste penalty
  if (data.waste > THRESHOLDS.WASTE) {
    score -= (data.waste - THRESHOLDS.WASTE) * 10;
  }

  // Clamp between 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine grade
  let grade: EcoScore['grade'] = 'F';
  let color = GRADES.F.color;

  if (score >= 90) {
    grade = 'A';
    color = GRADES.A.color;
  } else if (score >= 80) {
    grade = 'B';
    color = GRADES.B.color;
  } else if (score >= 70) {
    grade = 'C';
    color = GRADES.C.color;
  } else if (score >= 60) {
    grade = 'D';
    color = GRADES.D.color;
  }

  // Calculate carbon footprint
  const carbonFootprint =
    data.electricity * CO2_FACTORS.ELECTRICITY +
    data.water * CO2_FACTORS.WATER +
    data.paper * CO2_FACTORS.PAPER +
    data.waste * CO2_FACTORS.WASTE;

  return { score, grade, color, carbonFootprint };
}

export function calculateMonthlyProjection(data: ResourceData): MonthlyProjection {
  return {
    electricity: data.electricity * 30,
    water: data.water * 30,
    paper: data.paper * 30,
    waste: data.waste * 30,
    totalCO2: calculateEcoScore(data).carbonFootprint * 30,
  };
}

export function calculateResourcePercentages(data: ResourceData) {
  // Normalize to comparable units for percentage
  const normalized = {
    electricity: data.electricity * 10,  // 1 kWh = 10 units
    water: data.water / 10,              // 10 L = 1 unit
    paper: data.paper / 20,              // 20 sheets = 1 unit
    waste: data.waste * 10,              // 1 kg = 10 units
  };

  const total = Object.values(normalized).reduce((sum, val) => sum + val, 0);

  return {
    electricity: (normalized.electricity / total) * 100,
    water: (normalized.water / total) * 100,
    paper: (normalized.paper / total) * 100,
    waste: (normalized.waste / total) * 100,
  };
}
```

**Deliverables:**
- Complete type definitions
- All calculation functions working
- Unit tests (optional but recommended)

---

### Days 4-5: Input Panel & Basic Layout
**Goal:** Create the main input interface

#### Create `components/Header.tsx`
- Logo/title
- Navigation (optional)
- Responsive design

#### Create `components/InputPanel.tsx`
- Four slider inputs (electricity, water, paper, waste)
- Real-time value display
- Input validation
- Reset button
- Tooltips for each resource

**UI Features:**
- Use shadcn Slider component
- Display current value above each slider
- Show unit labels (kWh, L, sheets, kg)
- Min/max ranges for each resource

#### Update `app/page.tsx`
- Import InputPanel and Header
- Set up state management with useState
- Wire up data flow

**Deliverables:**
- Functional input panel
- Basic page layout
- State management working

---

### Days 6-7: Eco-Score Display & First Chart
**Goal:** Show the eco-score and visualize resource distribution

#### Create `components/EcoScore.tsx`
- Large score number (0-100)
- Grade badge (A-F)
- Color coding based on grade
- Carbon footprint display
- Circular progress indicator (use shadcn Progress or custom)

#### Create `components/Charts/PieChartComponent.tsx`
- Use Recharts PieChart
- Show resource distribution percentages
- Color-coded segments
- Interactive tooltips
- Legend

**Deliverables:**
- Eco-score displays correctly
- Pie chart shows resource breakdown
- Visual feedback working

---

## Phase 2: Charts & Interactive Features (Days 8-14)

### Days 8-9: Complete Chart Suite
**Goal:** Add bar chart and line chart

#### Create `components/Charts/BarChartComponent.tsx`
- Monthly projections for each resource
- Grouped bars
- Y-axis: quantity, X-axis: resource type
- Tooltips with exact values

#### Create `components/Charts/LineChartComponent.tsx`
- Trend over time (if historical data exists)
- Multiple lines for different resources
- X-axis: dates, Y-axis: quantity
- Show "No data yet" message initially

**Deliverables:**
- All three charts functional
- Responsive on different screen sizes
- Data flows correctly from state

---

### Days 10-11: What-If Simulator
**Goal:** Build scenario comparison tool

#### Create `components/WhatIfSimulator.tsx`
- Two-column layout (Current vs Improved)
- Percentage reduction sliders for each resource
- Side-by-side comparison cards
- Savings calculator showing:
  - CO2 reduction
  - Percentage improvement
  - Monthly cost savings (optional)
- Updated mini-charts based on scenario

**Features:**
- Real-time updates as user adjusts sliders
- Visual diff highlighting improvements
- "Apply This Scenario" button to update main inputs

**Deliverables:**
- What-If simulator fully functional
- Clear visual comparison
- Smooth user experience

---

### Days 12-14: Subject-Specific Sections
**Goal:** Integrate academic content

#### Create `components/SubjectSections/StatisticsSection.tsx`
**Content:**
- Data summary table (mean, median, mode)
- Percentile ranking ("Better than X% of users")
- Distribution charts (histogram of usage)
- Comparative analysis with benchmarks

#### Create `components/SubjectSections/ChemistrySection.tsx`
**Content:**
- Cards for eco-friendly alternatives:
  - Biodegradable cleaners (enzymes, surfactants)
  - Compostable materials (PLA, starch-based polymers)
  - Water treatment methods (filtration chemistry)
- Material decomposition rates
- Chemical process explanations

#### Create `components/SubjectSections/CalculusSection.tsx`
**Content:**
- Rate of change graphs (dR/dt)
- Derivative calculations display
- Projection models:
  - Linear: R(t) = R₀ + rt
  - Exponential: R(t) = R₀e^(kt)
- Optimization suggestions (minimize CO2)

#### Create `components/SubjectSections/DRRRSection.tsx`
**Content:**
- Emergency resource checklist (accordion UI):
  - Water storage (3-day supply)
  - Emergency power alternatives
  - Paper document backups
  - Waste management during disasters
- Safe storage tips
- Evacuation planning guide
- Conservation strategies during emergencies

**Deliverables:**
- All four subject sections complete
- Content is educational and relevant
- Proper citations/references

---

## Phase 3: Polish & Deployment (Days 15-21)

### Days 15-16: localStorage & Historical Tracking
**Goal:** Persist user data and show trends

#### Create `lib/storage.ts`
```typescript
import { HistoricalEntry, ResourceData, EcoScore } from '@/types';

const STORAGE_KEY = 'ecoHistory';

export function saveEntry(data: ResourceData, score: EcoScore) {
  const history = getHistory();
  const entry: HistoricalEntry = {
    date: new Date().toISOString(),
    data,
    score,
  };
  history.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getHistory(): HistoricalEntry[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
```

**Features to add:**
- "Save Progress" button
- Automatic save on significant changes
- View historical data in line chart
- "Clear History" option

**Deliverables:**
- Data persists across sessions
- Historical trends visible
- Clear data management

---

### Days 17-18: Recommendations & UI Polish
**Goal:** Add personalized tips and improve design

#### Create `components/Recommendations.tsx`
**Content categories:**
1. Electricity reduction tips
2. Water conservation strategies
3. Paper reduction methods
4. Waste management practices

**Logic:**
- Show recommendations based on current usage
- Highlight areas with highest impact
- Provide specific, actionable advice
- Link to chemistry/DRRR sections

**UI Polish tasks:**
- Add smooth animations (Framer Motion)
- Improve spacing and typography
- Add hover effects
- Ensure color contrast (accessibility)
- Polish mobile responsive design
- Add loading states (if needed)

**Deliverables:**
- Recommendations display correctly
- UI feels polished and professional
- Animations are smooth

---

### Days 19-20: Documentation & Testing
**Goal:** Complete documentation and thorough testing

#### Documentation tasks:
- Write inline code comments
- Create academic report:
  - Introduction
  - Subject integration explanations
  - Formulas and calculations
  - Results and analysis
  - Conclusion
- User guide (how to use the app)
- Developer notes (for future maintenance)

#### Testing checklist:
- [ ] All calculations verified manually
- [ ] Charts display correct data
- [ ] Input validation works
- [ ] localStorage functions properly
- [ ] Responsive on all screen sizes
- [ ] No console errors or warnings
- [ ] Accessibility check (keyboard navigation, screen readers)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

**Deliverables:**
- Complete documentation
- All tests passing
- Bug fixes implemented

---

### Day 21: Final Deployment
**Goal:** Deploy to production and final review

#### Deployment steps:
1. Create GitHub repository
2. Push all code to GitHub
3. Connect to Vercel:
   - Go to vercel.com
   - Import repository
   - Configure build settings
   - Deploy
4. Test production site
5. Fix any deployment issues

#### Final review:
- [ ] All features working in production
- [ ] Performance is acceptable (< 3s load time)
- [ ] SEO metadata added
- [ ] Favicon and app icons
- [ ] Error pages (404, 500)
- [ ] Analytics setup (optional)

**Deliverables:**
- Live production URL
- All features working
- Project complete

---

## Additional Features (Optional Extensions)

### Dark Mode
- Add dark mode toggle
- Update color scheme
- Persist preference in localStorage

### Data Export
- Export data as CSV
- Print-friendly version
- Share results (generate shareable link)

### Achievements/Badges
- Award badges for milestones
- "7-Day Streak" for consistent tracking
- "Eco Champion" for high scores
- Display badge collection

### Mobile App (PWA)
- Add service worker
- Make installable
- Offline support
- Push notifications for tracking reminders

---

## Key Success Metrics

The project is complete when:
1. All 4 resource inputs work correctly
2. Eco-score calculates accurately with all formulas
3. All 3 charts are functional and interactive
4. What-If simulator provides clear comparisons
5. All 5 subject sections contain educational content
6. Recommendations are personalized and helpful
7. Site is fully responsive (mobile, tablet, desktop)
8. localStorage successfully persists data
9. Deployed to Vercel with public URL
10. Documentation explains all subject integrations

---

## Common Pitfalls to Avoid

1. **Over-engineering:** Keep it simple. This is a student project, not a production app.
2. **Scope creep:** Stick to the plan. Don't add features mid-development.
3. **Premature optimization:** Make it work first, optimize later.
4. **Ignoring types:** Use TypeScript properly from the start.
5. **Poor state management:** Keep state at the right level (don't prop drill excessively).
6. **Accessibility neglect:** Test with keyboard and screen readers.
7. **Mobile-last design:** Test mobile frequently, not just at the end.
8. **Hardcoded values:** Use constants for all magic numbers.
9. **No error handling:** Add try-catch for localStorage operations.
10. **Last-minute testing:** Test continuously, not just on Day 21.

---

## Resources & References

### Official Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Recharts Examples](https://recharts.org/en-US/examples)

### Environmental Data Sources
- [EPA Carbon Footprint Calculator](https://www.epa.gov/carbon-footprint-calculator)
- [Carbon Trust Conversion Factors](https://www.carbontrust.com)
- [IPCC Guidelines](https://www.ipcc.ch)

### Academic References
- Statistics: Data visualization best practices
- Chemistry: Green chemistry principles (ACS)
- Calculus: Optimization and rate of change applications
- DRRR: FEMA disaster preparedness guidelines

---

**This plan provides a clear roadmap for completing the Eco-Impact Tracker in 21 days. Follow the schedule, test frequently, and don't hesitate to simplify if needed. Good luck!**
