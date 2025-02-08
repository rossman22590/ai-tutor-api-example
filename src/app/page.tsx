// src/app/page.tsx
"use client";
import { useState } from 'react';
import StoryDisplay from '@/components/StoryDisplay';
import StreamingChat from '@/components/StreamingChat';
import { FaGithub, FaRobot, FaCode, FaStream, FaKey } from 'react-icons/fa';

interface TokenResponse {
  success: boolean;
  token: string;
}

export default function Home() {
    const [story, setStory] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'workflow' | 'chat' | 'streaming' | 'token'>('workflow');
    const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(null);
    const [tokenLoading, setTokenLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!story.trim()) {
            setError('Please enter a story');
            return;
        }
        setError('');
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ story }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
                setError('');
            } else {
                setError(data.error || 'An error occurred while fetching the story.');
            }
        } catch (err) {
            setError('An error occurred while fetching the story.');
        } finally {
            setLoading(false);
        }
    };

    const handleGetToken = async () => {
        setTokenLoading(true);
        setError('');
        try {
            const response = await fetch('/api/token', {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                setTokenResponse(data);
            } else {
                setError(data.error || 'Failed to get token');
            }
        } catch (err) {
            setError('Failed to get token');
        } finally {
            setTokenLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8">
            <div className="max-w-3xl mx-auto">
                {/* Top Buttons Row */}
                <div className="flex justify-between items-center mb-6">
                    {/* Mode Switch Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setMode('workflow')}
                            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 gap-2 ${
                                mode === 'workflow'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/30 text-gray-700 hover:bg-white/50'
                            }`}
                        >
                            <FaCode className="text-xl" />
                            Workflow
                        </button>
                        <button
                            onClick={() => setMode('chat')}
                            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 gap-2 ${
                                mode === 'chat'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/30 text-gray-700 hover:bg-white/50'
                            }`}
                        >
                            <FaRobot className="text-xl" />
                            Chat
                        </button>
                        <button
                            onClick={() => setMode('streaming')}
                            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 gap-2 ${
                                mode === 'streaming'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/30 text-gray-700 hover:bg-white/50'
                            }`}
                        >
                            <FaStream className="text-xl" />
                            Streaming
                        </button>
                        <button
                            onClick={() => setMode('token')}
                            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 gap-2 ${
                                mode === 'token'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/30 text-gray-700 hover:bg-white/50'
                            }`}
                        >
                            <FaKey className="text-xl" />
                            Get Token
                        </button>
                    </div>

                    {/* Deploy Button */}
                    <a
                        href="https://github.com/yourusername/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-black/80 text-white rounded-lg hover:bg-black transition-colors duration-200 gap-2"
                    >
                        <FaGithub className="text-xl" />
                        Deploy your own
                    </a>
                </div>

                <div className="text-center mb-8 p-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text inline-block" 
                        style={{ lineHeight: '1.5', padding: '0.5em 0' }}>
                        AI Story Generator
                    </h1>
                </div>

                {mode === 'workflow' ? (
                    <>
                        <div className="glass-morphism p-8 mb-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="story" className="block text-lg font-medium text-gray-700">
                                        Enter your story prompt:
                                    </label>
                                    <input
                                        id="story"
                                        type="text"
                                        value={story}
                                        onChange={(e) => setStory(e.target.value)}
                                        placeholder="E.g., Tell me a story about a magical forest..."
                                        className="w-full p-4 rounded-lg bg-white/50 border border-purple-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-inner"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </span>
                                    ) : (
                                        'Generate Story'
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
                    </>
                ) : mode === 'chat' ? (
                    <div className="glass-morphism p-8 mb-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
                        <iframe 
                            src="https://aitutor-api.vercel.app/embed/chatbot/cm6w0fkel0001vfbweh9y6j1a"
                            className="w-full h-[600px] rounded-lg"
                        />
                    </div>
                ) : mode === 'streaming' ? (
                    <div className="glass-morphism p-8 mb-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
                        <StreamingChat />
                    </div>
                ) : (
                    <div className="glass-morphism p-8 mb-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
                        <div className="flex flex-col items-center space-y-6">
                            <button
                                onClick={handleGetToken}
                                disabled={tokenLoading}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <FaKey />
                                {tokenLoading ? 'Getting Token...' : 'Get New Token'}
                            </button>
                            
                            {tokenResponse && (
                                <div className="w-full space-y-4">
                                    <div className="p-4 bg-white/50 rounded-lg">
                                        <p className="text-gray-700 font-medium mb-2">Token:</p>
                                        <code className="block p-3 bg-gray-100 rounded border border-gray-200 text-sm overflow-x-auto">
                                            {tokenResponse.token}
                                        </code>
                                    </div>
                                    
                                    <div className="p-4 bg-white/50 rounded-lg">
                                        <p className="text-gray-700 font-medium mb-2">Full Response:</p>
                                        <pre className="block p-3 bg-gray-100 rounded border border-gray-200 text-sm overflow-x-auto whitespace-pre-wrap">
                                            {JSON.stringify(tokenResponse, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="w-full p-4 bg-red-50 rounded-lg text-red-600">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
