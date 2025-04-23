export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: `Create a cinematic, realistic illustration with neutral daylight tones. No orange or warm filters. Scene: ${prompt}`,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      })
    });

    const data = await openaiRes.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ url: data.data[0].url });

  } catch (err) {
    return res.status(500).json({ error: "Failed to generate image." });
  }
}
