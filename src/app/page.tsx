"use client";
import { useState, useEffect } from 'react';
import { FaCode, FaSpinner, FaBookOpen, FaUtensils, FaBriefcase, FaPrint, FaShare, FaFileDownload, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkflowField {
  name: string;
  key: string;
  placeholder: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  fields: WorkflowField[];
}

const WORKFLOWS: Workflow[] = [
  {
    id: 'business',
    name: 'Business Plan Generator',
    description: 'Generate a comprehensive business plan',
    icon: FaBriefcase,
    fields: [
      { name: 'Business Plan', key: 'BusinessPlan', placeholder: 'Enter business plan overview' },
      { name: 'Product Name', key: 'ProductName', placeholder: 'Enter product name' },
      { name: 'Company Name', key: 'CompanyName', placeholder: 'Enter company name' },
      { name: 'Mission Statement', key: 'MissionStatement', placeholder: 'Enter mission statement' },
      { name: 'Business Objectives', key: 'BusinessObjectives', placeholder: 'Enter business objectives' },
      { name: 'Business Overview', key: 'BusinessOverview', placeholder: 'Enter business overview' },
      { name: 'Market Needs', key: 'MarketNeeds', placeholder: 'Enter market needs' },
      { name: 'Unique Selling Proposition', key: 'UniqueSellingProposition', placeholder: 'Enter your USP' }
    ]
  },
  {
    id: 'food',
    name: 'Food Analysis',
    description: 'Analyze food items and get detailed information',
    icon: FaUtensils,
    fields: [
      { name: 'Food Item', key: 'food', placeholder: 'Enter a food item to analyze' }
    ]
  },
  {
    id: 'story',
    name: 'Story Generator',
    description: 'Generate creative stories from prompts',
    icon: FaBookOpen,
    fields: [
      { name: 'Story Prompt', key: 'story', placeholder: 'Enter your story prompt' }
    ]
  }
];

export default function Home() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(WORKFLOWS[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWorkflowSelector, setShowWorkflowSelector] = useState(false);

  useEffect(() => {
    setFormData({});
    setResult(null);
    setError('');
  }, [selectedWorkflow]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowType: selectedWorkflow.id,
          formData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'An error occurred while processing your request.');
      }
    } catch (err) {
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;
  
    const renderContent = (content: string) => {
      content = content.replace(/```markdown\n|```\n?/g, '').replace(/^Certainly!.*format:\n\n/, '');
  
      const lines = content.split('\n');
      return lines.map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-4">{line.replace(/\*\*/g, '')}</h2>;
        }
  
        line = line.replace(/^#+\s*/, '');
        
        if (line.startsWith('Ingredients') || line.startsWith('Instructions') || line.startsWith('Equipment') || line.startsWith('Tips')) {
          return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-4">{line}</h2>;
        } else if (line.trim().match(/^\d+\./)) {
          return <p key={index} className="text-white mb-2 ml-4">{line}</p>;
        } else if (line.startsWith('-') || line.startsWith('*')) {
          return <li key={index} className="text-white ml-4">{line.replace(/^[-*]\s*/, '')}</li>;
        } else if (line.trim() === '') {
          return <br key={index} />;
        } else {
          return <p key={index} className="text-white mb-2">{line}</p>;
        }
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 space-y-6"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            {renderContent(result.result)}
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex items-center justify-between">
          <div className="text-white">
            {selectedWorkflow.id === 'story' && 'Share this story'}
            {selectedWorkflow.id === 'food' && 'Save this recipe'}
            {selectedWorkflow.id === 'business' && 'Export business plan'}
          </div>
          <div className="flex gap-4">
            {selectedWorkflow.id === 'story' && (
              <>
                <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-white hover:bg-blue-500/30 transition-colors duration-200">
                  <FaShare className="inline-block mr-2" />
                  Share
                </button>
                <button className="px-4 py-2 rounded-lg bg-green-500/20 text-white hover:bg-green-500/30 transition-colors duration-200">
                  <FaFileDownload className="inline-block mr-2" />
                  Download
                </button>
              </>
            )}
            {selectedWorkflow.id === 'food' && (
              <>
                <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-white hover:bg-blue-500/30 transition-colors duration-200">
                  <FaPrint className="inline-block mr-2" />
                  Print Recipe
                </button>
                <button className="px-4 py-2 rounded-lg bg-green-500/20 text-white hover:bg-green-500/30 transition-colors duration-200">
                  <FaShare className="inline-block mr-2" />
                  Share Recipe
                </button>
              </>
            )}
            {selectedWorkflow.id === 'business' && (
              <>
                <button className="px-4 py-2 rounded-lg bg-blue-500/20 text-white hover:bg-blue-500/30 transition-colors duration-200">
                  <FaFileDownload className="inline-block mr-2" />
                  Download PDF
                </button>
                <button className="px-4 py-2 rounded-lg bg-green-500/20 text-white hover:bg-green-500/30 transition-colors duration-200">
                  <FaShare className="inline-block mr-2" />
                  Share Plan
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            AI Workflow Generator
          </h1>
          <p className="text-slate-300">
            Select a workflow and fill in the details to generate content
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          {/* Workflow Selector */}
          <div className="relative mb-8">
            <button
              onClick={() => setShowWorkflowSelector(!showWorkflowSelector)}
              className="w-full p-4 rounded-xl bg-white/5 text-white flex items-center justify-between hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex items-center">
                <selectedWorkflow.icon className="mr-3 text-2xl" />
                <span>{selectedWorkflow.name}</span>
              </div>
              <FaChevronDown className={`transition-transform duration-200 ${showWorkflowSelector ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showWorkflowSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-xl overflow-hidden z-10 shadow-lg border border-white/20"
                >
                  {WORKFLOWS.map(workflow => (
                    <button
                      key={workflow.id}
                      onClick={() => {
                        setSelectedWorkflow(workflow);
                        setShowWorkflowSelector(false);
                      }}
                      className="w-full p-4 text-left text-white hover:bg-slate-700 transition-colors duration-200 flex items-center"
                    >
                      <workflow.icon className="mr-3 text-xl" />
                      <div>
                        <div className="font-medium">{workflow.name}</div>
                        <div className="text-sm opacity-75">{workflow.description}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedWorkflow.fields.map(field => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-white mb-2">
                  {field.name}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Generate'
              )}
            </motion.button>
          </form>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Display */}
          {renderResult()}
        </motion.div>
      </div>
    </div>
  );
}
