import { Leaf, Target, BookOpen, Users, Code, User, Info } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    { 
      name: 'Ali, Alia', 
      role: 'Project Lead and Website Concept Developer',
      image: '/team/alia.jpg'
    },
    { 
      name: 'Abing, Maybelle', 
      role: 'Data Interpretation and Content Organization',
      image: '/team/maybelle.jpg'
    },
    { 
      name: 'Maca-alin, Sheena', 
      role: 'Survey Development and Content Verification',
      image: '/team/sheena.jpg'
    },
    { 
      name: 'Tabuelog, Hayden', 
      role: 'Data Analyst and Project Drafting Lead',
      image: '/team/hayden.jpg'
    },
    { 
      name: 'Ogoc, Jeshua', 
      role: 'Lead Mathematical Analyst',
      image: '/team/jeshua.jpg'
    },
    { 
      name: 'Yahya, Maha', 
      role: 'Content Writer and Subject Integration Editor',
      image: '/team/maha.jpg'
    },
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
            Eco-Impact Simulator: School Edition is a web-based tool that lets students explore, measure, and reduce their impact on the environment.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A complete and clean school environment i mb-4">
            The Eco-impact Simulator: School Edition turns real-world environmental problems into interactive learning. 
            Students can explore how waste, energy, and water use affect the environment, while Chemistry calculators 
            show how everyday substances can become harmful over time.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Thanks to Empowerment Technology (E-Tech), the website lets users track their habits and see their 
            Eco-Impact Score, a simple number that shows the effect of their consumption. It also includes a DRRR 
            module to help identify and report hazards easily.
          </p>
        </section>

        {/* Objectives Section */}
        <section className="bg-blue-50 border border-blue-200 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            🎯 Objectives
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Background</h3>
              <p className="text-blue-700 leading-relaxed">
                Pollution and disaster risks often go unnoticed in schools and communities. E-Tech allows the 
                simulator to combine Chemistry tools, hazard reporting, and Eco-Impact scoring in one platform. 
                Users can see how small actions add up to real environmental effects.
            Concept */}
        <section className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-green-600" />
            Concept
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The Eco-Impact Simulator integrates multiple academic subjects into one interactive platform. 
            Students can calculate their resource consumption, understand chemical pollution through 
            concentration formulas, and report environmental hazards—all while seeing real-time feedback 
            on their ecological footprint.
          </pIncrease the awareness of the effects of excessive resource consumption.',
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
            <Code classNamspace-y-4">
            {[
              {
                subject: 'E-Tech',
                color: 'purple',
                description: 'E-tech was integrated into this project through the use of technological tools that provide eco-impact score results based on user input on water usage, energy use, and waste production, promoting proper resource consumption daily.'
              },
              {
                subject: 'Chemistry',
                color: 'blue',
                description: 'Chemistry was integrated into this website through the addition of a percent-by-weight calculator and water body comparison feature that allows users to input specific values to determine the environmental impact of pollutants.'
              },
              {
                subject: 'DRRR',
                color: 'red',
                description: 'Disaster Risk Reduction was integrated through key concepts such as mitigation and preparedness. Users are allowed to report specific types of hazards and receive safety tips along with a checklist of essential necessities.'
              },
              {
                subject: 'Statistics',
                color: 'green',
                description: 'Statistics was integrated into this website through the collection and analysis of survey data about resource consumption, relating to probability distributions and patterns.'
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className={`p-4 rounded-xl border-2 border-${item.color}-200 bg-${item.color}-50 hover:shadow-md transition-all`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full bg-${item.color}-500 flex items-center justify-center flex-shrink-0`}>
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-${item.color}-900 mb-2`}>{item.subject}</h3>
                      <p className={`text-sm text-${item.color}-700 leading-relaxed`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}d className="px-4 py-3 text-gray-600">Data Aggregation, Trends Analysis</td>
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
            <lCannot provide precise real-time data - relies on estimated calculations and user input.
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              Focuses on awareness and education rather than enforcement or policy change.
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              Limited to school environment contexts and common household pollutants.
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
              'A functional and informative sustainability website',
              'Increased awareness of personal resource consumption',
              'Improved understanding of environmental impact among users',
              'A strong demonstration of subject integration and advocacy0 p-4 rounded-xl">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-gray-700">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Members */}
        <section className="bg-white p-8 1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>';
                    }}
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-center mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600 text-center leading-snug
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
