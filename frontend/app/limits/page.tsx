'use client';

import { TrendingUp, Zap, Droplets, Trash2, Calculator, BookOpen, BarChart3, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LimitsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-4 rounded-full">
              <TrendingUp className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            📊 Limits in Real Life
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page explains how a Basic Calculus concept called limits helps us understand real-life data from our school survey.
          </p>
          {/* Subject Integration Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="group relative inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium cursor-help">
              <Info className="w-4 h-4" />
              <span>Basic Calculus: Limits & Environmental Data</span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-80 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                Basic Calculus was integrated through the concept of limits. After collecting data on students&apos; waste production, water use, and electricity consumption, limits were applied to analyze long-term trends and behavior as usage increases.
              </div>
            </div>
          </div>
        </div>

        {/* What is a Limit */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            What is a Limit?
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A limit tells us what value something is approaching as it keeps happening over time.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Instead of looking at just one day or one student, limits help us understand what happens when an action is repeated many times. This makes limits very useful when analyzing daily habits such as energy use, water use, and waste generation.
          </p>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <p className="text-purple-800 font-semibold">
              In simple terms, limits help answer this question: &quot;If this keeps happening every day, what does it lead to?&quot;
            </p>
          </div>
        </section>

        {/* Why Limits Matter */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Limits Matter in Real Life</h2>
          <p className="mb-4">Limits help us:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-200">•</span>
              <span>Predict long-term effects of daily actions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-200">•</span>
              <span>Model large populations using averages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-200">•</span>
              <span>Understand what happens as quantities increase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-200">•</span>
              <span>Connect real data to mathematical functions</span>
            </li>
          </ul>
          <p className="mt-4 text-purple-100">
            In this project, limits are applied to environmental resource usage in the school campus using survey-based data and statistical averages.
          </p>
        </section>

        {/* Survey Data */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-green-600" />
            Survey Data (Statistics Integration)
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The data used on this page comes from a student-made survey conducted on campus from December 23 to December 26, with <strong>79 student respondents</strong>. Since the data was collected directly from students, it is considered <strong>primary and authentic data</strong>.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            All averages used in the calculations (such as 5.4 hours of energy use or 3.8 water uses per day) were computed from the actual survey responses. This ensures that the values used in the limit models reflect real student behavior, not assumptions.
          </p>
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <p className="text-green-800">
              To help users better understand the data, the results can be shown using graphs such as <strong>histograms</strong>—useful because they show how responses are spread out, not just the average.
            </p>
          </div>
          <div className="mt-4">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdOlew5pihrCYVLOCMXibjFsGUpt34uQKzt9h1k_mAodo0rmg/viewform?usp=sharing&ouid=117027458158506188459"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              View Original Survey
            </a>
          </div>
        </section>

        {/* Energy Consumption Model */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-600" />
            Energy Consumption: A Limit Model
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Based on the survey, students spend an average of <strong>5.4 hours per school day</strong> in air-conditioned classrooms.
          </p>

          {/* Energy Use Histogram */}
          <div className="mb-6 flex flex-col items-center">
            <img 
              src="/charts/energy-use-distribution.png" 
              alt="Energy Use Distribution (AC Classroom Time)" 
              className="max-w-2xl w-full rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-500 text-center mt-2">Energy Use Distribution (AC Classroom Time)</p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl mb-4 border border-yellow-200">
            <p className="font-semibold text-gray-800 mb-2">Let:</p>
            <ul className="space-y-1 text-gray-700">
              <li><em>E<sub>n</sub></em> = average hours of air-conditioning use based on <em>n</em> survey responses</li>
              <li><em>x</em> = number of air-conditioned classrooms</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              Here, <em>x</em> represents a real quantity on campus, not a variable chosen at random.
            </p>
          </div>

          <p className="text-gray-600 mb-3">As more students answer the survey, the average becomes more stable:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>n→∞</sub> E<sub>n</sub> = 5.4
            </p>
          </div>
          <p className="text-gray-600 mb-4 italic">
            This is why limits are used — they represent a reliable long-term average.
          </p>

          <p className="text-gray-600 mb-3">Using this value, total daily energy use is modeled as:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">E(x) = 5.4x</p>
          </div>

          <p className="text-gray-600 mb-3">For the 9 air-conditioned classrooms used by Grade 11:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>x→9</sub> E(x) = 5.4(9) = 48.6
            </p>
          </div>
          <p className="text-gray-700 font-semibold mb-4">
            This means Grade 11 classrooms use about <span className="text-yellow-600">48.6 total hours</span> of air-conditioning per day.
          </p>

          <p className="text-gray-600 mb-3">As more classrooms are added:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>x→∞</sub> E(x) = ∞
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <p className="text-red-800 font-semibold">
              ⚠️ In real life, this shows that energy use keeps increasing as facilities increase.
            </p>
          </div>
        </section>

        {/* Water Usage Model */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            Water Usage: A Limit Model
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Survey results show that a student uses water about <strong>3.8 times per day</strong> on average.
          </p>

          {/* Water Use Histogram */}
          <div className="mb-6 flex flex-col items-center">
            <img 
              src="/charts/water-use-distribution.png" 
              alt="Water Use Distribution per School Day" 
              className="max-w-2xl w-full rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-500 text-center mt-2">Water Use Distribution per School Day</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl mb-4 border border-blue-200">
            <p className="font-semibold text-gray-800 mb-2">Let:</p>
            <ul className="space-y-1 text-gray-700">
              <li><em>W<sub>n</sub></em> = average daily water use based on <em>n</em> responses</li>
              <li><em>x</em> = number of students</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              Here, <em>x</em> represents the actual student population.
            </p>
          </div>

          <p className="text-gray-600 mb-3">As more responses are collected:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>n→∞</sub> W<sub>n</sub> = 3.8
            </p>
          </div>
          <p className="text-gray-600 mb-4 italic">
            This shows that the average becomes consistent over time.
          </p>

          <p className="text-gray-600 mb-3">Total daily water use is modeled as:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">W(x) = 3.8x</p>
          </div>

          <p className="text-gray-600 mb-3">For around 300 Grade 11 students:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>x→300</sub> W(x) = 3.8(300) = 1140
            </p>
          </div>
          <p className="text-gray-700 font-semibold mb-4">
            This means small individual uses add up to <span className="text-blue-600">1,140 total uses</span> per day.
          </p>

          <p className="text-gray-600 mb-3">As the amount of students increase without bound:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>x→∞</sub> W(x) = ∞
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <p className="text-red-800 font-semibold">
              ⚠️ In real life, this shows that total water consumption keeps growing as the student population increases.
            </p>
          </div>
        </section>

        {/* Waste Generation Model */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trash2 className="h-6 w-6 text-orange-600" />
            Waste Generation: A Limit Model
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            From the survey, each student generates about <strong>1.9 pieces of waste per day</strong>.
          </p>

          {/* Waste Generation Histogram */}
          <div className="mb-6 flex flex-col items-center">
            <img 
              src="/charts/waste-generation-distribution.png" 
              alt="Waste Generation Distribution (Plastic Items)" 
              className="max-w-2xl w-full rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-500 text-center mt-2">Waste Generation Distribution (Plastic Items)</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-xl mb-4 border border-orange-200">
            <p className="font-semibold text-gray-800 mb-2">Let:</p>
            <ul className="space-y-1 text-gray-700">
              <li><em>G<sub>n</sub></em> = average waste generated per student</li>
              <li><em>x</em> = number of students</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              Again, <em>x</em> represents a real group of people, making the model realistic.
            </p>
          </div>

          <p className="text-gray-600 mb-3">As survey responses increase:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>n→∞</sub> G<sub>n</sub> = 1.9
            </p>
          </div>

          <p className="text-gray-600 mb-3">Total daily waste generation is:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">G(x) = 1.9x</p>
          </div>

          <p className="text-gray-600 mb-3">For 300 Grade 11 students:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>x→300</sub> G(x) = 1.9(300) = 570
            </p>
          </div>
          <p className="text-gray-700 font-semibold mb-4">
            This shows how small daily habits create <span className="text-orange-600">570 pieces of waste</span> when combined.
          </p>

          <p className="text-gray-600 mb-3">As the amount of students increase without bound:</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-xl font-mono text-gray-800">
              lim<sub>x→∞</sub> G(x) = ∞
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <p className="text-red-800 font-semibold">
              ⚠️ In real life, this means total waste generation keeps growing as the student population increases.
            </p>
          </div>
        </section>

        {/* Why Is There Still Waste */}
        <section className="bg-amber-50 border border-amber-200 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            🤔 Why Is There Still Waste?
          </h2>
          <p className="text-amber-800 mb-4 leading-relaxed">
            The survey also shows that students bring reusable containers or utensils an average of only <strong>2.1 days per week</strong>. This means that for most days, students still rely on disposable plastics.
          </p>
          <p className="text-amber-800 mb-4 leading-relaxed">
            Although some students practice reuse, it is not consistent enough to significantly reduce total waste generation. This explains why waste continues to accumulate despite awareness of eco-friendly alternatives.
          </p>
          <p className="text-amber-700 italic">
            This histogram visually justifies the average of 1.9 and shows why waste remains present despite partial use of reusables.
          </p>
        </section>

        {/* Connecting Limits to Survey Data */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-purple-600" />
            Connecting Limits to the Survey Data
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            The survey provides the real numbers, while limits help explain what those numbers mean over time and across many people.
          </p>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="text-purple-800">
                <strong>Limits are used because daily habits repeat.</strong> By letting the number of observations grow, limits reduce short-term variation and show realistic long-term behavior.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-red-800">
                <strong>Infinity in this context does not mean endless resources.</strong> It represents a warning: if habits stay the same, total usage will continue increasing.
              </p>
            </div>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">
            By combining survey data, histograms, and limit-based models, this page helps students clearly see how everyday actions lead to larger environmental impacts — making calculus both practical and meaningful.
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">👉 Try the Eco Impact Simulator</h2>
          <p className="mb-6 leading-relaxed">
            Students can use the simulator to track their daily energy use, water use, and waste. It shows how these habits affect the environment, helping them understand their impact and make greener choices.
          </p>
          <p className="text-green-100 text-sm mb-6">
            According to the United Nations Environment Programme (2021), interactive tools that highlight everyday waste can raise awareness. The OECD (2020) also finds that simulations show how small changes, like using more reusable items, can greatly reduce plastic waste over time.
          </p>
          <Link 
            href="/simulator"
            className="inline-block bg-white text-green-600 font-bold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            Go to Simulator →
          </Link>
        </section>

        {/* References */}
        <section className="bg-gray-100 p-6 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-3">📚 References</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <strong>OECD source:</strong> Organisation for Economic Co-operation and Development. (2020). <em>Using simulations to support learning: Evidence from education research</em> (EDU/WKP(2020)14). OECD. 
              <a href="https://one.oecd.org/document/EDU/WKP(2020)14/en/pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                https://one.oecd.org/document/EDU/WKP(2020)14/en/pdf
              </a>
            </li>
            <li>
              <strong>UNEP source:</strong> United Nations Environment Programme. (n.d.). <em>Digitalization for sustainability</em>. UNEP. 
              <a href="https://www.unep.org/topics/digital-transformations/digitalization-sustainability" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                https://www.unep.org/topics/digital-transformations/digitalization-sustainability
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
