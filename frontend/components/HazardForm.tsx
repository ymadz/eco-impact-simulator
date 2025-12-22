'use client';

import { useState } from 'react';
import { HAZARD_TYPES, SEVERITY_LEVELS } from '@/lib/constants';
import { AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';

interface HazardFormProps {
  onSubmit?: (data: any) => void;
}

export default function HazardForm({ onSubmit }: HazardFormProps) {
  const [step, setStep] = useState(1);
  const [hazardType, setHazardType] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedHazard = hazardType ? HAZARD_TYPES[hazardType as keyof typeof HAZARD_TYPES] : null;

  const handleQuestionResponse = (questionId: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const reportData = {
      hazard_type: hazardType,
      severity,
      location,
      description,
      responses,
    };

    // Save to localStorage for demo
    const existingReports = JSON.parse(localStorage.getItem('hazard_reports') || '[]');
    existingReports.push({ ...reportData, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('hazard_reports', JSON.stringify(existingReports));

    if (onSubmit) {
      onSubmit(reportData);
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setHazardType('');
    setSeverity('');
    setResponses({});
    setDescription('');
    setLocation('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for reporting this hazard. School staff will review it shortly.
        </p>

        {selectedHazard && (
          <div className="bg-yellow-50 p-6 rounded-xl text-left mb-6">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Safety Tips for {selectedHazard.name}
            </h3>
            <ul className="space-y-2">
              {selectedHazard.tips.map((tip, index) => (
                <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={resetForm}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Report Another Hazard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 ${step > s ? 'bg-green-600' : 'bg-gray-200'}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Hazard Type */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What type of hazard?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(HAZARD_TYPES).map(([key, hazard]) => (
              <button
                key={key}
                onClick={() => {
                  setHazardType(key);
                  setStep(2);
                }}
                className={`p-6 rounded-xl border-2 transition-all hover:border-green-500 hover:bg-green-50 ${
                  hazardType === key ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="text-4xl mb-2">{hazard.icon}</div>
                <div className="font-semibold text-gray-800">{hazard.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Answer Questions */}
      {step === 2 && selectedHazard && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedHazard.icon} {selectedHazard.name} Report
          </h2>

          <div className="space-y-6">
            {/* Severity Selection */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                How severe is this hazard?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(SEVERITY_LEVELS).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setSeverity(key)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      severity === key ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${level.color}`} />
                      <span className="font-semibold">{level.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{level.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Guided Questions */}
            {selectedHazard.questions.map((question) => (
              <div key={question.id}>
                <label className="block font-semibold text-gray-700 mb-3">
                  {question.text}
                </label>
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleQuestionResponse(question.id, option)}
                      className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                        responses[question.id] === option
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Location */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Location (optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Room 201, Near the cafeteria"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-full border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!severity}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && selectedHazard && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Submit</h2>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Hazard Type:</span>
                <p className="font-semibold">{selectedHazard.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Severity:</span>
                <p className="font-semibold capitalize">{severity}</p>
              </div>
              {location && (
                <div className="col-span-2">
                  <span className="text-gray-500">Location:</span>
                  <p className="font-semibold">{location}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-3">
              Additional details (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide any additional information..."
              rows={4}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-full border-2 border-gray-200 font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Submit Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
