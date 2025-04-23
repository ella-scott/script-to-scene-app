export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { script } = req.body;

  if (!script) {
    return res.status(400).json({ error: "Missing script text" });
  }

  // Turn the script into a prompt (for now, send the first scene)
  const firstScene = script.split(/INT\.|EXT\./).filter(s => s.trim())[0];
  const prompt = `Generate a cinematic image of the scene: "${firstScene.trim()}"`;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();

    if (!data.data || !data.data[0]) {
      return res.status(500).json({ error: "Image generation failed", detail: data });
    }

    return res.status(200).json({
      prompt,
      imageUrl: data.data[0].url,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
