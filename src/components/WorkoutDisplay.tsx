// components/WorkoutDisplay.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaDumbbell, FaClock, FaCheckCircle } from 'react-icons/fa';

interface WorkoutDisplayProps {
  result: any;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ result }) => {
  // Helper function to convert object to markdown
  const convertToMarkdown = (data: any): string => {
    if (typeof data === 'string') {
      return data;
    }

    let markdown = '';

    // Handle workout title/header
    if (data.title) {
      markdown += `# ${data.title}\n\n`;
    }

    // Handle workout description
    if (data.description) {
      markdown += `${data.description}\n\n`;
    }

    // Handle workout details
    if (data.details) {
      markdown += `## Workout Details\n\n`;
      if (typeof data.details === 'string') {
        markdown += `${data.details}\n\n`;
      } else {
        Object.entries(data.details).forEach(([key, value]) => {
          markdown += `- **${key}**: ${value}\n`;
        });
        markdown += '\n';
      }
    }

    // Handle exercises
    if (data.exercises) {
      markdown += `## Exercises\n\n`;
      if (Array.isArray(data.exercises)) {
        data.exercises.forEach((exercise: any, index: number) => {
          if (typeof exercise === 'string') {
            markdown += `${index + 1}. ${exercise}\n`;
          } else {
            markdown += `### ${index + 1}. ${exercise.name || 'Exercise'}\n`;
            if (exercise.sets) markdown += `- Sets: ${exercise.sets}\n`;
            if (exercise.reps) markdown += `- Reps: ${exercise.reps}\n`;
            if (exercise.duration) markdown += `- Duration: ${exercise.duration}\n`;
            if (exercise.description) markdown += `- Description: ${exercise.description}\n`;
            markdown += '\n';
          }
        });
      } else if (typeof data.exercises === 'string') {
        markdown += data.exercises + '\n\n';
      }
    }

    // Handle notes or additional information
    if (data.notes) {
      markdown += `## Additional Notes\n\n`;
      if (Array.isArray(data.notes)) {
        data.notes.forEach((note: string) => {
          markdown += `- ${note}\n`;
        });
      } else {
        markdown += data.notes + '\n';
      }
      markdown += '\n';
    }

    // Handle cool down
    if (data.cooldown) {
      markdown += `## Cool Down\n\n${data.cooldown}\n\n`;
    }

    return markdown;
  };

  const markdownContent = convertToMarkdown(result);

  return (
    <div className="glass-morphism p-8 rounded-xl shadow-xl backdrop-blur-lg bg-white/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <FaDumbbell className="text-purple-600" />
          Your Optimized Workout Plan
        </h2>
        <div className="flex items-center gap-2 text-green-600">
          <FaCheckCircle />
          <span className="text-sm font-medium">Ready to go!</span>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-purple-700 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-purple-600 mt-6 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-medium text-purple-500 mt-4 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="text-gray-700 mb-4" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />,
            li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-purple-700" {...props} />,
            em: ({node, ...props}) => <em className="text-purple-600 italic" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-600 my-4" {...props} />
            ),
            code: ({node, ...props}) => (
              <code className="bg-purple-50 text-purple-700 px-2 py-1 rounded" {...props} />
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      <div className="mt-8 pt-6 border-t border-purple-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaClock className="text-purple-400" />
            <span>Generated just now</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
          >
            Print Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
