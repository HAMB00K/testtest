// src/ai/flows/suggest-relevant-prompts.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest relevant cybersecurity prompts to the user.
 *
 * - suggestRelevantPrompts - A function that returns a list of relevant cybersecurity prompts.
 * - RelevantPromptsOutput - The output type for the suggestRelevantPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelevantPromptsOutputSchema = z.array(z.string().describe('A relevant cybersecurity prompt.'));
export type RelevantPromptsOutput = z.infer<typeof RelevantPromptsOutputSchema>;

export async function suggestRelevantPrompts(): Promise<RelevantPromptsOutput> {
  return suggestRelevantPromptsFlow();
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantPromptsPrompt',
  output: {schema: RelevantPromptsOutputSchema},
  prompt: `You are a cybersecurity expert. Suggest a few relevant and engaging cybersecurity prompts based on current trends and common concerns. Return them as a JSON array of strings.

Examples:
[
  "What are the latest phishing techniques and how can I identify them?",
  "How can I protect my small business from ransomware attacks?",
  "What are the best practices for securing my home network?",
  "Explain the concept of zero-trust architecture.",
  "How can I improve my password security?"
]

Make sure the prompts are diverse and cover a range of cybersecurity topics. Focus on actionable advice and informative questions.
`,
});

const suggestRelevantPromptsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantPromptsFlow',
    outputSchema: RelevantPromptsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
