import { Leaf, Target, BookOpen, Users, Code, User } from 'lucide-react';

export default function AboutPage() {
  // Team members placeholder data
  const teamMembers = [
    { name: 'Team Member 1', role: 'Role / Position', image: null },
    { name: 'Team Member 2', role: 'Role / Position', image: null },
    { name: 'Team Member 3', role: 'Role / Position', image: null },
    { name: 'Team Member 4', role: 'Role / Position', image: null },
    { name: 'Team Member 5', role: 'Role / Position', image: null },
    { name: 'Team Member 6', role: 'Role / Position', image: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About This Project
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Eco-Impact Simulator: School Edition is an educational web application 
            designed to help students understand and reduce their environmental impact.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A complete and clean school environment is essential for students as they are 
            needed for the entirety of their well-being, daily lives and overall education. 
            However, schools suffer from the usage and consumption of these resources, 
            especially when they house a significant number of students. This project aims 
            to promote an idea that highlights the daily consumption and generation of waste 
            in the school, to spread awareness and recommend solutions in order to support 
            the safety of our ecosystem.
          </p>
        </section>

        {/* Problem Statement */}
        <section className="bg-red-50 border border-red-200 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            ⚠️ Problem Statement
          </h2>
          <p className="text-red-700 leading-relaxed">
            Our school experiences issues regarding water, material and electricity 
            consumption as well as the waste that gets generated from the consumption 
            of these products. These problems not only contribute to damage that affects 
            our environment, but also health risks from unsafe and non-sterile environmental 
            concerns.
          </p>
        </section>

        {/* Objectives */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-green-600" />
            Objectives
          </h2>
          <div className="space-y-4">
            {[
              'Increase the awareness of the effects of excessive resource consumption.',
              'Encourage students and school employees to minimize daily consumption of these resources.',
              'To monitor the estimated highest consumption daily in order to prepare mitigation measures for efficiency.',
              'Promote creativity by solutions and ideas that students and employees can participate in making.',
            ].map((objective, index) => (
              <div key={index} className="flex gap-4 items-start">
                <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-gray-600 pt-1">{objective}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Integration */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-green-600" />
            Academic Integration
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Subject</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Feature</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">Concept</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-600">E-Tech</td>
                  <td className="px-4 py-3 text-gray-600">Web Interface</td>
                  <td className="px-4 py-3 text-gray-600">UX/UI Design, JavaScript, Interactive State</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-600">Chemistry</td>
                  <td className="px-4 py-3 text-gray-600">Pollution Lab</td>
                  <td className="px-4 py-3 text-gray-600">Concentration (%wt, C=n/V), Dilution</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-600">DRRR</td>
                  <td className="px-4 py-3 text-gray-600">Safety Center</td>
                  <td className="px-4 py-3 text-gray-600">Hazard Identification, Risk Reduction</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-600">Statistics</td>
                  <td className="px-4 py-3 text-gray-600">Survey Insights</td>
                  <td className="px-4 py-3 text-gray-600">Data Aggregation, Trends Analysis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SDGs */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Supporting UN Sustainable Development Goals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'SDG 4', description: 'Quality Education' },
              { icon: '💧', title: 'SDG 6', description: 'Clean Water & Sanitation' },
              { icon: '⚡', title: 'SDG 7', description: 'Affordable & Clean Energy' },
              { icon: '🏙️', title: 'SDG 11', description: 'Sustainable Cities' },
              { icon: '♻️', title: 'SDG 12', description: 'Responsible Consumption' },
              { icon: '🌍', title: 'SDG 13', description: 'Climate Action' },
            ].map((sdg, index) => (
              <div key={index} className="bg-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sdg.icon}</span>
                  <div>
                    <div className="font-bold">{sdg.title}</div>
                    <div className="text-green-100 text-sm">{sdg.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section className="bg-yellow-50 border border-yellow-200 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">
            ⚡ Limitations
          </h2>
          <ul className="space-y-2 text-yellow-700">
            <li className="flex items-start gap-2">
              <span>•</span>
              This project does not cover creation and innovation of new revolutionary products.
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              Cannot provide precise data of daily consumption - uses hypothetical simulations.
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              Focuses on minimizing waste generation, not complete elimination.
            </li>
          </ul>
        </section>

        {/* Expected Outcomes */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🎯 Expected Outcomes
          </h2>
          <div className="space-y-4">
            {[
              'Improved awareness and involvement of all consumers to minimize waste generation and protect the environment together.',
              'Stronger school relationship and unity as one community.',
              'Practical application of LSA Virtues and SDGs in daily life.',
            ].map((outcome, index) => (
              <div key={index} className="flex gap-3 items-start bg-green-50 p-4 rounded-xl">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-gray-700">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Members */}
        <section className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-green-600" />
            Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            Meet the dedicated team behind the Eco-Impact Simulator project.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
