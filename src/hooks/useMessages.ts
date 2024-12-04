import { useState, useCallback } from 'react';
import { Message } from '../types/message';
import { generateResponse } from '../services/groq';
import { isQuestion } from '../utils/textAnalysis';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTranscription = useCallback(async (transcript: string) => {
    setIsProcessing(true);
    
    if (isQuestion(transcript)) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'question',
        content: transcript
      }]);

      try {
        const response = await generateResponse(transcript);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: response
        }]);
      } catch (error) {
        console.error('Error generating response:', error);
      }
    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'answer',
        content: transcript
      }]);
    }
    
    setIsProcessing(false);
  }, []);

  return {
    messages,
    isProcessing,
    handleTranscription
  };
}