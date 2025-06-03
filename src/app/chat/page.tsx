'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/lib/types';
import { MessageInput } from '@/components/chat/MessageInput';
import { ChatMessageDisplay } from '@/components/chat/ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';
import { answerCybersecurityQuestion } from '@/ai/flows/answer-cybersecurity-questions';
import { suggestRelevantPrompts } from '@/ai/flows/suggest-relevant-prompts';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const prompts = await suggestRelevantPrompts();
        setSuggestedPrompts(prompts.slice(0, 4)); // Show up to 4 suggestions
      } catch (error) {
        console.error("Failed to fetch suggested prompts:", error);
        toast({
          title: "Error",
          description: "Could not load suggested prompts.",
          variant: "destructive",
        });
      }
    }
    if (messages.length === 0) {
      fetchSuggestions();
    }
  }, [messages.length, toast]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    const loadingBotMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: 'Thinking...',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages((prevMessages) => [...prevMessages, loadingBotMessage]);

    try {
      const response = await answerCybersecurityQuestion({ question: text });
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(), // Ensure unique ID if received quickly
        text: response.answer,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => prevMessages.map(m => m.id === loadingBotMessage.id ? botMessage : m));
    } catch (error) {
      console.error('Error getting answer:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error trying to respond. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) =>  prevMessages.map(m => m.id === loadingBotMessage.id ? errorMessage : m));
       toast({
          title: "AI Error",
          description: "Failed to get a response from the AI. Please check your connection or try again later.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPromptClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,0px))]">
      <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
        <div className="max-w-3xl mx-auto space-y-2">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-10">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to Securibot!</h2>
              <p className="text-muted-foreground mb-6">Ask me anything about cybersecurity.</p>
              {suggestedPrompts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto text-left py-3"
                      onClick={() => handleSuggestedPromptClick(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
          {messages.map((msg) => (
            <ChatMessageDisplay key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
