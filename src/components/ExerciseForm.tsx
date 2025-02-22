import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import jsPDF from 'jspdf';
const STORAGE_KEY = 'brand_strategy_exercise_answer';
const ExerciseForm = () => {
  const [answer, setAnswer] = useState('');
  const maxCharacters = 1500;
  const questionTitle = "Now that you have learned about brand strategy, what values would you implement in your organization?";

  // Load saved answer from localStorage on component mount
  useEffect(() => {
    const savedAnswer = localStorage.getItem(STORAGE_KEY);
    if (savedAnswer) {
      setAnswer(savedAnswer);
    }
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, answer);
      toast.success("Your answer has been saved successfully!");
    } catch (error) {
      toast.error("There was an error saving your answer. Please try again.");
      console.error('Error saving to localStorage:', error);
    }
  };
  const handleReset = () => {
    setAnswer('');
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Your answer has been reset.");
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    // Optionally auto-save as user types
    try {
      localStorage.setItem(STORAGE_KEY, newAnswer);
    } catch (error) {
      console.error('Error auto-saving to localStorage:', error);
    }
  };
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");

      // Split title into multiple lines if needed
      const splitTitle = doc.splitTextToSize(questionTitle, 180);
      doc.text(splitTitle, 15, 20);

      // Add answer
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Split answer into multiple lines
      const splitAnswer = doc.splitTextToSize(answer || "No answer provided", 180);
      doc.text(splitAnswer, 15, 40);

      // Save the PDF
      doc.save('brand-strategy-exercise.pdf');
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Error generating PDF. Please try again.");
      console.error('Error generating PDF:', error);
    }
  };
  return <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-8 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-playfair text-xl font-bold text-secondary-foreground">
          {questionTitle}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea value={answer} onChange={handleChange} placeholder="Write here your answer" className="w-full min-h-[200px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter text-secondary-foreground resize-none" maxLength={maxCharacters} />
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
            {answer.length} of {maxCharacters} characters
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button type="button" onClick={handleReset} className="px-6 py-2 border border-gray-200 rounded-md font-inter text-secondary-foreground hover:bg-gray-50 transition-colors">
            Reset
          </button>
          <button type="button" onClick={handleDownloadPDF} className="px-6 py-2 border border-gray-200 rounded-md font-inter text-secondary-foreground hover:bg-gray-50 transition-colors">
            Download PDF
          </button>
          <button type="submit" className="px-6 py-2 text-white rounded-md font-inter transition-colors bg-gray-800 hover:bg-gray-700">
            Submit Answer
          </button>
        </div>
      </form>
    </div>;
};
export default ExerciseForm;