import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '../utils/cn';

interface StatusIndicatorProps {
  isListening: boolean;
  className?: string;
}

export function StatusIndicator({ isListening, className }: StatusIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isListening ? (
        <>
          <Mic className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-sm">Listening...</span>
        </>
      ) : (
        <>
          <MicOff className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm">Microphone off</span>
        </>
      )}
    </div>
  );
}