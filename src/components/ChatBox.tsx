
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from "@/components/ChatMessage";
import { Card } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!question.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      // This would be a real API call in production
      // For demo, we'll simulate a response
      setTimeout(() => {
        const aiResponses = [
          "Based on the data, the Engineering team currently has the lowest engagement scores, with a 25% drop in the last quarter.",
          "I've analyzed the risk metrics, and there's a significant spike in the cybersecurity risk category over the last 7 days.",
          "Looking at your team data, I can see that Marketing and Sales teams are showing the highest engagement levels this month.",
          "According to the performance metrics, Project Alpha is behind schedule by approximately 2.3 weeks.",
          "Customer satisfaction has increased by 12% since the UI redesign was implemented last month."
        ];

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const botMessage = {
          id: Date.now().toString(),
          text: randomResponse,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto message-container pr-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h3 className="text-2xl font-semibold text-primary mb-2">Ask Me Anything</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Get insights about your analytics data by asking questions in natural language
            </p>
            <Card className="max-w-md w-full p-4 bg-muted/50">
              <p className="text-sm font-medium mb-2">Try asking questions like:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>"Which teams are least engaged?"</li>
                <li>"Are there any risk spikes in the last week?"</li>
                <li>"Show me project timelines that are behind schedule"</li>
                <li>"What's our current customer satisfaction score?"</li>
              </ul>
            </Card>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex w-full mb-4 justify-start">
                <Card className="max-w-[80%] p-4 shadow-sm bg-card border">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 pb-2">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your analytics data..."
              className="min-h-[60px] resize-none pr-16"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2"
              disabled={!question.trim() || isLoading}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
