
import React from 'react';
import { Card } from "./ui/card";
import jsPDF from 'jspdf';
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const messages = [
  "You will never be given a dream without also giving yourself the power to make it come true.",
  "You are the protagonists because you are the essence of this organisation, and you are the ones who make people change and look at the world with different eyes.",
  "ILUNION Hotels presents its new claim: 'Where sleeping is an awakening'.",
  "We are much more than hotels. We are leaders in accessibility and social inclusion. #WhereSleepingIsanAwakening",
  "Did you know that when you sleep in an ILUNION hotel, many things that were dormant awaken in you?",
  "As the most accessible and inclusive hotel chain in the world, ILUNION Hotels has just reopened its holiday establishments. A place where you will find a unique model in the world.",
  "Welcome to a different world",
  "Awaken your power to take care of our home and those who live in it.",
  "Awaken your power to shape diversity into a more inclusive and supportive world."
];

const DownloadSection = () => {
  const location = useLocation();
  const isSpanish = location.pathname.includes('/es');

  const handleDownload = () => {
    try {
      const doc = new jsPDF();
      
      // Get answers from local storage
      const brandStrategyAnswer = localStorage.getItem('brand_strategy_exercise_answer') || (isSpanish ? 'No se ha proporcionado respuesta' : 'No answer provided');
      const channelsAnswers = JSON.parse(localStorage.getItem('ilunion_channels_exercise_answers') || '[]');
      
      // Get conclusion and chat history from local storage
      const conclusion = localStorage.getItem('brand_strategy_conclusion') || (isSpanish ? 'No se ha proporcionado conclusión' : 'No conclusion provided');
      const chatHistory = JSON.parse(localStorage.getItem('brand_strategy_chat_history') || '[]');
      
      // Set up the document
      doc.setFont("helvetica", "normal");
      doc.setFontSize(20);
      doc.text(isSpanish ? "Respuestas de Ejercicios" : "Exercise Answers", 20, 20);
      
      // Add brand strategy exercise
      doc.setFontSize(16);
      doc.text(isSpanish ? "Ejercicio de Estrategia de Marca" : "Brand Strategy Exercise", 20, 40);
      doc.setFontSize(12);
      const brandStrategyLines = doc.splitTextToSize(brandStrategyAnswer, 170);
      doc.text(brandStrategyLines, 20, 50);
      
      // Add channels exercise
      let yOffset = 50 + (brandStrategyLines.length * 7);
      doc.setFontSize(16);
      doc.text(isSpanish ? "Ejercicio de Canales" : "Channels Exercise", 20, yOffset);
      doc.setFontSize(12);
      
      channelsAnswers.forEach((answer: string, index: number) => {
        const message = messages[index];
        const text = isSpanish 
          ? `Mensaje ${index + 1}: ${answer}`
          : `Message ${index + 1}: ${answer}`;
        doc.text(text, 20, yOffset + 10 + (index * 10));
      });
      
      // Add conclusion
      yOffset = yOffset + 10 + (channelsAnswers.length * 10) + 10;
      doc.setFontSize(16);
      doc.text(isSpanish ? "Conclusión" : "Conclusion", 20, yOffset);
      doc.setFontSize(12);
      const conclusionLines = doc.splitTextToSize(conclusion, 170);
      doc.text(conclusionLines, 20, yOffset + 10);
      
      // Add chat history
      yOffset = yOffset + 10 + (conclusionLines.length * 7) + 10;
      
      if (chatHistory.length > 0) {
        doc.setFontSize(16);
        doc.text(isSpanish ? "Conversación" : "Conversation", 20, yOffset);
        doc.setFontSize(12);
        
        let chatYOffset = yOffset + 10;
        
        chatHistory.forEach((message: any) => {
          // Add a new page if we're near the bottom
          if (chatYOffset > 270) {
            doc.addPage();
            chatYOffset = 20;
          }
          
          const sender = message.role === 'user' 
            ? (isSpanish ? "Tú" : "You") 
            : (isSpanish ? "Asistente" : "Assistant");
          
          doc.setFont("helvetica", "bold");
          doc.text(`${sender} (${message.timestamp}):`, 20, chatYOffset);
          doc.setFont("helvetica", "normal");
          
          const messageLines = doc.splitTextToSize(message.content, 170);
          doc.text(messageLines, 20, chatYOffset + 5);
          
          chatYOffset += 10 + (messageLines.length * 5);
        });
      }
      
      // Save the PDF
      doc.save(isSpanish ? 'respuestas-ejercicios.pdf' : 'exercise-answers.pdf');
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

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-playfair text-2xl font-bold mb-4 text-gray-900">
                {isSpanish ? "Descarga tus Respuestas" : "Download Your Answers"}
              </h2>
              <p className="font-inter text-gray-600 mb-8">
                {isSpanish 
                  ? "Descarga un archivo PDF que contiene todas tus respuestas de los ejercicios en este módulo, incluyendo tu conclusión y conversación."
                  : "Download a PDF file containing all your answers from the exercises in this module, including your conclusion and conversation."}
              </p>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-2 border border-gray-200 rounded-md font-inter text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {isSpanish ? "DESCARGAR PDF" : "DOWNLOAD PDF"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DownloadSection;
