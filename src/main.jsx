import React, { useState } from "react";

export default function App() {
  const [imageURL, setImageURL] = useState(null);
  const [script, setScript] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [photos, setPhotos] = useState([]);
  

  const handleScriptFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setScript(e.target.result);
    };

    reader.readAsText(file); // supports .txt files
  };
async function handleGenerate() {
  if (!script) {
    alert("Please enter your script!");
    return;
  }

  try {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ script }),
  });

  if (!res.ok) {
    // Prevent trying to parse error as JSON
    const errorText = await res.text();
    console.error("Server error response:", errorText);
    alert("Something went wrong. Server returned: " + res.status);
    return;
  }

  const data = await res.json();
  setImageURL(data.imageURL); // Show the test/final image
  console.log("Script value:", script);
  console.log("Image prompt received:", data);
  console.log("Scene prompt:", data.prompt);
  alert("Scene prompt: " + data.prompt);
} catch (err) {
  console.error("Client-side fetch error:", err);
  alert("Something went wrong (client side).");
}


const data = await res.json(); // ✅ Only run this if the server responded correctly

    setImageURL(data.imageURL); // This saves the image in memory
    console.log("Script value:", script);
    console.log("Image prompt received:", data);
    console.log("Scene prompt: " + data.prompt);
    alert("Scene prompt: " + data.prompt);
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
}
  
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🎬 Script to Scene Generator</h1>

      <label>
        📝 Paste your script below:
        <br />
        <textarea
          rows="8"
          cols="80"
          placeholder="Enter your video script here..."
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        📂 Or upload your script file (.txt):
        <br />
        <input type="file" accept=".txt,.doc,.docx" onChange={handleScriptFileUpload} />
      </label>

      <br /><br />

      <label>
        🖼️ Upload reference photos:
        <br />
        <input
          type="file"
          multiple
          onChange={(e) => setPhotos([...e.target.files])}
        />
      </label>

      <br /><br />

      <label>
        🎨 Choose art style:
        <br />
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </label>

      <br /><br />

      <button onClick={handleGenerate}>
  🎬 Generate Scenes
</button>
{imageURL && (
  <div>
    <h3>🎬 Scene Illustration</h3>
    <img src={imageURL} alt="Scene illustration" style={{ maxWidth: "100%", marginTop: "20px" }} />
  </div>
)}

    </div>
  );
}
