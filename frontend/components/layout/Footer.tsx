import { Leaf, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-green-400 mb-4">
              <Leaf className="h-6 w-6" />
              <span>Eco-Impact Simulator</span>
            </div>
            <p className="text-gray-400">
              An educational tool to help students understand and reduce their environmental impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/simulator" className="text-gray-400 hover:text-green-400 transition-colors">
                  Simulator Dashboard
                </Link>
              </li>
              <li>
                <Link href="/chemistry" className="text-gray-400 hover:text-green-400 transition-colors">
                  Chemistry Lab
                </Link>
              </li>
              <li>
                <Link href="/drrr" className="text-gray-400 hover:text-green-400 transition-colors">
                  DRRR Safety Center
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* SDGs */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Supporting SDGs</h3>
            <ul className="space-y-2 text-gray-400">
              <li>🎯 SDG 4: Quality Education</li>
              <li>💧 SDG 6: Clean Water & Sanitation</li>
              <li>⚡ SDG 7: Affordable & Clean Energy</li>
              <li>🏙️ SDG 11: Sustainable Cities</li>
              <li>♻️ SDG 12: Responsible Consumption</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for a sustainable future
          </p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} Eco-Impact Simulator: School Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
