import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RecordButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function RecordButton({ isRecording, isProcessing, onStart, onStop }: RecordButtonProps) {
  return (
    <button
      onClick={isRecording ? onStop : onStart}
      disabled={isProcessing}
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        isRecording
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-indigo-600 hover:bg-indigo-700 text-white",
        isProcessing && "opacity-50 cursor-not-allowed"
      )}
    >
      {isRecording ? (
        <span className="flex items-center gap-2">
          <MicOff className="w-4 h-4" />
          Stop Interview
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Mic className="w-4 h-4" />
          Start Interview
        </span>
      )}
    </button>
  );
}