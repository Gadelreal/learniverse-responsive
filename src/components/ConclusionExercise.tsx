
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FileText, Save, MessageSquare, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import { useLocation } from "react-router-dom";

const STORAGE_KEY_CONCLUSION = 'brand_strategy_conclusion';
const STORAGE_KEY_CHAT = 'brand_strategy_chat_history';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const ConclusionExercise = () => {
  const [conclusion, setConclusion] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isSpanish = location.pathname.includes('/es');

  // Load saved data on component mount
  useEffect(() => {
    const savedConclusion = localStorage.getItem(STORAGE_KEY_CONCLUSION);
    const savedChat = localStorage.getItem(STORAGE_KEY_CHAT);
    
    if (savedConclusion) {
      setConclusion(savedConclusion);
    }
    
    if (savedChat) {
      try {
        setChatHistory(JSON.parse(savedChat));
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }
  }, []);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleConclusionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConclusion(e.target.value);
    try {
      localStorage.setItem(STORAGE_KEY_CONCLUSION, e.target.value);
    } catch (error) {
      console.error('Error saving conclusion to localStorage:', error);
    }
  };

  const formatTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString(isSpanish ? 'es-ES' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const saveChat = (updatedChat: ChatMessage[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(updatedChat));
    } catch (error) {
      console.error('Error saving chat history to localStorage:', error);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: formatTime()
    };
    
    const updatedChat = [...chatHistory, userMessage];
    setChatHistory(updatedChat);
    saveChat(updatedChat);
    setChatInput('');
    setIsLoading(true);
    
    try {
      // Simulate API call to ChatGPT
      setTimeout(() => {
        // This is a placeholder for real ChatGPT integration
        const aiResponse = getSimulatedResponse(chatInput, conclusion);
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: aiResponse,
          timestamp: formatTime()
        };
        
        const newChat = [...updatedChat, assistantMessage];
        setChatHistory(newChat);
        saveChat(newChat);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error in chat:', error);
      setIsLoading(false);
      toast.error(isSpanish 
        ? "Error al procesar tu mensaje. Por favor, inténtalo de nuevo." 
        : "Error processing your message. Please try again.");
    }
  };

  const handleSaveChat = () => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(chatHistory));
      toast.success(isSpanish 
        ? "Conversación guardada correctamente." 
        : "Chat conversation saved successfully!");
    } catch (error) {
      console.error('Error saving chat history:', error);
      toast.error(isSpanish 
        ? "Error al guardar la conversación. Por favor, inténtalo de nuevo." 
        : "Error saving the conversation. Please try again.");
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Set up the document
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(isSpanish ? "Mi Conclusión" : "My Conclusion", 15, 20);
      
      // Add conclusion
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const conclusionLines = doc.splitTextToSize(conclusion || (isSpanish ? "No se proporcionó conclusión" : "No conclusion provided"), 180);
      doc.text(conclusionLines, 15, 30);
      
      // Add chat history title
      const chatStartY = 30 + (conclusionLines.length * 7) + 10;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(isSpanish ? "Conversación" : "Chat Conversation", 15, chatStartY);
      
      // Add chat messages
      let yOffset = chatStartY + 10;
      doc.setFontSize(11);
      
      chatHistory.forEach((message) => {
        // Add role/sender
        doc.setFont("helvetica", "bold");
        const sender = message.role === 'user' 
          ? (isSpanish ? "Tú" : "You") 
          : (isSpanish ? "Asistente" : "Assistant");
        doc.text(`${sender} (${message.timestamp}):`, 15, yOffset);
        yOffset += 7;
        
        // Add message content
        doc.setFont("helvetica", "normal");
        const messageLines = doc.splitTextToSize(message.content, 175);
        doc.text(messageLines, 20, yOffset);
        yOffset += (messageLines.length * 6) + 5;
        
        // Handle page overflow
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
      });
      
      // Save the PDF
      doc.save(isSpanish ? 'mi-conclusion-y-chat.pdf' : 'my-conclusion-and-chat.pdf');
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

  // Simulated AI response - replace with actual AI integration
  const getSimulatedResponse = (message: string, userConclusion: string): string => {
    // Simplified response logic
    if (message.toLowerCase().includes('help') || message.toLowerCase().includes('ayuda')) {
      return isSpanish
        ? "Estoy aquí para ayudarte a reflexionar sobre tus conclusiones. ¿En qué puedo asistirte específicamente?"
        : "I'm here to help you reflect on your conclusions. How can I assist you specifically?";
    }
    
    if (message.toLowerCase().includes('explain') || message.toLowerCase().includes('explica')) {
      return isSpanish
        ? "Basándome en tu conclusión, parece que tienes algunos puntos interesantes sobre estrategia de marca. ¿Te gustaría profundizar en algún aspecto particular?"
        : "Based on your conclusion, you seem to have some interesting points about brand strategy. Would you like to explore any particular aspect in more depth?";
    }
    
    // Default response
    return isSpanish
      ? "Gracias por compartir tus pensamientos. La coherencia y consistencia en la estrategia de marca son fundamentales para construir una identidad sólida. ¿Hay algún aspecto específico sobre el que quieras profundizar?"
      : "Thank you for sharing your thoughts. Coherence and consistency in brand strategy are essential for building a strong identity. Is there any specific aspect you'd like to explore further?";
  };

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
          {isSpanish ? "Ejercicio de Conclusión" : "Conclusion Exercise"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Conclusion Input */}
          <div>
            <Card className="h-full shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-primary" size={24} />
                  <h3 className="font-playfair text-xl font-semibold">
                    {isSpanish ? "Mi Conclusión" : "My Conclusion"}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 font-inter">
                  {isSpanish 
                    ? "Escribe tus conclusiones sobre lo que has aprendido en este módulo sobre estrategia de marca."
                    : "Write down your conclusions about what you've learned in this module about brand strategy."}
                </p>
                <Textarea 
                  value={conclusion}
                  onChange={handleConclusionChange}
                  placeholder={isSpanish ? "Escribe tu conclusión aquí..." : "Write your conclusion here..."}
                  className="min-h-[200px] mb-4 font-inter"
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Section */}
          <div>
            <Card className="h-full shadow-sm flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="text-primary" size={24} />
                  <h3 className="font-playfair text-xl font-semibold">
                    {isSpanish ? "Conversa sobre tu conclusión" : "Discuss Your Conclusion"}
                  </h3>
                </div>
                
                {/* Chat display area */}
                <div className="flex-grow bg-gray-50 rounded-md p-4 mb-4 overflow-y-auto max-h-[400px]">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      {isSpanish 
                        ? "Inicia una conversación sobre tu conclusión"
                        : "Start a conversation about your conclusion"}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div className={`max-w-[85%] rounded-lg px-4 py-2 ${
                            msg.role === 'user' 
                              ? 'bg-primary text-white'
                              : 'bg-white border border-gray-200'
                          }`}>
                            <p className="text-sm font-inter">{msg.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">
                            {msg.timestamp}
                          </span>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  )}
                </div>
                
                {/* Chat input form */}
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={isSpanish ? "Escribe tu mensaje..." : "Type your message..."}
                    className="min-h-[50px] resize-none flex-grow"
                  />
                  <div className="flex flex-col gap-2">
                    <Button 
                      type="submit" 
                      disabled={isLoading || !chatInput.trim()}
                      className="h-[50px]"
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                      ) : (
                        isSpanish ? "Enviar" : "Send"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <Button 
            variant="outline" 
            onClick={handleSaveChat}
            disabled={chatHistory.length === 0}
            className="flex items-center gap-2"
          >
            <Save size={18} />
            {isSpanish ? "Guardar Conversación" : "Save Conversation"}
          </Button>
          <Button 
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={!conclusion && chatHistory.length === 0}
            className="flex items-center gap-2"
          >
            <Download size={18} />
            {isSpanish ? "Descargar como PDF" : "Download as PDF"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConclusionExercise;
