'use server';
/**
 * @fileOverview An AI agent that answers cybersecurity-related questions.
 *
 * - answerCybersecurityQuestion - A function that handles the cybersecurity question answering process.
 * - AnswerCybersecurityQuestionInput - The input type for the answerCybersecurityQuestion function.
 * - AnswerCybersecurityQuestionOutput - The return type for the answerCybersecurityQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerCybersecurityQuestionInputSchema = z.object({
  question: z.string().describe('The cybersecurity-related question to be answered.'),
});
export type AnswerCybersecurityQuestionInput = z.infer<typeof AnswerCybersecurityQuestionInputSchema>;

const AnswerCybersecurityQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the cybersecurity-related question.'),
});
export type AnswerCybersecurityQuestionOutput = z.infer<typeof AnswerCybersecurityQuestionOutputSchema>;

export async function answerCybersecurityQuestion(
  input: AnswerCybersecurityQuestionInput
): Promise<AnswerCybersecurityQuestionOutput> {
  return answerCybersecurityQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerCybersecurityQuestionPrompt',
  input: {schema: AnswerCybersecurityQuestionInputSchema},
  output: {schema: AnswerCybersecurityQuestionOutputSchema},
  prompt: `You are a cybersecurity expert. Please answer the following question about cybersecurity accurately and informatively:\n\nQuestion: {{{question}}}`,
});

const answerCybersecurityQuestionFlow = ai.defineFlow(
  {
    name: 'answerCybersecurityQuestionFlow',
    inputSchema: AnswerCybersecurityQuestionInputSchema,
    outputSchema: AnswerCybersecurityQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
