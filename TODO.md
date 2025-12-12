# Eco-Impact Tracker - TODO List

## Legend
- [ ] Not started
- [🔄] In progress
- [✅] Completed

---

## Phase 1: Setup & Foundation (Days 1-7) ✅ COMPLETED

### Day 1: Project Initialization ✅
- [✅] Create Next.js project with TypeScript and Tailwind
- [✅] Install core dependencies (recharts, lucide-react)
- [✅] Initialize shadcn/ui
- [✅] Add required shadcn components (button, card, slider, input, tabs, badge, separator, progress)
- [✅] Verify dev server runs successfully
- [✅] Initialize git repository and make initial commit

### Days 2-3: Core Architecture ✅
- [✅] Create `types/index.ts` with all interfaces:
  - [✅] ResourceData
  - [✅] EcoScore
  - [✅] MonthlyProjection
  - [✅] HistoricalEntry
  - [✅] WhatIfScenario
- [✅] Create `lib/constants.ts`:
  - [✅] CO2_FACTORS
  - [✅] THRESHOLDS
  - [✅] GRADES configuration
- [✅] Create `lib/calculations.ts`:
  - [✅] calculateEcoScore function
  - [✅] calculateMonthlyProjection function
  - [✅] calculateResourcePercentages function
  - [✅] Test all calculations manually
- [✅] Create `lib/utils.ts` (already exists from shadcn)

### Days 4-5: Input Panel & Layout ✅
- [✅] Create `components/Header.tsx`:
  - [✅] Logo/title
  - [✅] Navigation structure
  - [✅] Responsive design
- [✅] Create `components/InputPanel.tsx`:
  - [✅] Electricity slider (0-50 kWh, default 10)
  - [✅] Water slider (0-500 L, default 150)
  - [✅] Paper slider (0-200 sheets, default 50)
  - [✅] Waste slider (0-10 kg, default 1)
  - [✅] Display current values
  - [✅] Add unit labels
  - [✅] Add tooltips for each resource
  - [✅] Reset button
  - [✅] Input validation
- [✅] Update `app/page.tsx`:
  - [✅] Set up state with useState for ResourceData
  - [✅] Import and render Header
  - [✅] Import and render InputPanel
  - [✅] Wire up state handlers
- [✅] Test input panel functionality

### Days 6-7: Eco-Score & First Chart ✅
- [✅] Create `components/EcoScore.tsx`:
  - [✅] Large score display (0-100)
  - [✅] Grade badge (A-F)
  - [✅] Color coding based on grade
  - [✅] Circular progress indicator (SVG-based)
  - [✅] Carbon footprint display (daily/monthly/yearly)
  - [✅] Animation on score change (CSS transitions)
- [✅] Create `components/Charts/PieChartComponent.tsx`:
  - [✅] Implement Recharts PieChart
  - [✅] Calculate resource percentages
  - [✅] Color-coded segments
  - [✅] Interactive tooltips
  - [✅] Legend with icons
  - [✅] Responsive container
- [ ] Create `components/QuickStats.tsx` (optional - skipped, info in EcoScore)
- [✅] Integrate EcoScore and PieChart into main page
- [✅] Test calculations and visual feedback

---

## Phase 2: Charts & Interactive Features (Days 8-14)

### Days 8-9: Complete Chart Suite
- [ ] Create `components/Charts/BarChartComponent.tsx`:
  - [ ] Monthly projections bar chart
  - [ ] Grouped bars for each resource
  - [ ] Y-axis labels (quantity)
  - [ ] X-axis labels (resource types)
  - [ ] Tooltips with exact values
  - [ ] Color coding
  - [ ] Responsive design
- [ ] Create `components/Charts/LineChartComponent.tsx`:
  - [ ] Line chart for historical trends
  - [ ] Multiple lines (one per resource)
  - [ ] X-axis: dates
  - [ ] Y-axis: quantity
  - [ ] Legend
  - [ ] Show "No data yet" placeholder
  - [ ] Responsive design
- [ ] Create `components/Charts/index.ts` for exports
- [ ] Integrate both charts into main page
- [ ] Test chart responsiveness on mobile/tablet/desktop

### Days 10-11: What-If Simulator
- [ ] Create `components/WhatIfSimulator.tsx`:
  - [ ] Two-column layout (Current vs Improved)
  - [ ] Percentage reduction sliders for each resource
  - [ ] Calculate improved values in real-time
  - [ ] Display current vs improved side-by-side
  - [ ] Calculate and display savings:
    - [ ] CO2 reduction
    - [ ] Percentage improvement
    - [ ] Monthly savings
  - [ ] Mini-charts for comparison (optional)
  - [ ] "Apply This Scenario" button
  - [ ] Reset scenario button
- [ ] Integrate What-If simulator into main page
- [ ] Test scenario calculations

### Days 12-14: Subject-Specific Sections
- [ ] Create `components/SubjectSections/StatisticsSection.tsx`:
  - [ ] Data summary table (mean, median, mode)
  - [ ] Percentile ranking display
  - [ ] Distribution histogram (optional)
  - [ ] Comparative analysis with benchmarks
  - [ ] Variance and standard deviation (optional)
- [ ] Create `components/SubjectSections/ChemistrySection.tsx`:
  - [ ] Eco-friendly alternatives cards:
    - [ ] Biodegradable cleaners section
    - [ ] Compostable materials section
    - [ ] Water treatment methods section
  - [ ] Material decomposition rates
  - [ ] Chemical formulas and explanations
  - [ ] Visual icons/illustrations
- [ ] Create `components/SubjectSections/CalculusSection.tsx`:
  - [ ] Rate of change graph (dR/dt)
  - [ ] Derivative calculations display
  - [ ] Projection models:
    - [ ] Linear projection
    - [ ] Exponential projection (optional)
  - [ ] Optimization formulas
  - [ ] Cumulative impact integral (optional)
- [ ] Create `components/SubjectSections/DRRRSection.tsx`:
  - [ ] Emergency resource checklist (accordion):
    - [ ] Water storage guidelines
    - [ ] Emergency power alternatives
    - [ ] Document backup recommendations
    - [ ] Waste management during disasters
  - [ ] Safe storage tips cards
  - [ ] Evacuation planning section
  - [ ] Conservation strategies
- [ ] Create `components/SubjectSections/index.ts` for exports
- [ ] Add tabbed interface to switch between sections
- [ ] Integrate all sections into main page
- [ ] Review all academic content for accuracy

---

## Phase 3: Polish & Deployment (Days 15-21)

### Days 15-16: Storage & Historical Tracking
- [ ] Create `lib/storage.ts`:
  - [ ] saveEntry function
  - [ ] getHistory function
  - [ ] clearHistory function
  - [ ] Error handling for localStorage
- [ ] Add "Save Progress" button to main page
- [ ] Implement auto-save on significant changes (debounced)
- [ ] Update LineChart to show historical data
- [ ] Add "View History" panel/modal
- [ ] Add "Clear History" button with confirmation
- [ ] Test localStorage across browser sessions
- [ ] Handle localStorage quota exceeded error

### Days 17-18: Recommendations & UI Polish
- [ ] Create `components/Recommendations.tsx`:
  - [ ] Electricity reduction tips
  - [ ] Water conservation strategies
  - [ ] Paper reduction methods
  - [ ] Waste management practices
  - [ ] Personalize based on current usage
  - [ ] Highlight highest impact areas
  - [ ] Link to relevant subject sections
- [ ] Integrate Recommendations into main page
- [ ] UI Polish:
  - [ ] Add smooth scroll animations
  - [ ] Improve spacing and typography
  - [ ] Add hover effects to interactive elements
  - [ ] Ensure proper color contrast (WCAG AA)
  - [ ] Optimize mobile responsive design
  - [ ] Add loading states (if needed)
  - [ ] Add transition animations (Framer Motion optional)
  - [ ] Polish card shadows and borders
- [ ] Create `components/Footer.tsx` with credits
- [ ] Add favicon and app icons
- [ ] Test on multiple devices

### Days 19-20: Documentation & Testing
- [ ] Code documentation:
  - [ ] Add JSDoc comments to all functions
  - [ ] Add inline comments for complex logic
  - [ ] Update README with usage instructions
- [ ] Academic report:
  - [ ] Write introduction
  - [ ] Document Statistics integration
  - [ ] Document Chemistry 2 application
  - [ ] Document Calculus implementation
  - [ ] Document Empowerment Technology features
  - [ ] Document DRRR integration
  - [ ] Write conclusion
  - [ ] Add references and citations
- [ ] User guide:
  - [ ] How to use the app
  - [ ] Interpretation of results
  - [ ] Tips for best results
- [ ] Testing:
  - [ ] Verify all calculations manually
  - [ ] Test all charts with various data inputs
  - [ ] Test input validation
  - [ ] Test localStorage functionality
  - [ ] Test on mobile (375px width)
  - [ ] Test on tablet (768px width)
  - [ ] Test on desktop (1280px+ width)
  - [ ] Check for console errors/warnings
  - [ ] Accessibility testing:
    - [ ] Keyboard navigation
    - [ ] Screen reader compatibility
    - [ ] Focus indicators
  - [ ] Cross-browser testing:
    - [ ] Chrome
    - [ ] Firefox
    - [ ] Safari
    - [ ] Edge (if available)
- [ ] Bug fixes:
  - [ ] Document all bugs found
  - [ ] Prioritize critical bugs
  - [ ] Fix all critical bugs
  - [ ] Fix high-priority bugs

### Day 21: Deployment & Final Review
- [ ] Prepare for deployment:
  - [ ] Create GitHub repository
  - [ ] Add .gitignore (node_modules, .next, .env.local)
  - [ ] Push all code to GitHub
  - [ ] Write descriptive commit messages
- [ ] Vercel deployment:
  - [ ] Sign up/login to Vercel
  - [ ] Import GitHub repository
  - [ ] Configure build settings
  - [ ] Deploy to production
  - [ ] Verify deployment successful
- [ ] Test production site:
  - [ ] Test all features on live URL
  - [ ] Check for deployment-specific issues
  - [ ] Verify performance (< 3s load time)
  - [ ] Test mobile responsiveness on real devices
- [ ] SEO & Metadata:
  - [ ] Add meta description
  - [ ] Add Open Graph tags
  - [ ] Add Twitter card tags
  - [ ] Update page title
- [ ] Final polish:
  - [ ] Add 404 error page
  - [ ] Add 500 error page (optional)
  - [ ] Set up analytics (Google Analytics optional)
  - [ ] Add robots.txt (optional)
- [ ] Documentation:
  - [ ] Add deployment URL to README
  - [ ] Update README with any deployment notes
  - [ ] Create final presentation slides (if needed)
- [ ] Final review:
  - [ ] All 10 success criteria met
  - [ ] All features working correctly
  - [ ] No critical bugs
  - [ ] Documentation complete
  - [ ] Ready for submission

---

## Optional Extensions (Post-Completion)

### Dark Mode
- [ ] Add dark mode toggle button
- [ ] Create dark color scheme
- [ ] Update all components for dark mode
- [ ] Persist preference in localStorage
- [ ] Test contrast ratios in dark mode

### Data Export
- [ ] Add "Export as CSV" button
- [ ] Implement CSV generation
- [ ] Add print-friendly stylesheet
- [ ] Create shareable link feature (optional)

### Achievements System
- [ ] Design badge icons
- [ ] Define achievement criteria
- [ ] Implement badge unlocking logic
- [ ] Create badge display component
- [ ] Add badge collection page

### PWA Features
- [ ] Add service worker
- [ ] Create manifest.json
- [ ] Make app installable
- [ ] Add offline support
- [ ] Add push notifications (optional)

---

## Notes & Reminders

### Important Reminders
- Commit code frequently (at least daily)
- Test on mobile devices regularly
- Keep scope simple - this is a student project
- Focus on demonstrating concepts, not perfection
- Ask for help if stuck for more than 2 hours

### Helpful Commands
```bash
# Development
npm run dev

# Build
npm run build

# Type checking
npx tsc --noEmit

# Add shadcn component
npx shadcn-ui@latest add [component-name]

# Deploy to Vercel
vercel
```

### Resources
- Next.js Docs: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com
- Recharts: https://recharts.org
- Tailwind CSS: https://tailwindcss.com

---

## Progress Tracking

**Overall Progress:** 31/100+ (31% complete)

### Phase 1 Progress: 31/31 tasks ✅ COMPLETE
### Phase 2 Progress: 0/35 tasks
### Phase 3 Progress: 0/54 tasks
### Optional Progress: 0/20 tasks

**Current Phase:** Charts & Interactive Features (Phase 2)
**Next Milestone:** Complete Bar Chart and Line Chart (Days 8-9)
**Target Completion:** Day 21

---

**Last Updated:** December 12, 2024
**Project Status:** Phase 1 Complete - Moving to Phase 2
**Blockers:** None

---

_This TODO list is a living document. Update it daily to track progress and adjust timelines as needed._
