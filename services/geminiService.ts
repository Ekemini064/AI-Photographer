
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MODEL_NAME } from "../constants";

export class GeminiService {
  /**
   * Generates a professional headshot from a base image and style prompt.
   */
  async generateHeadshot(base64Image: string, stylePrompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `
      ACT AS A WORLD-CLASS PROFESSIONAL PHOTOGRAPHER.
      TASK: Transform the person in the provided photo into a professional high-end corporate headshot.
      STYLE REQUIREMENTS: ${stylePrompt}.
      
      TECHNICAL INSTRUCTIONS:
      1. Keep the person's facial features, hair color, and basic identity identical to the source.
      2. Place the person in a classic chest-up headshot composition.
      3. Improve the lighting to be flattering "Rembrandt lighting" or studio quality.
      4. Professional Attire: Dress the person in modern professional business attire (e.g., blazer, suit, or professional blouse).
      5. Resolution: Ultra-high definition, cinematic quality.
      6. Output ONLY the image.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    return this.extractImageUrl(response);
  }

  /**
   * Edits an existing headshot based on a natural language instruction.
   */
  async editHeadshot(base64Image: string, editInstruction: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `
      ACT AS A DIGITAL RETOUCHER.
      TASK: Apply the following edit to this professional headshot: "${editInstruction}".
      Maintain the original professional quality, lighting, and facial features. 
      Only modify what is requested.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/png' } },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    return this.extractImageUrl(response);
  }

  private extractImageUrl(response: GenerateContentResponse): string {
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (!part?.inlineData) {
      throw new Error("No image data returned from AI");
    }
    return `data:image/png;base64,${part.inlineData.data}`;
  }
}
