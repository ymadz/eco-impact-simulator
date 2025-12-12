import { Leaf, Download, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-md">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoTrack</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Simulator
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Goals
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Settings
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors hidden sm:block">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-slate-200 hover:bg-slate-50 rounded-xl"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>

            {/* User Avatar */}
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-sm font-semibold shadow-sm cursor-pointer hover:scale-105 transition-transform">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
