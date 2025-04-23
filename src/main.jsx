import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  const [script, setScript] = useState("")
  const [photos, setPhotos] = useState([])
  const [style, setStyle] = useState("cinematic")

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Script to Scene Generator</h1>

      <label>📜 Paste your script below:</label><br />
      <textarea
        rows={10}
        cols={60}
        placeholder="Enter your video script here..."
        value={script}
        onChange={e => setScript(e.target.value)}
      /><br /><br />

      <label>🖼️ Upload reference photos:</label><br />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={e => setPhotos(e.target.files)}
      /><br /><br />

      <label>🎨 Choose art style:</label><br />
      <input
        type="text"
        value={style}
        onChange={e => setStyle(e.target.value)}
        placeholder="e.g. cinematic, realistic"
      /><br /><br />

      <button
        onClick={() => alert(\"This will generate your images (coming next)\")}
      >
        🚀 Generate Scenes
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)