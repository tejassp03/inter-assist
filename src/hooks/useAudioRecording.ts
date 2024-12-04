import { useSpeechRecognition } from './useSpeechRecognition';

interface UseAudioRecordingProps {
  onTranscription: (transcript: string) => void;
  onError?: (error: string) => void;
}

export function useAudioRecording({ onTranscription, onError }: UseAudioRecordingProps) {
  const {
    isListening,
    startListening,
    stopListening,
    hasSupport
  } = useSpeechRecognition({
    onResult: onTranscription,
    onError: (error) => onError?.(error)
  });

  return {
    isRecording: isListening,
    startRecording: startListening,
    stopRecording: stopListening,
    hasSupport
  };
}