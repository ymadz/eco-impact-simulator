# Eco-Impact Simulator: School Edition

## Project Overview

An interactive, web-based educational dashboard that gamifies school resource consumption. Students can explore hypothetical scenarios involving electricity, water, and waste to understand environmental impacts through live charts, scores, and recommendations.

**This simulator focuses on learning and experimentation, not real tracking of student behavior.**

---

## 🎯 Objectives

1. **Awareness**: Increase understanding of the effects of excessive resource consumption
2. **Behavioral Change**: Encourage students and staff to minimize daily resource consumption
3. **Monitoring**: Track estimated consumption to prepare mitigation measures
4. **Creativity**: Promote solutions and ideas that students and employees can participate in

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 14+ (App Router) |
| **Styling** | Tailwind CSS |
| **Charts** | Chart.js / react-chartjs-2 |
| **Icons** | lucide-react |
| **Backend** | Node.js / Express |
| **Database** | Supabase (PostgreSQL) |
| **State** | React Hooks (useState, useEffect) |

---

## 📁 Project Structure

```
eco-impact-simulator/
├── frontend/                    # Next.js Application
│   ├── app/
│   │   ├── layout.js           # Root layout (Navbar, Footer)
│   │   ├── page.js             # Landing Page
│   │   ├── simulator/
│   │   │   └── page.js         # Main Simulator Dashboard
│   │   ├── chemistry/
│   │   │   └── page.js         # Pollution Lab
│   │   ├── drrr/
│   │   │   └── page.js         # DRRR Safety Center
│   │   └── about/
│   │       └── page.js         # About the Project
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── SimulatorPanel.js   # Resource input sliders
│   │   ├── EcoScore.js         # Score display card
│   │   ├── LimitGraph.js       # Calculus limits chart
│   │   ├── PollutionTank.js    # Chemistry visualization
│   │   ├── HazardForm.js       # DRRR reporting form
│   │   └── DidYouKnow.js       # Survey statistics cards
│   ├── lib/
│   │   ├── supabase.js         # Supabase client
│   │   ├── calculations.js     # Eco-score formulas
│   │   └── constants.js        # App constants
│   └── public/
│       └── images/
│
├── backend/                     # Express API Server
│   ├── src/
│   │   ├── index.js            # Server entry point
│   │   ├── routes/
│   │   │   ├── hazards.js      # Hazard reports API
│   │   │   └── surveys.js      # Survey data API
│   │   └── middleware/
│   └── package.json
│
├── docs/                        # Documentation
│   ├── PROJECT_OVERVIEW.md
│   └── PLANNING.md
│
└── README.md
```

---

## 🎮 Core Features

### 1. Simulation Control Panel (Main Dashboard)
The central hub where users input hypothetical data and see immediate results.

**Inputs:**
- ⚡ Electricity Usage (kWh/day) - Slider 0-20
- 💧 Water Consumption (Liters/day) - Slider 0-100
- 🗑️ Waste Production (kg/day) - Slider 0-10

**Outputs:**
- **Eco-Score**: Numerical score with letter grade (A-F)
- **Color Feedback**: Green (good) → Yellow (moderate) → Red (critical)
- **Real-time Charts**: Update instantly as inputs change

**Formula:**
```
Eco-Score = (Electricity × 5) + (Water × 2) + (Waste × 10)
```

**Grading:**
| Score | Grade | Color |
|-------|-------|-------|
| 0-50 | A | Green |
| 51-80 | B | Light Green |
| 81-100 | C | Yellow |
| 101-150 | D | Orange |
| 150+ | F | Red |

---

### 2. What-If Scenario Engine
Allows users to test habit changes and see instant results.

**Features:**
- "Apply Mitigation" button reduces all values by 30%
- "Reset to Average" button sets values to survey averages
- "Double Usage" button to see worst-case scenarios
- Comparison view: Before vs After

---

### 3. Calculus Limit Projector (Math Integration)
Visualizes long-term effects using the mathematical concept of Limits (lim t→∞).

**How it works:**
1. User inputs daily increase rate (e.g., +1 paper sheet/day)
2. System plots waste accumulation over 365 days
3. Displays horizontal asymptote representing "Ecosystem Limit"
4. Shows when current rate will hit critical threshold

**Visual:**
- Line chart with time (days) on X-axis
- Cumulative waste on Y-axis
- Red dashed line showing the "limit" threshold

**Academic Value:**
Demonstrates that lim(x→∞) f(x) represents eventual irreversible damage from unchecked consumption.

---

### 4. Chemistry Pollution Lab
Models pollution using concentration and dilution principles (C = n/V).

**Inputs:**
- Pollutant Type: Detergent, Oil, Fertilizer
- Pollutant Amount (grams)
- Water Body Size: Cup (0.25L), Bucket (10L), Canal (1000L), River (100000L)

**Formula:**
```
Concentration = Pollutant Amount (g) / Water Volume (L)
Toxicity Level = Concentration × Toxicity Factor
```

**Visual:**
- Water tank that changes color/opacity based on concentration
- Darker blue = Higher toxicity
- Warning indicators when concentration exceeds safe levels

**Comparison Scenarios:**
- Same 50g detergent in small canal = HIGH toxicity
- Same 50g detergent in river = LOW toxicity

**Lesson:** Environmental damage depends on concentration, not just quantity.

---

### 5. DRRR Safety Center (Disaster Risk Reduction)
Helps students prepare for and respond to hazards.

**Hazard Reporting Tool:**
- Guided multiple-choice questionnaire
- Hazard types: Flood, Fire, Water Leak, Waste Overflow, Electrical
- Conditional questions based on hazard type
- Optional text field for additional details
- Reports saved to Supabase for review

**Safety Tips (Context-Aware):**
| Input | Safety Tip |
|-------|------------|
| High Water Usage | "Store water in covered containers to prevent mosquito breeding" |
| Heavy Rain Mode | "Secure waste bins to prevent flood contamination" |
| High Waste | "Separate hazardous waste from regular trash" |

**Checklists:**
- Pre-disaster preparation
- During emergency actions
- Post-disaster recovery

---

### 6. Survey-Based "Did You Know?" Feature
Displays aggregate statistics from student surveys.

**Example Stats:**
- "60% of students use more than 3 liters of water per day"
- "Paper waste is the most common type of waste among students"
- "Average electricity usage per classroom: 8 kWh/day"

**Integration:**
- Links to simulator: "See what happens if you reduce water by 50%"
- Comparison: "Your input vs. School Average"

---

## 🗃️ Database Schema (Supabase)

### Tables

**hazard_reports**
```sql
CREATE TABLE hazard_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hazard_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  responses JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**survey_stats**
```sql
CREATE TABLE survey_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_type VARCHAR(50) NOT NULL,
  value DECIMAL,
  unit VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**simulation_logs** (optional - for analytics)
```sql
CREATE TABLE simulation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  electricity DECIMAL,
  water DECIMAL,
  waste DECIMAL,
  eco_score INTEGER,
  grade VARCHAR(2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 Design Guidelines

### Color Palette
| Usage | Color | Hex |
|-------|-------|-----|
| Primary | Eco Green | #22C55E |
| Secondary | Ocean Blue | #3B82F6 |
| Warning | Amber | #F59E0B |
| Danger | Red | #EF4444 |
| Background | Light Gray | #F3F4F6 |
| Text | Dark Gray | #1F2937 |

### Typography
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Mono**: JetBrains Mono (for numbers/data)

### Responsiveness
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly sliders and buttons

---

## 📊 Academic Integration Summary

| Subject | Feature | Concept Applied |
|---------|---------|-----------------|
| E-Tech | Web Interface | UX/UI Design, JavaScript, Interactive State |
| Calculus | Limit Projector | Limits (lim x→∞), Functions, Asymptotes |
| Chemistry | Pollution Lab | Molarity, Concentration (C=n/V), Dilution |
| DRRR | Safety Center | Hazard Identification, Vulnerability, Risk Reduction |
| Statistics | Did You Know | Data Aggregation, Averages, Trend Analysis |

---

## ⚠️ Limitations

1. **No Real Hardware**: Does not connect to actual water/electric meters
2. **Hypothetical Data**: Relies on user inputs for simulation
3. **Simplified Models**: Mathematical models are simplified for educational clarity
4. **No Real-Time Tracking**: Does not track actual student behavior

---

## 🎯 Expected Outcomes

1. **Awareness**: Improved understanding of resource consumption impacts
2. **Engagement**: Interactive learning through simulation
3. **Preparedness**: Better hazard identification skills
4. **Unity**: Stronger school relationship through shared environmental goals
5. **Application**: Practical use of LSA Virtues and SDGs

---

## 🚀 Getting Started

See [PLANNING.md](./PLANNING.md) for development roadmap and setup instructions.
