export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { script } = req.body;

  if (!script) {
    return res.status(400).json({ error: "Script is missing from request." });
  }

  // Just to confirm it's working — log a fake response
  const fakePrompt = `Generate a cinematic image of the scene: "${script.split('\n')[0]}"`;

  return res.status(200).json({ prompt: fakePrompt });
}
