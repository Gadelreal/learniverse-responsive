
import React, { useState } from 'react';

const ExerciseForm = () => {
  const [answer, setAnswer] = useState('');
  const maxCharacters = 1500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log('Submitted answer:', answer);
  };

  const handleReset = () => {
    setAnswer('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-8 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-playfair text-xl font-bold text-secondary-foreground">
          Now that you have learned about brand strategy, what values would you implement in your organization?
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write here your answer"
            className="w-full min-h-[200px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter text-secondary-foreground resize-none"
            maxLength={maxCharacters}
          />
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
            {answer.length} of {maxCharacters} characters
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-200 rounded-md font-inter text-secondary-foreground hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md font-inter hover:bg-primary/90 transition-colors"
          >
            Submit Answer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
