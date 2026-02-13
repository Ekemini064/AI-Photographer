export const geminiService = {
  async generateHeadshot(prompt: string) {
    const response = await fetch("/.netlify/functions/generateHeadshot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to generate headshot");
    }

    return response.json();
  },
};
