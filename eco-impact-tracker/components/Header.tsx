import { Leaf, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoTrack</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              History
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
              Settings
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-slate-200 hover:bg-slate-50"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md cursor-pointer hover:scale-110 transition-transform">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
