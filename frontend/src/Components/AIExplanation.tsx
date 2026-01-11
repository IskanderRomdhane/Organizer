import React from 'react';

interface AIExplanationProps {
    explanation: string | undefined;
}

const AIExplanation: React.FC<AIExplanationProps> = ({ explanation }) => {
    if (!explanation) return null;

    return (
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                🤖 Analyse IA
            </div>
            <p className="text-sm text-purple-800 leading-relaxed whitespace-pre-wrap">
                {explanation}
            </p>
        </div>
    );
};

export default AIExplanation;