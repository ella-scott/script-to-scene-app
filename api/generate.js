export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { script } = req.body;

  if (!script) {
    return res.status(400).json({ error: "Script is missing from request." });
  }

  // Simulate creating an image prompt (in real case you’d use ChatGPT API here)
  const fakePrompt = `Generate a realistic image of this scene: "${script.split("\n")[0]}"`;

  return res.status(200).json({ prompt: fakePrompt });
}
