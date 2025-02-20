"use client";
import { useState } from 'react';
import WorkoutDisplay from '../components/WorkoutDisplay';
import { FaDumbbell } from 'react-icons/fa';

type WorkoutResult = {
  workout?: any;
  mealPlan?: any;
  error?: string;
};

export default function Home() {
  const [workoutParams, setWorkoutParams] = useState({
    bodypart: '',
    difficulty: '',
    time: ''
  });
  const [workoutResult, setWorkoutResult] = useState<WorkoutResult | null>(null);
  const [workoutError, setWorkoutError] = useState('');
  const [workoutLoading, setWorkoutLoading] = useState(false);

  const handleWorkoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutParams.bodypart.trim() || !workoutParams.difficulty.trim() || !workoutParams.time.trim()) {
      setWorkoutError('Please fill in all fields for workout');
      return;
    }
    
    setWorkoutError('');
    setWorkoutLoading(true);
    setWorkoutResult(null);
    
    try {
      console.log('Starting multi-step workflow with params:', workoutParams);
      
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workoutParams,
          type: 'workout',
          isMultiStep: true
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Multi-step workflow completed successfully:', data);
        setWorkoutResult({
          workout: data.workout || data.firstWorkflowData || data,
          mealPlan: data.mealPlan || data.secondWorkflowData || data.recommendations
        });
      } else {
        console.error('Workflow failed:', data.error);
        setWorkoutError(data.error || 'An error occurred while generating the workout plan.');
      }
    } catch (err) {
      console.error('Frontend Error:', err);
      setWorkoutError('An error occurred while generating the workout plan.');
    } finally {
      setWorkoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 p-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text inline-block">
            AI Workout Generator
          </h1>
        </div>

        {/* Form */}
        <div className="glass-morphism p-8 mb-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
          <form onSubmit={handleWorkoutSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="bodypart" className="block text-lg font-medium text-gray-700">
                  Body Part:
                </label>
                <select
                  id="bodypart"
                  value={workoutParams.bodypart}
                  onChange={(e) => setWorkoutParams({ ...workoutParams, bodypart: e.target.value })}
                  className="w-full p-4 rounded-lg bg-white/50 border border-purple-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-inner"
                >
                  <option value="">Select Body Part</option>
                  <option value="full body">Full Body</option>
                  <option value="upper body">Upper Body</option>
                  <option value="lower body">Lower Body</option>
                  <option value="core">Core</option>
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-lg font-medium text-gray-700">
                  Difficulty:
                </label>
                <select
                  id="difficulty"
                  value={workoutParams.difficulty}
                  onChange={(e) => setWorkoutParams({ ...workoutParams, difficulty: e.target.value })}
                  className="w-full p-4 rounded-lg bg-white/50 border border-purple-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-inner"
                >
                  <option value="">Select Difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="time" className="block text-lg font-medium text-gray-700">
                  Workout Duration:
                </label>
                <select
                  id="time"
                  value={workoutParams.time}
                  onChange={(e) => setWorkoutParams({ ...workoutParams, time: e.target.value })}
                  className="w-full p-4 rounded-lg bg-white/50 border border-purple-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-inner"
                >
                  <option value="">Select Duration</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={workoutLoading}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {workoutLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Workout & Meal Plan...
                </span>
              ) : (
                'Generate Workout & Meal Plan'
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {workoutError && (
          <div className="glass-morphism p-4 mb-8 text-red-600 text-center rounded-lg bg-red-50/50">
            {workoutError}
          </div>
        )}

        {/* Results Display */}
        {workoutResult && (
          <div className="space-y-6">
            {workoutResult.workout && (
              <div className="glass-morphism p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Your Workout Plan</h2>
                <WorkoutDisplay result={workoutResult.workout} />
              </div>
            )}
            
            {workoutResult.mealPlan && (
              <div className="glass-morphism p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Recommended Meal Plan</h2>
                <WorkoutDisplay result={workoutResult.mealPlan} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
