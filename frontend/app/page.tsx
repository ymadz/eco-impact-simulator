import Link from 'next/link';
import { Leaf, Zap, FlaskConical, Shield, ArrowRight, Target, Lightbulb, BarChart3, Sparkles } from 'lucide-react';
import DidYouKnow from '@/components/DidYouKnow';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-600 to-emerald-700 text-white py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-3xl">
                <Leaf className="h-14 w-14" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Eco-Impact Simulator
            </h1>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <p className="text-lg font-medium">
                🏫 School Edition
              </p>
            </div>
            <p className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              An interactive educational tool to help students understand and reduce their 
              environmental impact through simulation, experimentation, and awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulator"
                className="bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105"
              >
                Start Simulation <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="border-2 border-white/80 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore Our Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover interactive tools designed to help you understand your environmental impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Simulator Card */}
            <Link href="/simulator" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-full">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Resource Simulator
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Adjust electricity, water, and waste values to see how your habits affect 
                  your environmental impact with real-time scoring.
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:gap-3 transition-all">
                  Try it now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Chemistry Lab Card */}
            <Link href="/chemistry" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FlaskConical className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Chemistry Lab
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Explore how pollution concentration affects different water bodies using 
                  chemical dilution principles.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  Experiment now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* DRRR Card */}
            <Link href="/drrr" className="group">
              <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 h-full">
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  DRRR Safety Center
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Practice hazard identification and report potential risks. Learn safety 
                  tips for disaster preparedness.
                </p>
                <div className="flex items-center text-orange-600 font-semibold">
                  Report hazard <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <DidYouKnow />

      {/* Objectives Section */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Objectives
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What we aim to achieve through this educational platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Target className="h-6 w-6 text-green-600" />,
                title: 'Increase Awareness',
                description: 'Understand the effects of excessive resource consumption on our environment.',
                bgColor: 'bg-green-50',
              },
              {
                icon: <Lightbulb className="h-6 w-6 text-yellow-600" />,
                title: 'Encourage Conservation',
                description: 'Motivate students and staff to minimize daily consumption of resources.',
                bgColor: 'bg-yellow-50',
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
                title: 'Monitor & Mitigate',
                description: 'Track estimated highest consumption daily to prepare efficiency measures.',
                bgColor: 'bg-blue-50',
              },
              {
                icon: <Sparkles className="h-6 w-6 text-purple-600" />,
                title: 'Promote Creativity',
                description: 'Inspire solutions and ideas that everyone can participate in making.',
                bgColor: 'bg-purple-50',
              },
            ].map((objective, index) => (
              <div
                key={index}
                className="flex gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className={`${objective.bgColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {objective.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{objective.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{objective.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
            Start exploring the simulator and discover how small changes in your daily 
            habits can have a big impact on our environment.
          </p>
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-500 transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-xl hover:scale-105"
          >
            Launch Simulator <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
