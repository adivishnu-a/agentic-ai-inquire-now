
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <Card
        className={cn(
          "max-w-[80%] p-4 shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-card border"
        )}
      >
        <div className="text-sm whitespace-pre-wrap">{message}</div>
        <div 
          className={cn(
            "text-xs mt-2",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </Card>
    </div>
  );
};

export default ChatMessage;
