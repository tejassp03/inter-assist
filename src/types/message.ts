export interface Message {
  id: string;
  type: 'question' | 'answer' | 'assistant';
  content: string;
}