export function isQuestion(text: string): boolean {
  const questionIndicators = [
    '?',
    'what',
    'how',
    'why',
    'can',
    'could',
    'would',
    'should',
    'where',
    'when',
    'who'
  ];

  const lowercaseText = text.toLowerCase().trim();
  return questionIndicators.some(indicator => 
    lowercaseText.endsWith('?') || lowercaseText.startsWith(indicator)
  );
}