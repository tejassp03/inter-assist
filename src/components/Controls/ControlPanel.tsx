import React from 'react';
import { StatusIndicator } from '../StatusIndicator';
import { RecordButton } from './RecordButton';

interface ControlPanelProps {
  isRecording: boolean;
  isProcessing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function ControlPanel({
  isRecording,
  isProcessing,
  onStartRecording,
  onStopRecording
}: ControlPanelProps) {
  return (
    <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg gap-6">
      <StatusIndicator isListening={isRecording} />
      <RecordButton
        isRecording={isRecording}
        isProcessing={isProcessing}
        onStart={onStartRecording}
        onStop={onStopRecording}
      />
    </div>
  );
}