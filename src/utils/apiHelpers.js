export const enhancePrompt = async (input) => {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert prompt engineer. Expand into a detailed 50-word image prompt with lighting, camera angle, style."
          },
          { role: "user", content: input }
        ]
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;

  } catch (err) {
    console.error(err);
    return "Error enhancing prompt";
  }
};
export const generateImage = async (prompt) => {
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: prompt,
        size: "512x512",
      }),
    });

    const data = await res.json();
    return data.data[0].url;
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const analyzeImage = async (base64) => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Analyze this image and return subject, colors, and style"
                },
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: base64
                  }
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;

  } catch (err) {
    console.error(err);
    return "Error analyzing image";
  }
};
