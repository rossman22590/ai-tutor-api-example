"use client";
import { useState } from 'react';
import StoryDisplay from '@/components/StoryDisplay';
import { FaGithub, FaCode, FaCheck } from 'react-icons/fa';

// API Response Type Definitions
interface ApiSuccessResponse {
  success: boolean;
  result: string;
  workflow_id?: string;
  run_id?: string;
}

interface ApiErrorResponse {
  success: boolean;
  error: string;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Form Data Interface (all fields included)
interface FormData {
  BusinessPlan: string;
  ProductName: string;
  CompanyName: string;
  MissionStatement: string;
  BusinessObjectives: string;
  BusinessOverview: string;
  MarketNeeds: string;
  UniqueSellingProposition: string;
  objective: string;
}

export default function Home() {
  // Form State Management
  const [formData, setFormData] = useState<FormData>({
    BusinessPlan: '',
    ProductName: '',
    CompanyName: '',
    MissionStatement: '',
    BusinessObjectives: '',
    BusinessOverview: '',
    MarketNeeds: '',
    UniqueSellingProposition: '',
    objective: '',
  });

  const [result, setResult] = useState<ApiSuccessResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Valid Fields State for Visual Feedback
  const [validFields, setValidFields] = useState<Record<keyof FormData, boolean>>({
    BusinessPlan: false,
    ProductName: false,
    CompanyName: false,
    MissionStatement: false,
    BusinessObjectives: false,
    BusinessOverview: false,
    MarketNeeds: false,
    UniqueSellingProposition: false,
    objective: false,
  });

  // Form Validation: Ensure that all fields are filled
  const validateForm = (): boolean => {
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(', ')}`);
      return false;
    }
    return true;
  };

  // Input Change Handler: Updates form data and valid state
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidFields(prev => ({ ...prev, [name]: value.trim().length > 0 }));
    if (error) setError('');
  };

  // Form Submission Handler: Validate and submit data to the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && 'result' in data) {
        setResult(data as ApiSuccessResponse);
      } else {
        setError(
          (data as ApiErrorResponse).error ||
            'An error occurred while processing the request.'
        );
      }
    } catch (err) {
      setError('An error occurred while fetching the response.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 p-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text inline-block">
            Business Plan Generator
          </h1>
        </div>

        <div className="glass-morphism p-8 mb-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="space-y-2">
                <label
                  htmlFor={key}
                  className="block text-lg font-medium text-gray-700 flex items-center justify-between"
                >
                  <span>{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  {validFields[key as keyof FormData] && (
                    <FaCheck className="text-green-500" />
                  )}
                </label>
                <textarea
                  id={key}
                  name={key}
                  value={formData[key as keyof FormData]}
                  onChange={handleChange}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}...`}
                  className={`w-full p-4 rounded-lg bg-white/50 border ${
                    validFields[key as keyof FormData]
                      ? 'border-green-200 focus:ring-green-400'
                      : 'border-purple-200 focus:ring-purple-400'
                  } text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent shadow-inner min-h-[100px]`}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading || !Object.values(validFields).every(Boolean)}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                'Generate Plan'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="glass-morphism p-4 mb-8 text-red-600 text-center rounded-lg bg-red-50/50">
            {error}
          </div>
        )}

        {result && <StoryDisplay result={result} />}
      </div>
    </div>
  );
}

