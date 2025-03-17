
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

// Define PDF styling constants to match web design
const PDF_STYLES = {
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter'
  },
  colors: {
    primary: '#121212', // Matching primary color from tailwind config
    secondary: '#F6F6F7', // Matching secondary color from tailwind config
    accent: '#9b87f5', // Purple accent color for visual interest
    text: {
      dark: '#121212', // For headings and important text
      medium: '#555555', // For body text
      light: '#8E9196' // For captions and secondary text
    },
    background: {
      white: '#FFFFFF',
      light: '#F1F0FB', // Matching muted color from tailwind config
      medium: '#EFEFEF'
    }
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
      // Create new PDF document with custom fonts
      const doc = new jsPDF();
      
      // Add custom fonts to match web design
      doc.setFont('helvetica', 'bold'); // Using default font as fallback for headings
      
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
      
      // Create cover page with elegant design
      // Header with background rectangle
      doc.setFillColor(PDF_STYLES.colors.primary);
      doc.rect(0, 0, 210, 40, 'F');
      
      // Add header text
      doc.setTextColor('#FFFFFF');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text(isSpanish ? "ESTRATEGIA DE MARCA" : "BRAND STRATEGY", leftMargin, 28);
      
      // Add IE University logo placeholder
      doc.setFontSize(12);
      doc.text("IE University", rightMargin - 25, 20);
      
      // Add decorative element
      doc.setDrawColor(PDF_STYLES.colors.accent);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, 50, rightMargin, 50);
      
      // Add subtitle with year
      const year = new Date().getFullYear();
      doc.setTextColor(PDF_STYLES.colors.text.medium);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(12);
      doc.text(isSpanish ? `Ejercicios y Respuestas | ${year}` : `Exercises and Answers | ${year}`, leftMargin, 60);
      
      // Add decorative rectangle for visual interest
      doc.setFillColor(PDF_STYLES.colors.accent);
      doc.rect(rightMargin - 40, 65, 40, 3, 'F');
      
      // Add brief description
      doc.setTextColor(PDF_STYLES.colors.text.medium);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const description = isSpanish 
        ? "Este documento contiene sus respuestas a los ejercicios de Estrategia de Marca, incluyendo el análisis de canales, conclusiones y conversaciones relevantes."
        : "This document contains your answers to the Brand Strategy exercises, including channel analysis, conclusions, and relevant conversations.";
      const descLines = doc.splitTextToSize(description, contentWidth);
      doc.text(descLines, leftMargin, 75);
      
      // Add page number to cover
      doc.setTextColor(PDF_STYLES.colors.text.light);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("1", 105, 287, { align: 'center' });
      
      // Add second page for content
      doc.addPage();
      yPos = PDF_STYLES.margins.top;
      
      // Add header with background
      addPageHeader(doc, isSpanish ? "ESTRATEGIA DE MARCA" : "BRAND STRATEGY", 2);
      
      // Add section: Brand Strategy Exercise
      yPos = 40;
      addSection(
        doc, 
        isSpanish ? "Ejercicio de Estrategia de Marca" : "Brand Strategy Exercise", 
        brandStrategyAnswer,
        leftMargin,
        yPos,
        contentWidth,
        PDF_STYLES.colors.primary,
        PDF_STYLES.colors.accent
      );
      
      // Update position for next section
      yPos += calcTextHeight(doc, brandStrategyAnswer, contentWidth) + PDF_STYLES.spacing.section + 20;
      
      // Check if we need a new page
      if (yPos > 230) {
        doc.addPage();
        yPos = PDF_STYLES.margins.top + 10;
        addPageHeader(doc, isSpanish ? "ESTRATEGIA DE MARCA" : "BRAND STRATEGY", 3);
      }
      
      // Add Channels Exercise section with elegant styling
      doc.setFillColor(PDF_STYLES.colors.primary);
      doc.rect(leftMargin - 5, yPos - 5, contentWidth + 10, 10, 'F');
      doc.setTextColor('#FFFFFF');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(isSpanish ? "Ejercicio de Canales" : "Channels Exercise", leftMargin, yPos);
      
      // Add decorative element
      doc.setDrawColor(PDF_STYLES.colors.accent);
      doc.setLineWidth(0.5);
      doc.line(leftMargin, yPos + 10, rightMargin, yPos + 10);
      
      yPos += 20;
      doc.setTextColor(PDF_STYLES.colors.text.dark);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      
      // Add each channel answer with improved design
      channelsAnswers.forEach((answer, index) => {
        if (yPos > 240) {
          doc.addPage();
          const currentPage = doc.getNumberOfPages();
          addPageHeader(doc, isSpanish ? "ESTRATEGIA DE MARCA" : "BRAND STRATEGY", currentPage);
          yPos = PDF_STYLES.margins.top + 20;
        }
        
        // Message box with accent color
        doc.setFillColor(PDF_STYLES.colors.background.light);
        doc.roundedRect(leftMargin - 5, yPos - 5, contentWidth + 10, 8, 1, 1, 'F');
        
        // Message heading with number and icon
        doc.setTextColor(PDF_STYLES.colors.primary);
        doc.setFont("helvetica", "bold");
        const messageLabel = isSpanish ? `Mensaje ${index + 1}` : `Message ${index + 1}`;
        doc.text(messageLabel, leftMargin, yPos);
        
        // Add message excerpt
        doc.setTextColor(PDF_STYLES.colors.text.medium);
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        const messageTruncated = messages[index].substring(0, 50) + (messages[index].length > 50 ? "..." : "");
        doc.text(`"${messageTruncated}"`, leftMargin + 25, yPos);
        
        // Add answer with styled box
        yPos += 12;
        doc.setFillColor(PDF_STYLES.colors.background.white);
        doc.roundedRect(leftMargin - 2, yPos - 5, contentWidth + 4, calcTextHeight(doc, answer, contentWidth - 10) + 10, 1, 1, 'F');
        
        // Add answer text
        doc.setTextColor(PDF_STYLES.colors.text.dark);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const answerLines = doc.splitTextToSize(answer, contentWidth - 10);
        doc.text(answerLines, leftMargin, yPos);
        
        yPos += answerLines.length * PDF_STYLES.spacing.paragraph + 15;
      });
      
      // Add conclusion section with visually appealing design
      if (yPos > 220) {
        doc.addPage();
        const currentPage = doc.getNumberOfPages();
        addPageHeader(doc, isSpanish ? "ESTRATEGIA DE MARCA" : "BRAND STRATEGY", currentPage);
        yPos = PDF_STYLES.margins.top + 20;
      }
      
      // Add decorative element
      doc.setDrawColor(PDF_STYLES.colors.primary);
      doc.setLineWidth(1);
      doc.line(leftMargin, yPos, rightMargin, yPos);
      yPos += 10;
      
      // Add conclusion section with accent color styling
      addSection(
        doc, 
        isSpanish ? "Conclusión" : "Conclusion", 
        conclusion,
        leftMargin,
        yPos,
        contentWidth,
        PDF_STYLES.colors.accent,
        PDF_STYLES.colors.primary
      );
      
      // Update position for chat history
      yPos += calcTextHeight(doc, conclusion, contentWidth) + PDF_STYLES.spacing.section + 20;
      
      // Add chat history if available with modern styling
      if (chatHistory.length > 0) {
        if (yPos > 220) {
          doc.addPage();
          const currentPage = doc.getNumberOfPages();
          addPageHeader(doc, isSpanish ? "CONVERSACIÓN" : "CONVERSATION", currentPage);
          yPos = PDF_STYLES.margins.top + 20;
        } else {
          // Conversation header
          doc.setFillColor(PDF_STYLES.colors.primary);
          doc.setTextColor('#FFFFFF');
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.rect(leftMargin - 5, yPos - 5, contentWidth + 10, 10, 'F');
          doc.text(isSpanish ? "Conversación" : "Conversation", leftMargin, yPos);
          yPos += 15;
        }
        
        // Add each message in the chat with modern message bubble style
        chatHistory.forEach((message) => {
          if (yPos > 240) {
            doc.addPage();
            const currentPage = doc.getNumberOfPages();
            addPageHeader(doc, isSpanish ? "CONVERSACIÓN" : "CONVERSATION", currentPage);
            yPos = PDF_STYLES.margins.top + 20;
          }
          
          const isUser = message.role === 'user';
          
          // Calculate message height
          const messageLines = doc.splitTextToSize(message.content, contentWidth * 0.8);
          const messageHeight = messageLines.length * 5 + 10;
          
          // Draw message bubble with different alignment for user/assistant
          if (isUser) {
            // User message - right aligned
            doc.setFillColor(PDF_STYLES.colors.background.light);
            doc.roundedRect(rightMargin - (contentWidth * 0.8) - 5, yPos - 5, contentWidth * 0.8 + 5, messageHeight, 2, 2, 'F');
            
            // Add user label
            doc.setFillColor(PDF_STYLES.colors.primary);
            const userLabel = isSpanish ? "Tú" : "You";
            const labelWidth = doc.getTextWidth(userLabel) + 10;
            doc.roundedRect(rightMargin - labelWidth, yPos - 10, labelWidth, 7, 1, 1, 'F');
            doc.setTextColor('#FFFFFF');
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text(userLabel, rightMargin - (labelWidth/2), yPos - 5, { align: 'center' });
            
            // Add timestamp
            doc.setTextColor(PDF_STYLES.colors.text.light);
            doc.setFont("helvetica", "italic");
            doc.setFontSize(7);
            doc.text(message.timestamp, rightMargin, yPos + messageHeight, { align: 'right' });
            
            // Add message content
            doc.setTextColor(PDF_STYLES.colors.text.dark);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(messageLines, rightMargin - (contentWidth * 0.8) + 5, yPos + 5, { align: 'left' });
          } else {
            // Assistant message - left aligned
            doc.setFillColor(PDF_STYLES.colors.accent);
            doc.roundedRect(leftMargin, yPos - 5, contentWidth * 0.8 + 5, messageHeight, 2, 2, 'F');
            
            // Add assistant label
            doc.setFillColor(PDF_STYLES.colors.primary);
            const assistantLabel = isSpanish ? "Asistente" : "Assistant";
            const labelWidth = doc.getTextWidth(assistantLabel) + 10;
            doc.roundedRect(leftMargin, yPos - 10, labelWidth, 7, 1, 1, 'F');
            doc.setTextColor('#FFFFFF');
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text(assistantLabel, leftMargin + (labelWidth/2), yPos - 5, { align: 'center' });
            
            // Add timestamp
            doc.setTextColor(PDF_STYLES.colors.text.light);
            doc.setFont("helvetica", "italic");
            doc.setFontSize(7);
            doc.text(message.timestamp, leftMargin, yPos + messageHeight, { align: 'left' });
            
            // Add message content
            doc.setTextColor('#FFFFFF');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(messageLines, leftMargin + 5, yPos + 5, { align: 'left' });
          }
          
          yPos += messageHeight + 15;
        });
      }
      
      // Add footer on each page
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Add sophisticated footer with gradient background
        doc.setFillColor(245, 245, 245);
        doc.rect(0, 280, 210, 17, 'F');
        
        // Add page number with styled box
        doc.setFillColor(PDF_STYLES.colors.primary);
        doc.roundedRect(100, 282, 10, 10, 2, 2, 'F');
        doc.setTextColor('#FFFFFF');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`${i}`, 105, 288, { align: 'center' });
        
        // Add total pages indicator
        doc.setTextColor(PDF_STYLES.colors.text.medium);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(
          `${isSpanish ? 'de' : 'of'} ${pageCount}`, 
          115, 
          288
        );
        
        // Add horizontal line
        doc.setDrawColor(PDF_STYLES.colors.accent);
        doc.setLineWidth(0.5);
        doc.line(leftMargin, 282, 95, 282);
        doc.line(115, 282, rightMargin, 282);
        
        // Add copyright
        doc.setTextColor(PDF_STYLES.colors.text.medium);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(
          `© ${year} IE University. ${isSpanish ? 'Todos los derechos reservados.' : 'All rights reserved.'}`,
          105,
          295,
          { align: 'center' }
        );
      }
      
      // Save the PDF
      doc.save(isSpanish ? 'estrategia-de-marca.pdf' : 'brand-strategy.pdf');
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

  // Helper function to add page headers
  const addPageHeader = (doc, title, pageNumber) => {
    // Add subtle header background
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, 210, 15, 'F');
    
    // Add title
    doc.setTextColor(PDF_STYLES.colors.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(title, PDF_STYLES.margins.left, 10);
    
    // Add page number
    doc.setTextColor(PDF_STYLES.colors.text.light);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `${pageNumber}`, 
      210 - PDF_STYLES.margins.right, 
      10, 
      { align: 'right' }
    );
    
    // Add decorative line
    doc.setDrawColor(PDF_STYLES.colors.accent);
    doc.setLineWidth(0.5);
    doc.line(PDF_STYLES.margins.left, 15, 210 - PDF_STYLES.margins.right, 15);
  };

  // Helper function to add a section with title and content
  const addSection = (doc, title, content, x, y, width, titleBgColor, accentColor) => {
    // Add section title with background
    doc.setFillColor(titleBgColor);
    doc.setTextColor('#FFFFFF');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.rect(x - 5, y - 5, width + 10, 10, 'F');
    doc.text(title, x, y);
    
    // Add accent line
    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.5);
    doc.line(x, y + 5, x + width, y + 5);
    
    // Add content with subtle background
    y += 10;
    doc.setFillColor(252, 252, 252);
    doc.roundedRect(x - 5, y - 3, width + 10, calcTextHeight(doc, content, width) + 8, 1, 1, 'F');
    
    // Add content
    doc.setTextColor(PDF_STYLES.colors.text.dark);
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

