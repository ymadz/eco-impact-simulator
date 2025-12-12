import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Eco-Impact Tracker
              </h1>
              <p className="text-sm text-gray-600">
                Track your environmental footprint
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
