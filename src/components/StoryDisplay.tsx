// src/components/StoryDisplay.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ApiSuccessResponse } from '@/types';

interface StoryDisplayProps {
  result: ApiSuccessResponse;
  onClose?: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ result, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-8"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">Generated Content</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          )}
        </div>
        <div className="prose prose-invert max-w-none">
          <pre className="text-gray-300 whitespace-pre-wrap overflow-auto">
            {result.result}
          </pre>
        </div>
        {result.workflow_id && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Workflow ID: {result.workflow_id}
            </p>
            {result.run_id && (
              <p className="text-sm text-gray-400">
                Run ID: {result.run_id}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StoryDisplay;
