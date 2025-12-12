# Testing the Eco-Impact Tracker

## Quick Start - How to Test the Website

### 1. Start the Development Server

Open your terminal and navigate to the project directory:

```bash
cd /Users/madz/Documents/aliyah/eco-impact-tracker
npm run dev
```

You should see output like:
```
▲ Next.js 16.0.10 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.254.139:3000

✓ Starting...
✓ Ready in 634ms
```

### 2. Open the Website

Open your web browser and go to:
- **Local URL:** http://localhost:3000

Or access from other devices on the same network using the Network URL shown.

### 3. What You Should See

The website has three main sections:

#### Left Panel: Input Controls
- **Electricity slider** (0-50 kWh)
- **Water slider** (0-500 L)
- **Paper slider** (0-200 sheets)
- **Waste slider** (0-10 kg)
- **Reset button** to restore defaults

#### Right Panel (Top): Eco-Score Display
- Large circular progress indicator
- Score from 0-100
- Grade badge (A, B, C, D, or F)
- Color coding:
  - Green (A) = 90-100
  - Light Green (B) = 80-89
  - Yellow (C) = 70-79
  - Orange (D) = 60-69
  - Red (F) = 0-59
- Carbon footprint breakdown:
  - Daily impact
  - Monthly projection
  - Yearly projection

#### Right Panel (Bottom): Resource Distribution Chart
- Pie chart showing percentage breakdown
- Color-coded segments
- Interactive tooltips (hover over segments)
- Legend with icons

### 4. Test the Interactivity

Try these actions:

**Test 1: Adjust Sliders**
- Move any slider and watch:
  - Score updates in real-time
  - Colors change based on grade
  - Circular progress animates
  - Pie chart adjusts percentages
  - Carbon footprint recalculates

**Test 2: Try Different Scenarios**

**Excellent Score (Grade A):**
- Electricity: 5 kWh
- Water: 100 L
- Paper: 10 sheets
- Waste: 0.5 kg
- Expected Score: ~95

**Average Score (Grade C):**
- Electricity: 10 kWh
- Water: 150 L
- Paper: 50 sheets
- Waste: 1 kg
- Expected Score: ~75

**Poor Score (Grade F):**
- Electricity: 30 kWh
- Water: 300 L
- Paper: 100 sheets
- Waste: 5 kg
- Expected Score: ~0

**Test 3: Reset Button**
- Adjust all sliders to random values
- Click "Reset to Defaults"
- Everything should return to starting values

### 5. Test Responsiveness

Try resizing your browser window:
- **Mobile view** (< 768px): Single column layout
- **Tablet view** (768px - 1024px): Responsive grid
- **Desktop view** (> 1024px): Full two-column layout

Or test on actual devices using the Network URL.

### 6. Verify Calculations

**Manual Verification Example:**

Default values:
- Electricity: 10 kWh × 0.5 = 5 kg CO₂
- Water: 150 L × 0.002 = 0.3 kg CO₂
- Paper: 50 sheets × 0.005 = 0.25 kg CO₂
- Waste: 1 kg × 2.5 = 2.5 kg CO₂
- **Total: 8.05 kg CO₂/day** ✓

Score calculation:
- Base score: 100
- Electricity penalty: (10-10) × 2 = 0
- Water penalty: (150-150) × 0.1 = 0
- Paper penalty: 50 × 0.5 = 25
- Waste penalty: (1-1) × 10 = 0
- **Final score: 100 - 25 = 75 (Grade C)** ✓

### 7. Common Issues & Solutions

**Issue: Port 3000 already in use**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# Then run again
npm run dev
```

**Issue: Changes not showing up**
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Clear browser cache
- Restart the dev server

**Issue: Build errors**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 8. Stop the Development Server

When you're done testing:
- Press `Ctrl + C` in the terminal
- Or close the terminal window

---

## What's Working (Phase 1 Complete ✅)

- ✅ All input sliders functional
- ✅ Real-time eco-score calculation
- ✅ Dynamic color coding
- ✅ Carbon footprint tracking
- ✅ Animated circular progress
- ✅ Pie chart with percentages
- ✅ Interactive tooltips
- ✅ Responsive layout
- ✅ Reset functionality

## What's Coming Next (Phase 2)

- 📊 Bar chart for monthly projections
- 📈 Line chart for historical trends
- 🔄 What-If scenario simulator
- 📚 Subject sections (Statistics, Chemistry, Calculus, DRRR)
- 💡 Personalized recommendations
- 💾 Progress saving with localStorage

---

**Enjoy testing your Eco-Impact Tracker!** 🌱
