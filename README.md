# Eco-Impact Tracker

A Next.js web application that helps users track their daily resource consumption (electricity, water, paper, waste) and visualize their environmental impact through interactive charts, eco-scoring, and actionable recommendations.

## Overview

**Purpose:** Student academic project integrating Statistics, Chemistry, Calculus, Empowerment Technology, and DRRR concepts
**Timeline:** 2-3 weeks development
**Complexity:** Simple to moderate

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Storage:** localStorage
- **Deployment:** Vercel

## Quick Start

```bash
# Create Next.js project
npx create-next-app@latest eco-impact-tracker --typescript --tailwind --app
cd eco-impact-tracker

# Install dependencies
npm install recharts lucide-react

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add required components
npx shadcn-ui@latest add button card slider input tabs badge separator progress

# Run development server
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
eco-impact-tracker/
├── app/
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn components
│   ├── InputPanel.tsx           # Resource input form
│   ├── EcoScore.tsx             # Score display
│   ├── Charts/                  # Chart components
│   ├── WhatIfSimulator.tsx      # Scenario comparison
│   ├── SubjectSections/         # Academic integration
│   └── Recommendations.tsx      # Eco-tips
├── lib/
│   ├── calculations.ts          # Core logic
│   ├── storage.ts               # localStorage utils
│   └── constants.ts             # Configuration
└── types/
    └── index.ts                 # Type definitions
```

## Core Features

### Must-Have
- Resource input sliders (electricity, water, paper, waste)
- Real-time eco-score calculation (0-100, graded A-F)
- Carbon footprint tracking
- 3 interactive charts (pie, bar, line)
- Color-coded feedback system
- Personalized recommendations

### Enhanced
- What-If scenario simulator
- Subject-specific sections (Statistics, Chemistry, Calculus, DRRR)
- Historical trend tracking
- Quick stats dashboard

### Optional
- Dark mode
- Data export/print
- Achievement badges
- Shareable results

## Key Calculations

### Eco-Score Algorithm
```
Base Score: 100
Penalties:
- Electricity: If > 10 kWh/day, subtract (kWh - 10) × 2
- Water: If > 150 L/day, subtract (L - 150) × 0.1
- Paper: Subtract sheets × 0.5
- Waste: If > 1 kg/day, subtract (kg - 1) × 10

Final Score = max(0, min(100, Base - Penalties))

Grades:
A: 90-100 (Green)   | B: 80-89 (Light Green)
C: 70-79 (Yellow)   | D: 60-69 (Orange)
F: 0-59 (Red)
```

### Carbon Footprint
```
Electricity: kWh × 0.5 kg CO2
Water: L × 0.002 kg CO2
Paper: sheets × 0.005 kg CO2
Waste: kg × 2.5 kg CO2
```

## Data Types

```typescript
interface ResourceData {
  electricity: number;  // kWh/day
  water: number;        // L/day
  paper: number;        // sheets/day
  waste: number;        // kg/day
}

interface EcoScore {
  score: number;        // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: string;
  carbonFootprint: number;
}
```

## Academic Integration

### Statistics
- Data visualization with charts
- Mean, median, percentile calculations
- Distribution analysis

### Chemistry
- Eco-friendly material alternatives
- Biodegradability information
- Carbon footprint chemistry

### Calculus
- Rate of change calculations (dR/dt)
- Consumption projections
- Cumulative impact integrals

### Empowerment Technology
- Interactive web application
- Real-time data updates
- User experience design

### DRRR
- Emergency preparedness tips
- Resource conservation during disasters
- Safe storage guidelines

## Development Phases

### Phase 1: Setup & Core (Week 1)
- Project initialization
- Type definitions and calculation functions
- Input panel and basic layout
- Eco-score component
- First chart (pie chart)

### Phase 2: Charts & Interactivity (Week 2)
- Complete all charts (bar, line)
- What-If simulator
- Subject-specific sections
- Historical tracking

### Phase 3: Polish & Deploy (Week 3)
- localStorage implementation
- Recommendations system
- UI polish and animations
- Testing and deployment

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click
4. Live at `https://your-project.vercel.app`

### Manual Build
```bash
npm run build
# Output in .next/ folder
```

## Testing Checklist

- [ ] All input sliders functional
- [ ] Eco-score calculates correctly
- [ ] Charts display accurate data
- [ ] What-If simulator updates in real-time
- [ ] localStorage persists data
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Accessible (WCAG 2.1 AA)

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Recharts](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com)

## Notes

- This is an educational project with simplified formulas
- Carbon calculations are approximate
- All data stored locally (no backend required)
- Focus on demonstrating concepts, not perfect accuracy

## License

MIT (or as required by institution)

---

**Built with Next.js, TypeScript, and shadcn/ui**
