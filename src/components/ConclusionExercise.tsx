
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FileText, Save, MessageSquare, Download, SendHorizonal, RefreshCcw } from "lucide-react";
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

// Context information about the course content
const getCourseContext = (isSpanish: boolean) => {
  return isSpanish ? 
    `Este módulo trata sobre estrategia de marca y cubre los siguientes temas principales:
    1. Contexto de la marca: Análisis del entorno competitivo, posicionamiento actual y público objetivo.
    2. Visión de marca: Definición de la visión a largo plazo, propósito y misión de la marca.
    3. Valores de marca: Identificación de los valores fundamentales que definen la personalidad de la marca.
    4. Coherencia de marca: Asegurar la consistencia en todos los puntos de contacto con el cliente.
    5. Canales de comunicación: Selección de canales adecuados para transmitir el mensaje de marca.
    
    Los estudiantes han trabajado en ejercicios prácticos sobre definición de valores de marca y selección de canales apropiados.` : 
    
    `This module is about brand strategy and covers the following main topics:
    1. Brand Context: Analysis of competitive environment, current positioning, and target audience.
    2. Brand Vision: Definition of long-term vision, purpose, and mission of the brand.
    3. Brand Values: Identification of core values that define the brand's personality.
    4. Brand Coherence: Ensuring consistency across all customer touchpoints.
    5. Communication Channels: Selection of appropriate channels to convey the brand message.
    
    Students have worked on practical exercises regarding brand value definition and appropriate channel selection.`;
};

const ConclusionExercise = () => {
  const [conclusion, setConclusion] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isSpanish = location.pathname.includes('/es');
  const courseContext = getCourseContext(isSpanish);

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
        // Including context from user's conclusion and course content
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

  const askForFeedback = () => {
    if (!conclusion.trim()) {
      toast.error(isSpanish 
        ? "Por favor, escribe tu conclusión primero." 
        : "Please write your conclusion first.");
      return;
    }

    const feedbackPrompt = isSpanish
      ? "Por favor, dame tu opinión sobre mi conclusión."
      : "Please give me feedback on my conclusion.";
    
    setChatInput(feedbackPrompt);
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: `${feedbackPrompt}\n\n"${conclusion}"`,
      timestamp: formatTime()
    };
    
    const updatedChat = [...chatHistory, userMessage];
    setChatHistory(updatedChat);
    saveChat(updatedChat);
    setChatInput('');
    setIsLoading(true);
    
    try {
      // Simulate API call to ChatGPT with context
      setTimeout(() => {
        const aiResponse = getSimulatedFeedbackResponse(conclusion);
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
        ? "Error al procesar tu solicitud. Por favor, inténtalo de nuevo." 
        : "Error processing your request. Please try again.");
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

  const handleReset = () => {
    setConclusion('');
    setChatHistory([]);
    setChatInput('');
    
    localStorage.removeItem(STORAGE_KEY_CONCLUSION);
    localStorage.removeItem(STORAGE_KEY_CHAT);
    
    toast.success(isSpanish 
      ? "Los datos han sido reiniciados correctamente."
      : "Data has been reset successfully.");
  };

  // Enhanced simulated responses that take into account the course context
  const getSimulatedResponse = (message: string, userConclusion: string): string => {
    // Include course context in the consideration
    if (message.toLowerCase().includes('help') || message.toLowerCase().includes('ayuda')) {
      return isSpanish
        ? `Estoy aquí para ayudarte a reflexionar sobre tus conclusiones relacionadas con la estrategia de marca. Basándome en el contenido del módulo sobre contexto de marca, visión, valores, coherencia y canales de comunicación, ¿en qué aspecto específico necesitas ayuda?`
        : `I'm here to help you reflect on your conclusions about brand strategy. Based on the module content about brand context, vision, values, coherence, and communication channels, what specific aspect do you need help with?`;
    }
    
    if (message.toLowerCase().includes('explain') || message.toLowerCase().includes('explica')) {
      return isSpanish
        ? `Analizando tu conclusión sobre estrategia de marca, observo que has tocado temas relacionados con ${userConclusion.length > 30 ? 'varios aspectos del curso' : 'estrategia de marca'}. Recuerda que una estrategia de marca efectiva integra el contexto competitivo, una visión clara, valores definidos, coherencia en todos los puntos de contacto y la selección adecuada de canales. ¿Te gustaría profundizar en alguno de estos elementos específicos?`
        : `Analyzing your conclusion about brand strategy, I notice you've touched on topics related to ${userConclusion.length > 30 ? 'several aspects of the course' : 'brand strategy'}. Remember that an effective brand strategy integrates competitive context, a clear vision, defined values, coherence across all touchpoints, and proper channel selection. Would you like to explore any of these specific elements further?`;
    }
    
    return isSpanish
      ? `Gracias por compartir tus pensamientos sobre estrategia de marca. Para construir una identidad sólida, es fundamental integrar los cinco pilares que hemos estudiado: contexto (análisis competitivo y público objetivo), visión (propósito y misión), valores (personalidad de marca), coherencia (consistencia en todos los puntos de contacto) y selección de canales adecuados. ¿Hay alguno de estos aspectos sobre el que quieras profundizar en particular?`
      : `Thank you for sharing your thoughts on brand strategy. To build a strong identity, it's essential to integrate the five pillars we've studied: context (competitive analysis and target audience), vision (purpose and mission), values (brand personality), coherence (consistency across all touchpoints), and appropriate channel selection. Is there any of these aspects you would like to explore further?`;
  };

  // Enhanced feedback response that incorporates course context
  const getSimulatedFeedbackResponse = (userConclusion: string): string => {
    if (!userConclusion.trim()) {
      return isSpanish
        ? "No veo una conclusión en tu mensaje. ¿Podrías compartir tu conclusión para que pueda darte retroalimentación?"
        : "I don't see a conclusion in your message. Could you share your conclusion so I can provide feedback?";
    }
    
    // Analysis of the conclusion length to provide more personalized feedback
    const isBrief = userConclusion.length < 100;
    const isMedium = userConclusion.length >= 100 && userConclusion.length < 300;
    const isDetailed = userConclusion.length >= 300;
    
    // Check for keywords to determine which aspects of brand strategy are covered
    const mentionsContext = userConclusion.toLowerCase().includes('context') || userConclusion.toLowerCase().includes('contexto');
    const mentionsVision = userConclusion.toLowerCase().includes('vision') || userConclusion.toLowerCase().includes('visión');
    const mentionsValues = userConclusion.toLowerCase().includes('values') || userConclusion.toLowerCase().includes('valores');
    const mentionsCoherence = userConclusion.toLowerCase().includes('coherence') || userConclusion.toLowerCase().includes('coherencia');
    const mentionsChannels = userConclusion.toLowerCase().includes('channel') || userConclusion.toLowerCase().includes('canal');
    
    let feedback = '';
    
    if (isSpanish) {
      feedback = "Gracias por compartir tu conclusión sobre estrategia de marca. ";
      
      if (isBrief) {
        feedback += "Tu conclusión es concisa, lo cual puede ser efectivo para comunicar ideas clave. Sin embargo, podría beneficiarse de mayor elaboración. ";
      } else if (isDetailed) {
        feedback += "Has desarrollado una conclusión muy detallada, lo que demuestra una reflexión profunda. ";
      }
      
      // Feedback based on content coverage
      if (mentionsContext && mentionsVision && mentionsValues && mentionsCoherence && mentionsChannels) {
        feedback += "Has abordado los cinco pilares fundamentales de la estrategia de marca que se discutieron en el módulo: contexto, visión, valores, coherencia y canales de comunicación. Esto demuestra una comprensión integral del tema. ";
      } else {
        feedback += "En tu conclusión, ";
        
        if (mentionsContext) feedback += "has abordado el análisis de contexto de marca, que es fundamental para entender el entorno competitivo. ";
        if (mentionsVision) feedback += "has incluido la importancia de la visión de marca, esencial para establecer el propósito y dirección. ";
        if (mentionsValues) feedback += "has reconocido el papel de los valores en la definición de la personalidad de la marca. ";
        if (mentionsCoherence) feedback += "has señalado la importancia de la coherencia en todos los puntos de contacto con el cliente. ";
        if (mentionsChannels) feedback += "has mencionado la selección de canales adecuados para transmitir el mensaje de marca. ";
        
        const missingElements = [];
        if (!mentionsContext) missingElements.push("contexto de marca");
        if (!mentionsVision) missingElements.push("visión de marca");
        if (!mentionsValues) missingElements.push("valores de marca");
        if (!mentionsCoherence) missingElements.push("coherencia de marca");
        if (!mentionsChannels) missingElements.push("canales de comunicación");
        
        if (missingElements.length > 0) {
          feedback += `Podrías considerar expandir tu análisis para incluir también ${missingElements.join(', ')}, lo que proporcionaría una perspectiva más completa de la estrategia de marca. `;
        }
      }
      
      feedback += "Para fortalecer aún más tu conclusión, considera incluir ejemplos específicos o casos de estudio que ilustren los principios de estrategia de marca que has mencionado. También podrías reflexionar sobre cómo estos principios se aplican en diferentes contextos o industrias. ¿Hay algún aspecto específico de tu conclusión sobre el que te gustaría profundizar?";
    } else {
      feedback = "Thank you for sharing your conclusion about brand strategy. ";
      
      if (isBrief) {
        feedback += "Your conclusion is concise, which can be effective for communicating key ideas. However, it might benefit from further elaboration. ";
      } else if (isDetailed) {
        feedback += "You've developed a very detailed conclusion, showing deep reflection. ";
      }
      
      // Feedback based on content coverage
      if (mentionsContext && mentionsVision && mentionsValues && mentionsCoherence && mentionsChannels) {
        feedback += "You've addressed all five fundamental pillars of brand strategy discussed in the module: context, vision, values, coherence, and communication channels. This demonstrates a comprehensive understanding of the topic. ";
      } else {
        feedback += "In your conclusion, ";
        
        if (mentionsContext) feedback += "you've addressed brand context analysis, which is fundamental to understanding the competitive environment. ";
        if (mentionsVision) feedback += "you've included the importance of brand vision, essential for establishing purpose and direction. ";
        if (mentionsValues) feedback += "you've recognized the role of values in defining brand personality. ";
        if (mentionsCoherence) feedback += "you've pointed out the importance of coherence across all customer touchpoints. ";
        if (mentionsChannels) feedback += "you've mentioned the selection of appropriate channels to convey the brand message. ";
        
        const missingElements = [];
        if (!mentionsContext) missingElements.push("brand context");
        if (!mentionsVision) missingElements.push("brand vision");
        if (!mentionsValues) missingElements.push("brand values");
        if (!mentionsCoherence) missingElements.push("brand coherence");
        if (!mentionsChannels) missingElements.push("communication channels");
        
        if (missingElements.length > 0) {
          feedback += `You might consider expanding your analysis to also include ${missingElements.join(', ')}, which would provide a more complete perspective on brand strategy. `;
        }
      }
      
      feedback += "To strengthen your conclusion further, consider including specific examples or case studies that illustrate the brand strategy principles you've mentioned. You could also reflect on how these principles apply in different contexts or industries. Is there a specific aspect of your conclusion you'd like to explore further?";
    }
    
    return feedback;
  };

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
          {isSpanish ? "Ejercicio de Conclusión" : "Conclusion Exercise"}
        </h2>
        
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-sm">
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
              <div className="flex justify-between">
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCcw size={18} />
                  {isSpanish ? "Reiniciar ejercicio" : "Reset exercise"}
                </Button>
                
                <Button 
                  onClick={askForFeedback}
                  className="flex items-center gap-2"
                  disabled={!conclusion.trim() || isLoading}
                >
                  <MessageSquare size={18} />
                  {isSpanish ? "Pedir retroalimentación" : "Ask for feedback"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-primary" size={24} />
                <h3 className="font-playfair text-xl font-semibold">
                  {isSpanish ? "Conversa sobre tu conclusión" : "Discuss Your Conclusion"}
                </h3>
              </div>
              
              {/* Chat display area */}
              <div className="bg-gray-50 rounded-md p-4 mb-4 overflow-y-auto h-[400px]">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    {isSpanish 
                      ? "Escribe tu conclusión arriba y luego haz clic en 'Pedir retroalimentación' para comenzar una conversación"
                      : "Write your conclusion above and then click 'Ask for feedback' to start a conversation"}
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
                <Button 
                  type="submit" 
                  disabled={isLoading || !chatInput.trim()}
                  size="icon"
                  className="h-[50px] w-[50px]"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                  ) : (
                    <SendHorizonal size={18} />
                  )}
                </Button>
              </form>
              
              {/* Action buttons */}
              <div className="flex justify-between mt-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConclusionExercise;
