// src/components/ContentDisplay.tsx
"use client";
import { useEffect, useState } from 'react';
import { FaHeart, FaBookOpen, FaClock, FaUtensils, FaBriefcase, FaList, FaShareAlt, FaTwitter, FaFacebook, FaLink } from 'react-icons/fa';

interface ContentDisplayProps {
  result: {
    result: string;
    success?: boolean;
  };
  type: 'story' | 'food' | 'business';
}

interface ParsedContent {
  title: string;
  content: any;
  metadata: {
    readingTime?: string;
    ingredientCount?: number;
    sections?: string[];
  };
}

export default function ContentDisplay({ result, type }: ContentDisplayProps) {
    const [parsedContent, setParsedContent] = useState<ParsedContent | null>(null);

    useEffect(() => {
        if (result && result.result) {
            switch (type) {
                case 'story':
                    setParsedContent(parseStory(result.result));
                    break;
                case 'food':
                    setParsedContent(parseRecipe(result.result));
                    break;
                case 'business':
                    setParsedContent(parseBusinessPlan(result.result));
                    break;
            }
        }
    }, [result, type]);

    const parseStory = (text: string) => {
        const lines = text.split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();
        const wordCount = content.split(/\s+/).length;

        return {
            title,
            content,
            metadata: {
                readingTime: `${Math.ceil(wordCount / 200)} min read`
            }
        };
    };

    const parseRecipe = (text: string) => {
        const lines = text.split('\n');
        const title = lines[0].trim();
        let currentSection = '';
        const sections: Record<string, string[]> = {};

        for (const line of lines.slice(1)) {
            if (line.startsWith('#')) {
                currentSection = line.replace('#', '').trim();
                sections[currentSection] = [];
            } else if (currentSection && line.trim()) {
                sections[currentSection].push(line.trim());
            }
        }

        const ingredients = sections['Ingredients'] || [];
        const instructions = sections['Instructions'] || [];
        const tips = sections['Tips for Extra Love'] || [];

        return {
            title,
            content: { 
                ingredients, 
                instructions,
                tips
            },
            metadata: {
                ingredientCount: ingredients.length
            }
        };
    };
    
    const parseBusinessPlan = (text: string) => {
        const lines = text.split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();

        return {
            title,
            content,
            metadata: {}
        };
    };

    if (!parsedContent) return null;

    const renderContent = () => {
        switch (type) {
            case 'story':
                return (
                    <div className="text-white whitespace-pre-wrap">{parsedContent.content}</div>
                );

            case 'food':
                return (
                    <div className="space-y-8">
                        <div className="bg-white/5 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Ingredients</h2>
                            <ul className="list-disc list-inside text-white">
                                {parsedContent.content.ingredients.map((ingredient: string, index: number) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
                            <ol className="list-decimal list-inside text-white">
                                {parsedContent.content.instructions.map((instruction: string, index: number) => (
                                    <li key={index} className="mb-2">{instruction}</li>
                                ))}
                            </ol>
                        </div>
                        {parsedContent.content.tips.length > 0 && (
                            <div className="bg-white/5 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Tips</h2>
                                <ul className="list-disc list-inside text-white">
                                    {parsedContent.content.tips.map((tip: string, index: number) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );

            case 'business':
                return (
                    <div className="text-white whitespace-pre-wrap">{parsedContent.content}</div>
                );
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'story': return <FaBookOpen />;
            case 'food': return <FaUtensils />;
            case 'business': return <FaBriefcase />;
        }
    };

    return (
        <div className="mt-8 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">
                        {parsedContent.title}
                    </h1>
                    <div className="flex items-center gap-6 text-white">
                        <div className="flex items-center gap-2">
                            {getIcon()}
                            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                        </div>
                        {parsedContent.metadata.readingTime && (
                            <div className="flex items-center gap-2">
                                <FaClock />
                                <span>{parsedContent.metadata.readingTime}</span>
                            </div>
                        )}
                        {parsedContent.metadata.ingredientCount && (
                            <div className="flex items-center gap-2">
                                <FaList />
                                <span>{parsedContent.metadata.ingredientCount} Ingredients</span>
                            </div>
                        )}
                    </div>
                </div>

                {renderContent()}

                <div className="mt-8 pt-8 border-t border-white/10">
                    <button className="flex items-center gap-2 text-white hover:text-pink-300 transition-colors duration-200">
                        <FaHeart />
                        <span>Save {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex items-center justify-between">
                <div className="text-white flex items-center gap-2">
                    <FaShareAlt />
                    <span>Share this {type}</span>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-white hover:bg-blue-500/30 transition-colors duration-200 flex items-center gap-2">
                        <FaTwitter />
                        <span>Twitter</span>
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-purple-500/20 text-white hover:bg-purple-500/30 transition-colors duration-200 flex items-center gap-2">
                        <FaFacebook />
                        <span>Facebook</span>
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-green-500/20 text-white hover:bg-green-500/30 transition-colors duration-200 flex items-center gap-2">
                        <FaLink />
                        <span>Copy Link</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
