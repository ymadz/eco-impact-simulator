# Eco-Impact Simulator: School Edition

An interactive, web-based educational dashboard that gamifies school resource consumption. Students can explore hypothetical scenarios involving electricity, water, and waste to understand environmental impacts through live charts, scores, and recommendations.

## 🚀 Features

- **Resource Simulator**: Adjust electricity, water, and waste values with real-time eco-scoring
- **Calculus Limit Projector**: Visualize long-term waste accumulation using mathematical limits
- **Chemistry Pollution Lab**: Explore concentration and dilution principles
- **DRRR Safety Center**: Practice hazard identification and learn safety tips

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Charts**: Chart.js, react-chartjs-2
- **Icons**: lucide-react
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)

## 📁 Project Structure

```
├── frontend/          # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # React components
│   └── lib/          # Utilities and calculations
├── backend/          # Express API server
│   └── src/
│       ├── routes/   # API endpoints
│       └── lib/      # Database client
└── docs/             # Documentation
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional, for persistence)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
npm install
npm run dev
```

The API will run on [http://localhost:5000](http://localhost:5000).

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

## 📊 Supabase Setup (Optional)

Create these tables in your Supabase project:

```sql
-- Hazard Reports
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

-- Survey Statistics
CREATE TABLE survey_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_type VARCHAR(50) NOT NULL,
  value DECIMAL,
  unit VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📚 Documentation

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [Planning & Roadmap](docs/PLANNING.md)

## 🎯 Academic Integration

| Subject | Feature | Concept |
|---------|---------|---------|
| E-Tech | Web Interface | UX/UI, JavaScript |
| Calculus | Limit Projector | Limits (lim x→∞) |
| Chemistry | Pollution Lab | Concentration (C=n/V) |
| DRRR | Safety Center | Hazard Identification |

## 📄 License

This project is for educational purposes.

---

Made with ❤️ for a sustainable future
