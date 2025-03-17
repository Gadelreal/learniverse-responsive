
import React, { useState } from 'react';
import { Card } from "./ui/card";
import jsPDF from 'jspdf';
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import CompletionModal from './CompletionModal';

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

// Define PDF styling constants
const PDF_STYLES = {
  colors: {
    primary: '#8B5CF6', // Purple
    secondary: '#F97316', // Orange
    text: '#1A1F2C',
    lightGray: '#F1F0FB',
    mediumGray: '#8E9196',
  },
  margins: {
    top: 20,
    left: 20,
    right: 20,
  },
  spacing: {
    paragraph: 7,
    section: 15,
    header: 10,
  }
};

const DownloadSection = () => {
  const location = useLocation();
  const isSpanish = location.pathname.includes('/es');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const handleDownload = () => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Get stored data
      const brandStrategyAnswer = localStorage.getItem('brand_strategy_exercise_answer') || (isSpanish ? 'No se ha proporcionado respuesta' : 'No answer provided');
      const channelsAnswers = JSON.parse(localStorage.getItem('ilunion_channels_exercise_answers') || '[]');
      const conclusion = localStorage.getItem('brand_strategy_conclusion') || (isSpanish ? 'No se ha proporcionado conclusión' : 'No conclusion provided');
      const chatHistory = JSON.parse(localStorage.getItem('brand_strategy_chat_history') || '[]');
      
      // Set initial positioning
      let yPos = PDF_STYLES.margins.top;
      const leftMargin = PDF_STYLES.margins.left;
      const rightMargin = 210 - PDF_STYLES.margins.right;
      const contentWidth = rightMargin - leftMargin;
      
      // Add header with background
      doc.setFillColor(PDF_STYLES.colors.primary);
      doc.rect(0, 0, 210, 30, 'F');
      
      // Add header text
      doc.setTextColor('#FFFFFF');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text(isSpanish ? "ESTRATEGIA DE MARCA" : "BRAND STRATEGY", leftMargin, 20);
      
      // Add IE University logo placeholder
      doc.setFontSize(10);
      doc.text("IE University", rightMargin - 22, 15);
      
      // Reposition after header
      yPos = 40;
      
      // Add section: Brand Strategy Exercise
      addSection(
        doc, 
        isSpanish ? "Ejercicio de Estrategia de Marca" : "Brand Strategy Exercise", 
        brandStrategyAnswer,
        leftMargin,
        yPos,
        contentWidth
      );
      
      // Update position for next section
      yPos += calcTextHeight(doc, brandStrategyAnswer, contentWidth) + PDF_STYLES.spacing.section + 10;
      
      // Add Channels Exercise section
      doc.setFillColor(PDF_STYLES.colors.lightGray);
      doc.rect(leftMargin - 5, yPos - 5, contentWidth + 10, 10, 'F');
      doc.setTextColor(PDF_STYLES.colors.primary);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(isSpanish ? "Ejercicio de Canales" : "Channels Exercise", leftMargin, yPos);
      
      yPos += 10;
      doc.setTextColor(PDF_STYLES.colors.text);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      
      // Add each channel answer
      channelsAnswers.forEach((answer, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = PDF_STYLES.margins.top;
          
          // Add page header
          doc.setFillColor(PDF_STYLES.colors.lightGray);
          doc.rect(0, 0, 210, 15, 'F');
          doc.setTextColor(PDF_STYLES.colors.primary);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(isSpanish ? "ESTRATEGIA DE MARCA - Continuación" : "BRAND STRATEGY - Continued", leftMargin, 10);
        }
        
        // Message heading with accent color
        doc.setTextColor(PDF_STYLES.colors.secondary);
        doc.setFont("helvetica", "bold");
        const messageLabel = isSpanish ? `Mensaje ${index + 1}` : `Message ${index + 1}`;
        doc.text(messageLabel, leftMargin, yPos);
        doc.setTextColor(PDF_STYLES.colors.mediumGray);
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        const messageTruncated = messages[index].substring(0, 50) + (messages[index].length > 50 ? "..." : "");
        doc.text(`"${messageTruncated}"`, leftMargin + 25, yPos);
        
        // Add answer
        yPos += 8;
        doc.setTextColor(PDF_STYLES.colors.text);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const answerLines = doc.splitTextToSize(answer, contentWidth);
        doc.text(answerLines, leftMargin, yPos);
        
        yPos += answerLines.length * PDF_STYLES.spacing.paragraph + 5;
      });
      
      // Add conclusion section
      yPos += 5;
      if (yPos > 250) {
        doc.addPage();
        yPos = PDF_STYLES.margins.top;
      }
      
      // Add decorative element
      doc.setDrawColor(PDF_STYLES.colors.primary);
      doc.setLineWidth(1);
      doc.line(leftMargin, yPos, rightMargin, yPos);
      yPos += 10;
      
      addSection(
        doc, 
        isSpanish ? "Conclusión" : "Conclusion", 
        conclusion,
        leftMargin,
        yPos,
        contentWidth
      );
      
      // Update position for chat history
      yPos += calcTextHeight(doc, conclusion, contentWidth) + PDF_STYLES.spacing.section + 10;
      
      // Add chat history if available
      if (chatHistory.length > 0) {
        if (yPos > 250) {
          doc.addPage();
          yPos = PDF_STYLES.margins.top;
          
          // Add page header
          doc.setFillColor(PDF_STYLES.colors.lightGray);
          doc.rect(0, 0, 210, 15, 'F');
          doc.setTextColor(PDF_STYLES.colors.primary);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(isSpanish ? "ESTRATEGIA DE MARCA - Continuación" : "BRAND STRATEGY - Continued", leftMargin, 10);
          yPos = 25;
        }
        
        // Conversation header
        doc.setFillColor(PDF_STYLES.colors.primary);
        doc.setTextColor('#FFFFFF');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.rect(leftMargin - 5, yPos - 5, contentWidth + 10, 10, 'F');
        doc.text(isSpanish ? "Conversación" : "Conversation", leftMargin, yPos);
        
        yPos += 10;
        
        // Add each message in the chat
        chatHistory.forEach((message) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = PDF_STYLES.margins.top;
            
            // Add page header
            doc.setFillColor(PDF_STYLES.colors.lightGray);
            doc.rect(0, 0, 210, 15, 'F');
            doc.setTextColor(PDF_STYLES.colors.primary);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(isSpanish ? "CONVERSACIÓN - Continuación" : "CONVERSATION - Continued", leftMargin, 10);
            yPos = 25;
          }
          
          // Sender label with background color
          const isUser = message.role === 'user';
          doc.setFillColor(isUser ? PDF_STYLES.colors.secondary : PDF_STYLES.colors.primary);
          doc.setTextColor('#FFFFFF');
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          
          const sender = isUser 
            ? (isSpanish ? "Tú" : "You") 
            : (isSpanish ? "Asistente" : "Assistant");
          
          // Draw rounded rectangle for sender
          const senderWidth = doc.getTextWidth(`${sender} (${message.timestamp})`) + 6;
          doc.roundedRect(leftMargin - 3, yPos - 5, senderWidth, 7, 1, 1, 'F');
          doc.text(`${sender} (${message.timestamp})`, leftMargin, yPos);
          
          // Message content
          yPos += 8;
          doc.setTextColor(PDF_STYLES.colors.text);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          
          const messageLines = doc.splitTextToSize(message.content, contentWidth);
          doc.text(messageLines, leftMargin, yPos);
          
          yPos += messageLines.length * 5 + 8;
        });
      }
      
      // Add footer on each page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Add gradient footer
        doc.setFillColor(245, 245, 245);
        doc.rect(0, 280, 210, 17, 'F');
        
        // Add page number
        doc.setTextColor(PDF_STYLES.colors.mediumGray);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(
          `${isSpanish ? 'Página' : 'Page'} ${i} ${isSpanish ? 'de' : 'of'} ${pageCount}`, 
          105, 
          287, 
          { align: 'center' }
        );
        
        // Add copyright
        const year = new Date().getFullYear();
        doc.text(
          `© ${year} IE University. ${isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.'}`,
          105,
          292,
          { align: 'center' }
        );
      }
      
      // Save the PDF
      doc.save(isSpanish ? 'respuestas-ejercicios.pdf' : 'exercise-answers.pdf');
      toast.success(isSpanish 
        ? "PDF descargado correctamente." 
        : "PDF downloaded successfully!");
        
      setShowCompletionModal(true);
      
      document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
    } catch (error) {
      toast.error(isSpanish 
        ? "Error al generar el PDF. Por favor, inténtalo de nuevo." 
        : "Error generating PDF. Please try again.");
      console.error('Error generating PDF:', error);
    }
  };

  // Helper function to add a section with title and content
  const addSection = (doc, title, content, x, y, width) => {
    // Add section title with background
    doc.setFillColor(PDF_STYLES.colors.primary);
    doc.setTextColor('#FFFFFF');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.rect(x - 5, y - 5, width + 10, 10, 'F');
    doc.text(title, x, y);
    
    // Add content
    y += 10;
    doc.setTextColor(PDF_STYLES.colors.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const contentLines = doc.splitTextToSize(content, width);
    doc.text(contentLines, x, y);
    
    return y + contentLines.length * PDF_STYLES.spacing.paragraph;
  };

  // Helper function to calculate text height
  const calcTextHeight = (doc, text, width) => {
    const lines = doc.splitTextToSize(text, width);
    return lines.length * PDF_STYLES.spacing.paragraph;
  };

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg mb-4 md:mb-0 flex-shrink-0">
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
                className="w-full"
              >
                {isSpanish ? "DESCARGAR PDF" : "DOWNLOAD PDF"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <CompletionModal 
        isOpen={showCompletionModal} 
        onClose={() => setShowCompletionModal(false)} 
      />
    </section>
  );
};

export default DownloadSection;
