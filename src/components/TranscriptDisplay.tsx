import React, { useEffect, useRef } from 'react';
import { ScrollText } from 'lucide-react';
import { cn } from '../utils/cn';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  type: 'question' | 'answer' | 'assistant';
  content: string; // Can include markdown-like syntax for formatting.
}

interface TranscriptDisplayProps {
  messages: Message[];
  className?: string;
}

export function TranscriptDisplay({ messages, className }: TranscriptDisplayProps) {
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (['answer', 'assistant'].includes(lastMessage.type)) {
        const ref = scrollRefs.current[lastMessage.id];
        if (ref) {
          ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [messages]);

  return (
    <div className={cn('bg-gray-900 rounded-lg p-4 overflow-y-auto', className)}>
      <div className="space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            ref={(el) => (scrollRefs.current[message.id] = el)}
            className={cn(
              'p-3 rounded-lg',
              message.type === 'question' && 'bg-gray-800 text-white',
              message.type === 'answer' && 'bg-indigo-900/50 text-white',
              message.type === 'assistant' && 'bg-emerald-900/50 text-white'
            )}
          >
            <div className="text-sm text-gray-400 mb-1">
              {message.type.charAt(0).toUpperCase() + message.type.slice(1)}:
            </div>
            <div className="text-sm">
              <ReactMarkdown
                components={{
                  code({ className, children, ...rest }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        PreTag="div"
                        language={match[1]}
                        style={dark}
                        {...rest}
                      >
                        {children}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
