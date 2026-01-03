'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Calculator, FlaskConical, ShieldAlert, Info } from 'lucide-react';
import { SURVEY_STATS } from '@/lib/constants';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        {/* Hero Image - Nature focused */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
            alt="Sunlight through green forest trees"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8" />
              <span className="text-lg font-medium">Eco-Impact Simulator</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
              School Edition
            </h1>
            <p className="text-lg md:text-xl text-center max-w-2xl text-white/90 mb-8">
              Calculate your environmental impact and learn how small changes make a big difference
            </p>
            <Link
              href="/simulator"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              Start Calculating
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wide">Explore</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Integrated Learning Modules
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simulator integrates multiple subjects to help you understand environmental science from different perspectives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resource Simulator */}
            <Link href="/simulator" className="group">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-green-300 hover:bg-white transition-all h-full">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <Calculator className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Resource Simulator</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Calculate your carbon footprint from daily resource consumption
                </p>
                <span className="text-xs text-green-600 font-medium">E-Tech Integration →</span>
              </div>
            </Link>

            {/* Chemistry Lab */}
            <Link href="/chemistry" className="group">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 hover:bg-white transition-all h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
                  <FlaskConical className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Pollution Lab</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Visualize pollutant concentration and dilution calculations
                </p>
                <span className="text-xs text-purple-600 font-medium">Chemistry Integration →</span>
              </div>
            </Link>

            {/* Safety Center */}
            <Link href="/drrr" className="group">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-orange-300 hover:bg-white transition-all h-full">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                  <ShieldAlert className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety Center</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Report hazards and learn disaster risk reduction protocols
                </p>
                <span className="text-xs text-orange-600 font-medium">DRRR Integration →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* Survey Insights Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Info className="w-4 h-4" />
              <span>E-Tech Integration: Survey Data Analysis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Survey Insights from Our School
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real data collected from students about their daily resource consumption and waste habits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SURVEY_STATS.map((stat) => (
              <div key={stat.id} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">{stat.stat}</div>
                    <p className="text-sm text-gray-600 mb-3">{stat.description}</p>
                    <div className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      💡 {stat.action}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wide">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enter Your Data</h3>
              <p className="text-gray-600 text-sm">
                Input your daily resource consumption including electricity, water, and waste
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calculate Impact</h3>
              <p className="text-gray-600 text-sm">
                Our algorithms calculate your environmental footprint using scientific formulas
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Learn & Improve</h3>
              <p className="text-gray-600 text-sm">
                Get personalized tips and see how changes affect your long-term impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <p className="text-gray-600 text-sm">Students improved eco-awareness</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1,200+</div>
              <p className="text-gray-600 text-sm">Simulations completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <p className="text-gray-600 text-sm">Subjects integrated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">∞</div>
              <p className="text-gray-600 text-sm">Learning possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Calculate Your Impact?
          </h2>
          <p className="text-green-100 mb-8">
            Start using the Eco-Impact Simulator today and take the first step towards a greener future
          </p>
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Launch Simulator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
