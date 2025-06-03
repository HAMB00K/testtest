import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessageDisplay({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={cn('flex items-start gap-3 py-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          'max-w-[75%] whitespace-pre-wrap rounded-xl p-3 shadow-md',
          isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'
        )}
      >
        <CardContent className="p-0 text-sm">
          {message.isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            message.text
          )}
        </CardContent>
      </Card>
      {isUser && (
         <Avatar className="h-8 w-8 shrink-0">
           <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="avatar person" />
          <AvatarFallback>
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
