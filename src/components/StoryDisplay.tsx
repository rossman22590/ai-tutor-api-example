// src/components/StoryDisplay.tsx
"use client";
import { useState, useEffect } from 'react';

interface StoryDisplayProps {
  result: {
    result?: string;
    success?: boolean;
  };
}

export default function StoryDisplay({ result }: StoryDisplayProps) {
    const [formattedResult, setFormattedResult] = useState('');

    useEffect(() => {
        if (result && result.result) {
            setFormattedResult(result.result);
        }
    }, [result]);

    return (
        <div className="glass-morphism p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Business Plan</h2>
            <pre className="whitespace-pre-wrap text-gray-700">{formattedResult}</pre>
        </div>
    );
}
