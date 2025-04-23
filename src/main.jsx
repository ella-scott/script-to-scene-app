import React, { useState } from "react";

export default function App() {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ script })
    });

    const data = await res.json();
    console.log("Image prompt received:", data);
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

    </div>
  );
}
