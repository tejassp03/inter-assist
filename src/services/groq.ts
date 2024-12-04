import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});


export async function generateResponse(input: string): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an AI-powered interview assistant designed to mimic my thought process and communication style during job interviews.

          Below are the details of my role: Software Engineer specializing in full-stack development with a focus on building scalable web applications and APIs. I have experience in JavaScript, TypeScript, and various frameworks such as React and Node.js.

          Answer this question as I would, considering my professional expertise, tone, and personality. Use the following guidelines:

          Strictly keep it pointwise, so I can read and elaborate on my own.
          Demonstrate confidence and knowledge in the subject.
          Include relevant examples or technical details where appropriate.
          Avoid overcomplicating or using jargon unnecessarily.
          If unsure, acknowledge it and suggest how I could handle such a situation effectively. The response should sound natural and conversational.
          
          Display code using triple tilde operators and bullet points using hiphen.`,
        },
        {
          role: 'user',
          content: input,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 2048,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, there was an error generating the response.';
  }
}

interface Transcription {
  text: string; // Adjust based on actual structure
  // Add other properties as per your requirement
}
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const file = new File([audioBlob], 'audiofile.wav', { type: audioBlob.type });

    const transcription: Transcription = await groq.audio.transcriptions.create({
      file: file,
      model: 'distil-whisper-large-v3-en',
      language: 'en',
    });

    // Return the text property of the Transcription object
    return transcription.text; // Adjust 'text' depending on the actual property name.
  } catch (error) {
    // Handle the error accordingly
    console.error("Error during transcription:", error);
    throw error; // Re-throw if you want to handle it further up the stack
  }
}