import { useState } from "react";
import { enhancePrompt, generateImage } from "../utils/apiHelpers";

function WorkflowText() {
  const [userPrompt, setUserPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnhance = async () => {
    if (!userPrompt) return;

    try {
      setLoading(true);
      const result = await enhancePrompt(userPrompt);
      setEnhancedPrompt(result);
    } catch {
      setError("Enhancement failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!enhancedPrompt) return;

    try {
      setLoading(true);
      const img = await generateImage(enhancedPrompt);
      setImageUrl(img);
    } catch {
      setError("Image generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Creative Studio ✨</h2>

      <textarea
        placeholder="Enter your idea..."
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />

      <br /><br />

      <button onClick={handleEnhance}>Enhance Prompt</button>

      {enhancedPrompt && (
        <>
          <textarea
            value={enhancedPrompt}
            onChange={(e) => setEnhancedPrompt(e.target.value)}
          />

          <br /><br />

          <button onClick={handleGenerate}>Generate Image</button>
        </>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {imageUrl && <img src={imageUrl} alt="Generated" width="300" />}
    </div>
  );
}

export default WorkflowText;