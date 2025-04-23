export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { script } = req.body;

    if (!script || typeof script !== "string") {
      return res.status(400).json({ error: "Invalid script input" });
    }

    // Temporary placeholder response for testing
    const prompt = `Generate a cinematic image of the scene: "${script}"`;
    const imageURL = "https://via.placeholder.com/800x400.png?text=Test+Image";

    return res.status(200).json({
      prompt,
      imageURL,
    });
  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
