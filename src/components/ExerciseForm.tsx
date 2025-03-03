
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { useLocation } from "react-router-dom";

const STORAGE_KEY = 'brand_strategy_exercise_answer';

const ExerciseForm = () => {
  const [answer, setAnswer] = useState('');
  const maxCharacters = 1500;
  const location = useLocation();
  const isSpanish = location.pathname.includes('/es');
  
  const questionTitle = isSpanish
    ? "Ahora que has aprendido sobre estrategia de marca, ¿qué valores implementarías en tu organización?"
    : "Now that you have learned about brand strategy, what values would you implement in your organization?";

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
      toast.success(isSpanish 
        ? "Tu respuesta ha sido guardada correctamente." 
        : "Your answer has been saved successfully!");
    } catch (error) {
      toast.error(isSpanish 
        ? "Hubo un error al guardar tu respuesta. Por favor, inténtalo de nuevo." 
        : "There was an error saving your answer. Please try again.");
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleReset = () => {
    setAnswer('');
    localStorage.removeItem(STORAGE_KEY);
    toast.info(isSpanish 
      ? "Tu respuesta ha sido restablecida." 
      : "Your answer has been reset.");
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
      const splitAnswer = doc.splitTextToSize(answer || (isSpanish ? "No se ha proporcionado ninguna respuesta" : "No answer provided"), 180);
      doc.text(splitAnswer, 15, 40);

      // Save the PDF
      doc.save('brand-strategy-exercise.pdf');
      toast.success(isSpanish 
        ? "PDF descargado correctamente." 
        : "PDF downloaded successfully!");
    } catch (error) {
      toast.error(isSpanish 
        ? "Error al generar el PDF. Por favor, inténtalo de nuevo." 
        : "Error generating PDF. Please try again.");
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
          <textarea 
            value={answer} 
            onChange={handleChange} 
            placeholder={isSpanish ? "Escribe aquí tu respuesta" : "Write here your answer"} 
            className="w-full min-h-[200px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-inter text-secondary-foreground resize-none" 
            maxLength={maxCharacters} 
          />
          <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
            {answer.length} {isSpanish ? "de" : "of"} {maxCharacters} {isSpanish ? "caracteres" : "characters"}
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={handleReset} 
            className="px-6 py-2 border border-gray-200 rounded-md font-inter text-secondary-foreground hover:bg-gray-50 transition-colors"
          >
            {isSpanish ? "Restablecer" : "Reset"}
          </button>
          <button 
            type="button" 
            onClick={handleDownloadPDF} 
            className="px-6 py-2 border border-gray-200 rounded-md font-inter text-secondary-foreground hover:bg-gray-50 transition-colors"
          >
            {isSpanish ? "Descargar PDF" : "Download PDF"}
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 text-white rounded-md font-inter transition-colors bg-gray-800 hover:bg-gray-700"
          >
            {isSpanish ? "Enviar Respuesta" : "Submit Answer"}
          </button>
        </div>
      </form>
    </div>;
};

export default ExerciseForm;
