// SummarizeCybersecurityArticles flow
'use server';

/**
 * @fileOverview Summarizes cybersecurity articles from given URLs.
 *
 * - summarizeCybersecurityArticles - A function that summarizes cybersecurity articles from given URLs.
 * - SummarizeCybersecurityArticlesInput - The input type for the summarizeCybersecurityArticles function.
 * - SummarizeCybersecurityArticlesOutput - The return type for the summarizeCybersecurityArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCybersecurityArticlesInputSchema = z.object({
  urls: z
    .array(z.string().url())
    .describe('An array of URLs pointing to cybersecurity articles.'),
});
export type SummarizeCybersecurityArticlesInput = z.infer<
  typeof SummarizeCybersecurityArticlesInputSchema
>;

const SummarizeCybersecurityArticlesOutputSchema = z.object({
  summaries: z
    .array(z.string())
    .describe('An array of summaries, one for each input URL.'),
});
export type SummarizeCybersecurityArticlesOutput = z.infer<
  typeof SummarizeCybersecurityArticlesOutputSchema
>;

export async function summarizeCybersecurityArticles(
  input: SummarizeCybersecurityArticlesInput
): Promise<SummarizeCybersecurityArticlesOutput> {
  return summarizeCybersecurityArticlesFlow(input);
}

const articleSummaryPrompt = ai.definePrompt({
  name: 'articleSummaryPrompt',
  input: {schema: z.object({url: z.string().url(), content: z.string()})},
  output: {schema: z.string().describe('A concise summary of the article.')},
  prompt: `You are an expert cybersecurity analyst. Summarize the following article content from the URL {{{url}}} in a concise manner, focusing on the key cybersecurity aspects and potential implications.

Article Content:
{{{content}}}`,
});

async function fetchArticleContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch article from ${url}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error: any) {
    console.error(`Error fetching article from ${url}: ${error.message}`);
    return `Failed to fetch content from ${url}. Please check the URL.`;
  }
}

const summarizeCybersecurityArticlesFlow = ai.defineFlow(
  {
    name: 'summarizeCybersecurityArticlesFlow',
    inputSchema: SummarizeCybersecurityArticlesInputSchema,
    outputSchema: SummarizeCybersecurityArticlesOutputSchema,
  },
  async input => {
    const summaries: string[] = [];

    for (const url of input.urls) {
      const content = await fetchArticleContent(url);
      const {output} = await articleSummaryPrompt({
        url: url,
        content: content,
      });
      summaries.push(output!);
    }

    return {summaries: summaries};
  }
);
