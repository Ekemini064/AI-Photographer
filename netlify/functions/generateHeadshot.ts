import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';
import { MODEL_NAME } from '../../constants'; // adjust the path if needed

export const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: 'Missing request body' };
    }

    const { base64Image, stylePrompt } = JSON.parse(event.body);

    if (!base64Image || !stylePrompt) {
      return { statusCode: 400, body: 'Missing parameters: base64Image or stylePrompt' };
    }

    // Server-side: safe API key
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const prompt = `
      ACT AS A WORLD-CLASS PROFESSIONAL PHOTOGRAPHER.
      TASK: Transform the person in the provided photo into a professional high-end corporate headshot.
      STYLE REQUIREMENTS: ${stylePrompt}.
        TECHNICAL INSTRUCTIONS:
      1. Keep the person's facial features, hair color, and basic identity identical to the source.
      2. Place the person in a classic chest-up headshot composition.
      3. Improve the lighting to be flattering "Rembrandt lighting" or studio quality.
      4. Professional Attire: Dress the person in modern professional business attire (e.g., blazer, suit, or professional blouse,
      tailored two-piece suit, three-piece suit with vest, pencil skirt with silk blouse, button-down shirt with tie,
      open-collar dress shirt, turtleneck with blazer, formal business dress, smart business jumpsuit,
      waistcoat and rolled sleeves, corporate polo with slacks, cardigan over a shell top, double-breasted jacket,
      khakis with sport coat, executive overcoat, formal attire with pocket square, minimalist monochrome suit,
      business casual sweater and collared shirt, professional attire with company lanyard, tech-startup hoodie with blazer,
      medical professional lab coat, creative industry smart-casual ensemble).
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
        imageConfig: { aspectRatio: '3:4' }
      }
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);

    if (!part?.inlineData) {
      return { statusCode: 500, body: 'No image returned from AI' };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ image: `data:image/png;base64,${part.inlineData.data}` }),
    };
  } catch (err: any) {
    console.error('Error in generateHeadshot function:', err);
    return { statusCode: 500, body: `Server error: ${err.message}` };
  }
};
