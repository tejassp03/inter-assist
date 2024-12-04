import React from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/Controls';
import { TranscriptDisplay } from './components/TranscriptDisplay';
import { useAudioRecording } from './hooks/useAudioRecording';
import { useMessages } from './hooks/useMessages';

function App() {
  const { messages, isProcessing, handleTranscription } = useMessages();
  const { isRecording, startRecording, stopRecording, hasSupport } = useAudioRecording({
    onTranscription: handleTranscription,
    onError: (error) => console.error('Audio recording error:', error)
  });

  // if (!hasSupport) {
  //   return (
  //     <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
  //       <div className="text-center p-8">
  //         <h1 className="text-2xl font-bold text-red-400 mb-4">Audio Recording Not Supported</h1>
  //         <p>Your browser doesn't support audio recording.</p>
  //         <p className="mt-2">Please try using a modern browser like Chrome.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
  <div className="min-h-screen bg-gray-950 text-white p-6">
    <div className="max-w-6xl mx-auto"> {/* Increased max width */}
      {/* Removed the Header component */}
      <div className="grid gap-6">
        <ControlPanel
          isRecording={isRecording}
          isProcessing={isProcessing}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
        <TranscriptDisplay 
          messages={messages}
          className="h-[calc(100vh-150px)]"
        />
      </div>
    </div>
  </div>
  );
}

export default App;