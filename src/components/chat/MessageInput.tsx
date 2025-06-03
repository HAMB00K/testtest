'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal, Paperclip, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
  isLoading: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 z-10 flex items-end gap-2 border-t bg-background p-4 md:p-6"
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Securibot about cybersecurity..."
        className="flex-1 resize-none rounded-xl border-input bg-secondary focus-visible:ring-primary focus-visible:ring-2 min-h-[52px] max-h-[150px] overflow-y-auto pr-20"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
          }
        }}
        rows={1}
        disabled={isLoading}
        aria-label="Chat message input"
      />
      <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8 flex items-center gap-1">
         <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-primary"
          disabled={isLoading}
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button
          type="submit"
          size="icon"
          variant="default"
          disabled={isLoading || !message.trim()}
          aria-label="Send message"
          className={cn(isLoading ? "bg-muted text-muted-foreground" : "bg-primary hover:bg-primary/90")}
        >
          {isLoading ? <SendHorizonal className="h-5 w-5 animate-pulse" /> : <SendHorizonal className="h-5 w-5" />}
        </Button>
      </div>
    </form>
  );
}
