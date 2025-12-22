import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-gray-900">Eco-Impact Simulator</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/simulator" className="text-gray-600 hover:text-green-600 transition-colors">
              Calculator
            </Link>
            <Link href="/chemistry" className="text-gray-600 hover:text-green-600 transition-colors">
              Chemistry
            </Link>
            <Link href="/drrr" className="text-gray-600 hover:text-green-600 transition-colors">
              Safety
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
              About
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Eco-Impact Simulator: School Edition</p>
        </div>
      </div>
    </footer>
  );
}
