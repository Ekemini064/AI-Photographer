// GeminiService.ts
// Frontend service that calls the Netlify Function for AI headshots

export class GeminiService {
  // URL of the Netlify Function
  private functionUrl = '/.netlify/functions/generateHeadshot';

  /**
   * Generates a professional headshot using the Netlify Function.
   * @param base64Image - Base64 encoded source image
   * @param stylePrompt - Description of the style to apply
   * @returns Base64 string of generated image
   */
  async generateHeadshot(base64Image: string, stylePrompt: string): Promise<string> {
    try {
      const response = await fetch(this.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64Image, stylePrompt }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Function error: ${text}`);
      }

      const data = await response.json();
      return data.image; // Base64 string for <img>
    } catch (err) {
      console.error('Error generating headshot:', err);
      throw err;
    }
  }

  /**
   * Edits an existing headshot.
   * Reuses the same function: editInstruction is treated as a style prompt.
   */
  async editHeadshot(base64Image: string, editInstruction: string): Promise<string> {
    return this.generateHeadshot(base64Image, editInstruction);
  }
}
