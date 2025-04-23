export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
  // ✅ Simulated test: Just return fake data to make sure the route works
  return res.status(200).json({
    prompt: "This is a test prompt response.",
    imageURL: "https://via.placeholder.com/800x400.png?text=Test+Image"
  });
} catch (error) {
  console.error("Backend error:", error);
  return res.status(500).json({ error: "Internal Server Error" });
}
