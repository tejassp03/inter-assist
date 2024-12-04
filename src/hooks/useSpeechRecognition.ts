import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
}

export function useSpeechRecognition({ onResult, onError }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const currentTranscriptRef = useRef<string>('');
  const silenceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognitionRef.current = recognition;

        recognition.onresult = (event: { results: string | any[]; }) => {
          const lastResult = event.results[event.results.length - 1];
          const transcript = lastResult[0].transcript;
          currentTranscriptRef.current = transcript;

          // If this is a final result, process it
          if (lastResult.isFinal) {
            onResult(transcript.trim());
            currentTranscriptRef.current = '';
          }

          // Reset silence timeout
          if (silenceTimeoutRef.current) {
            window.clearTimeout(silenceTimeoutRef.current);
          }

          // Set new silence timeout
          silenceTimeoutRef.current = window.setTimeout(() => {
            if (currentTranscriptRef.current) {
              onResult(currentTranscriptRef.current.trim());
              currentTranscriptRef.current = '';
            }
          }, 1000); // 1.5 seconds of silence triggers processing
        };

        recognition.onerror = (event: { error: string; }) => {
          if (event.error !== 'no-speech') {
            onError?.(event.error);
            setIsListening(false);
          }
        };

        recognition.onend = () => {
          // Automatically restart if we're supposed to be listening
          if (isListening && recognitionRef.current) {
            recognitionRef.current.start();
          }
        };
      }
    }

    return () => {
      if (silenceTimeoutRef.current) {
        window.clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [onResult, onError, isListening]);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (silenceTimeoutRef.current) {
        window.clearTimeout(silenceTimeoutRef.current);
      }
    }
  }, []);

  return {
    isListening,
    startListening,
    stopListening,
    hasSupport: !!recognitionRef.current
  };
}