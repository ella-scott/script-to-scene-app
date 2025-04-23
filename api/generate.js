export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { script } = req.body;

    if (!script || typeof script !== "string") {
      return res.status(400).json({ error: "Invalid script input" });
    }

    // Simulated response (replace this with OpenAI logic later)
    const prompt = `Generate a cinematic image of the scene: "${script}"`;

    return res.status(200).json({ prompt });
  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
