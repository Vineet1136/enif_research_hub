// /home/ubuntu/app/enif_research_hub/src/services/openai.js
import OpenAI from 'openai';

/**
 * Initializes the OpenAI client with the API key from environment variables.
 * @returns {OpenAI} Configured OpenAI client instance.
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Generates a summary for a research paper using OpenAI's API.
 * @param {Object} paperData - The paper data to summarize.
 * @returns {Promise<Object>} The generated summary and important images.
 */
export async function generatePaperSummary(paperData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a research assistant specializing in creating concise, insightful summaries of academic papers. Focus on key findings, methodology, and implications. Identify 2-3 significant diagrams or figures that would be most helpful for understanding the paper.' },
        { role: 'user', content: `Generate a comprehensive summary of the following research paper:\n\nTitle: ${paperData.title}\nAuthors: ${paperData.authors.join(', ')}\nAbstract: ${paperData.abstract}\nMethodology: ${paperData.methodology || ''}\nResults: ${paperData.results || ''}` }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'paper_summary_response',
          schema: {
            type: 'object',
            properties: {
              summary: {
                type: 'string',
                description: 'A comprehensive yet concise summary of the research paper'
              },
              key_points: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of 3-5 key points from the paper'
              },
              important_diagram_descriptions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    importance: { type: 'string' }
                  }
                },
                description: 'Descriptions of 2-3 important diagrams or figures that should be highlighted'
              }
            },
            required: ['summary', 'key_points', 'important_diagram_descriptions']
          }
        }
      },
      temperature: 0.7,
      max_tokens: 1000
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating paper summary:', error);
    throw error;
  }
}

export default openai;